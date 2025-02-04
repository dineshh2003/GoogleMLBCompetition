import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Pause } from "lucide-react"
import Image from "next/image"

interface VideoPlayerProps {
  url: string
  onSubmit: (url: string) => void
  isVisible: boolean
}

export default function VideoPlayer({ url, onSubmit, isVisible }: VideoPlayerProps) {
  const [inputUrl, setInputUrl] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (url) {
      setInputUrl(url)
    }
  }, [url])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(inputUrl)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, you'd control the video playback here
  }

  if (!isVisible) {
    return null
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Video Analysis</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter video URL"
            className="flex-grow"
          />
          <Button type="submit">Load</Button>
        </div>
      </form>
      {url && (
        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={`https://img.youtube.com/vi/${getYouTubeID(url)}/0.jpg`}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            width={500} height={300} 
          />
          <Button className="absolute bottom-2 right-2" size="sm" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </Card>
  )
}

function getYouTubeID(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

