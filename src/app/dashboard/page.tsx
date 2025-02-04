"use client";

import { useState } from "react";
import axios from "axios";
import { Sidebar } from "@/components/Sidebar";
import VideoPlayer from "@/components/VideoPlayer";
import AIResponse from "@/components/AIResponse";
import { PromptInput } from "@/components/PromptInput";

interface AnalysisResponse {
  analysis: {
    result: string;
    frames: string[];
    timestamps: string[];
    duration: number;
  };
}

export default function Dashboard() {
  const [videoUrl, setVideoUrl] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isVideoSubmitted, setIsVideoSubmitted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleVideoSubmit = (url: string) => {
    setVideoUrl(url);
    setIsVideoSubmitted(true);
  };

  const handlePromptSubmit = async (
    inputPrompt: string,
    inputAnalysisType: string,
    inputVideoUrl: string
  ) => {
    setVideoUrl(inputVideoUrl);
    setIsVideoSubmitted(true);
    setHistory((prev) => [inputPrompt, ...prev]);

    try {
      const response = await axios.post<AnalysisResponse>(
        "http://localhost:5000/api/analyze",
        {
          prompt: inputPrompt,
          videoUrl: inputVideoUrl,
          analysisType: inputAnalysisType,
        }
      );
      setAiResponse(response.data.analysis.result);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAiResponse("Failed to analyze video. Please try again.");
    }
  };

  const handleNewExperience = () => {
    setVideoUrl("");
    setAiResponse("");
    setIsVideoSubmitted(false);
  };

  return (
    <div className="flex mt-20">
      <Sidebar
        history={history}
        onSelectPrompt={(prompt) => setHistory((prev) => [prompt, ...prev])}
        onNewExperience={handleNewExperience}
      />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Video Analysis Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PromptInput
              onSubmit={handlePromptSubmit}
              initialVideoUrl={videoUrl}
            />
          </div>
          <div>
            <VideoPlayer
              url={videoUrl}
              onSubmit={handleVideoSubmit}
              isVisible={isVideoSubmitted}
            />
          </div>
        </div>
        {aiResponse && (
          <div className="mt-8">
            <AIResponse response={aiResponse} />
          </div>
        )}
      </div>
    </div>
  );
}