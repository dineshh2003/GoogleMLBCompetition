"use client";

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

interface PromptInputProps {
  initialVideoUrl: string;
  onSubmit?: (prompt: string, analysisType: string, videoUrl: string) => void;
}

interface AnalysisResponse {
  analysis: {
    result: string;
    frames: string[];
    timestamps: string[];
    duration: number;
  };
}

export default function PromptInput({ initialVideoUrl, onSubmit }: PromptInputProps) {
  const [prompt, setPrompt] = useState("")
  const [analysisType, setAnalysisType] = useState("general")
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResponse['analysis'] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setVideoUrl(initialVideoUrl)
  }, [initialVideoUrl])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
  
    try {
      const response = await axios.post<AnalysisResponse>("http://localhost:5000/api/analyze", {
        prompt,
        videoUrl,
        analysisType,
      });
  
      setResult(response.data.analysis);
      onSubmit?.(prompt, analysisType, videoUrl);
    } catch (err) {
      setError("Failed to analyze the video. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">AI Prompt</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
          <Select value={analysisType} onValueChange={setAnalysisType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Analysis Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Analysis</SelectItem>
              <SelectItem value="exit-speed">Exit Speed</SelectItem>
              <SelectItem value="hit-speed">Hit Speed</SelectItem>
              <SelectItem value="hand-strength">Hand Strength</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter video URL"
          className="w-full mb-4"
        />
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt about the video..."
          className="w-full mb-4"
          rows={4}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Analysis Results</h3>
          <div className="space-y-2 text-green-700">
            <p><strong>Analysis:</strong> {result.result}</p>
            {result.frames && result.frames.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {result.frames.map((frame, index) => (
                  <div key={frame} className="relative">
                    <img 
                      src={`/frames/${frame}`} 
                      alt={`Frame ${index + 1}`}
                      className="w-full rounded"
                    />
                    <span className="absolute bottom-0 right-0 bg-black/50 text-white text-xs p-1 rounded">
                      {result.timestamps[index]}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <p><strong>Duration:</strong> {result.duration}s</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </Card>
  )
}