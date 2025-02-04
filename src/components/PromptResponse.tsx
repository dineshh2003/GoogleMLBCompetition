"use client";

import Image from "next/image";

interface AnalysisResponse {
  analysis: {
    result: string;
    frames: string[];
    timestamps: string[];
    duration: number;
  };
}

interface PromptResponseProps {
  result: AnalysisResponse["analysis"] | null;
  error: string | null;
}

export function PromptResponse({ result, error }: PromptResponseProps) {
  return (
    <div>
      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Analysis Results</h3>
          <div className="space-y-2 text-green-700">
            <p>
              <strong>Analysis:</strong> {result.result}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {result.frames.map((frame, index) => (
                <div key={frame} className="relative">
                  <Image
                    src={`/frames/${frame}`}
                    alt={`Frame ${index + 1}`}
                    width={500}
                    height={300}
                    className="w-full rounded"
                  />
                  <span className="absolute bottom-0 right-0 bg-black/50 text-white text-xs p-1 rounded">
                    {result.timestamps[index]}
                  </span>
                </div>
              ))}
            </div>
            <p>
              <strong>Duration:</strong> {result.duration}s
            </p>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}