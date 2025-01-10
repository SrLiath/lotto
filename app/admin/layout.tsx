"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faUsers, faMapMarkerAlt, faTrophy, faTicketAlt } from "@fortawesome/free-solid-svg-icons"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem("userToken")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (data.role !== "admin") {
          router.push("/")
        } else {
          setIsAdmin(true)
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        router.push("/login")
      }
    }

    checkAdminStatus()
  }, [router])

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link href="/admin" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Dashboard
          </Link>
          <Link href="/admin/areas" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            Áreas
          </Link>
          <Link href="/admin/operators" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Operadores
          </Link>
          <Link href="/admin/draws" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <FontAwesomeIcon icon={faTrophy} className="mr-2" />
            Sorteios
          </Link>
          <Link href="/admin/tickets" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
            Bilhetes
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

