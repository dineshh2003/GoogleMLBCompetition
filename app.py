from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2 as cv
import numpy as np
from PIL import Image
import requests
import tempfile
import os
from datetime import timedelta
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)

# Constants
MAX_VIDEO_SIZE = 100 * 1024 * 1024  # 100MB
CHUNK_SIZE = 8192  # 8KB chunks for streaming
MAX_FRAMES = 5

def download_video_in_chunks(url):
    try:
        # Stream download instead of loading entire file into memory
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Check content length if available
        content_length = response.headers.get('content-length')
        if content_length and int(content_length) > MAX_VIDEO_SIZE:
            raise ValueError(f"Video size exceeds maximum allowed size of {MAX_VIDEO_SIZE/1024/1024}MB")
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
            for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
                if chunk:
                    temp_file.write(chunk)
            return temp_file.name
    except Exception as e:
        logging.error(f"Error downloading video: {str(e)}")
        raise

def process_video(video_path, num_frames=MAX_FRAMES):
    try:
        cap = cv.VideoCapture(video_path)
        if not cap.isOpened():
            raise ValueError("Failed to open video file")
        
        # Get video properties
        total_frames = int(cap.get(cv.CAP_PROP_FRAME_COUNT))
        fps = cap.get(cv.CAP_PROP_FPS)
        duration = total_frames / fps
        
        # Calculate frame interval
        interval = max(1, total_frames // num_frames)
        
        frames = []
        timestamps = []
        frame_count = 0
        
        while len(frames) < num_frames and frame_count < total_frames:
            ret, frame = cap.read()
            if not ret:
                break
                
            if frame_count % interval == 0:
                # Resize frame to reduce memory usage
                frame = cv.resize(frame, (640, 360))
                # Convert to RGB
                frame_rgb = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
                # Convert to PIL Image
                pil_img = Image.fromarray(frame_rgb)
                
                # Save frame to temporary file
                temp_frame_path = f"frame_{len(frames)}.jpg"
                pil_img.save(temp_frame_path, "JPEG", quality=85)
                
                frames.append(temp_frame_path)
                timestamps.append(str(timedelta(seconds=frame_count/fps)))
            
            frame_count += 1
            
        cap.release()
        
        return {
            "frames": frames,
            "timestamps": timestamps,
            "duration": round(duration, 2)
        }
        
    except Exception as e:
        logging.error(f"Error processing video: {str(e)}")
        raise
    finally:
        if cap is not None:
            cap.release()

@app.route('/api/analyze', methods=['POST'])
def analyze_video():
    try:
        data = request.json
        video_url = data.get('videoUrl')
        prompt = data.get('prompt')
        analysis_type = data.get('analysisType', 'general')
        
        if not video_url:
            return jsonify({"error": "Video URL is required"}), 400
            
        # Download video in chunks
        temp_video_path = download_video_in_chunks(video_url)
        
        try:
            # Process video
            result = process_video(temp_video_path)
            
            analysis_result = {
                "analysis": {
                    "result": f"Analysis completed for {analysis_type}: {prompt}",
                    "frames": result["frames"],
                    "timestamps": result["timestamps"],
                    "duration": result["duration"]
                }
            }
            
            return jsonify(analysis_result)
            
        finally:
            # Clean up temporary files
            if os.path.exists(temp_video_path):
                os.remove(temp_video_path)
            for frame in result.get("frames", []):
                if os.path.exists(frame):
                    os.remove(frame)
                    
    except Exception as e:
        logging.error(f"Error in analyze_video: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)