"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { PromptResponse } from "./PromptResponse";

interface AnalysisResponse {
  analysis: {
    result: string;
    frames: string[];
    timestamps: string[];
    duration: number;
  };
}

interface PromptInputProps {
  initialVideoUrl: string;
  onSubmit: (prompt: string, analysisType: string, videoUrl: string) => void;
}

export function PromptInput({ initialVideoUrl, onSubmit }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [analysisType, setAnalysisType] = useState("general");
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse["analysis"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setVideoUrl(initialVideoUrl);
  }, [initialVideoUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post<AnalysisResponse>(
        "http://localhost:5000/api/analyze",
        {
          prompt,
          videoUrl,
          analysisType,
        }
      );

      setResult(response.data.analysis);
      onSubmit(prompt, analysisType, videoUrl);
    } catch (err) {
      setError("Failed to analyze the video. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Video Analysis</h2>
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
          placeholder="Enter your analysis prompt..."
          className="w-full mb-4"
          rows={4}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Video"}
        </Button>
      </form>
      <PromptResponse result={result} error={error} />
    </Card>
  );
}