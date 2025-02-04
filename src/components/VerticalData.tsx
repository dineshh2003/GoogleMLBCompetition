"use client"

import { useEffect, useState } from "react"
import { projectData } from "./data"

export default function VerticalNavbarWithContent() {
  const [activeSection, setActiveSection] = useState(projectData.sections[0].id)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id^="project-"]')
      let currentSection = activeSection

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.id.replace("project-", "")
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`project-${sectionId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Navbar */}
      <nav className="lg:w-64 bg-white border-r border-gray-200 p-4 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto">
        <div className="space-y-2">
          {projectData.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        {projectData.sections.map((section) => (
          <section key={section.id} id={`project-${section.id}`} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
            <div className="prose max-w-none">
              {section.content.split("\n").map((paragraph, index) => (
                <p key={index} className="whitespace-pre-wrap mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

