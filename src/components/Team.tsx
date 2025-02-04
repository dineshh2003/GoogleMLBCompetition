"use client"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  github?: string
  linkedin?: string
  email?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Rishi Das",
    role: "Lead Developer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Specializes in computer vision and machine learning, with expertise in baseball analytics.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "john@example.com",
  },
  {
    name: "Anshuman Panda",
    role: "ML Developer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Expert in statistical analysis and machine learning model development.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "jane@example.com",
  },
  {
    name: "Dinesh Jang",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Specializes in creating intuitive user interfaces and data visualizations.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mike@example.com",
  },
]

export default function Team() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  {member.github && (
                    <a
                      href={member.github}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

