'use client'

import Link from "next/link"
import Image from "next/image"
import { Search } from 'lucide-react'
import { useState, useEffect } from "react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("")

  const navItems = [
    { label: "DASHBOARD", href: "/dashboard" },
    { label: "Team", href: "/Team" },
    {label : "About" , href: "/about"},
    { label: "STATS", href: "/stats" },
    { label: "AI TOOLS", href: "/ai-tools" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleHashChange = () => {
      setActiveItem(window.location.hash.slice(1))
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <header className={`fixed py-3 top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#041E42]/90 backdrop-blur-md shadow-lg" : "bg-[#041E42]"}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center">
            <Image src="/baseball.jpg" alt="MLB Logo" width={50} height={50} />
            <span className="ml-2 font-bold text-white">MetricBase</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-base font-semibold rounded-md transition-colors ${
                      activeItem === item.href.slice(1)
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:bg-blue-500/10 hover:text-white"
                    }`}
                    onClick={() => setActiveItem(item.href.slice(1))}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
