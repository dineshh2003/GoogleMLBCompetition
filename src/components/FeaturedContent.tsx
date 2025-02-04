import Link from "next/link"
import Image from "next/image"


export default function FeaturedContent() {
    return (
      <div className="relative bg-[#041E42] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">MetricBase</h1>
              <h2 className="text-3xl font-bold mb-4">MLB Prospect Prediction Platform</h2>
              <p className="text-xl mb-6">Turning every pitch into a stat!</p>
              <Link
                href="/dashboard"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Try AI Analysis
              </Link>
            </div>
            <div className="relative aspect-video">
              <Image src="/mainbg.png" alt="Baseball Analysis" fill className="rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  