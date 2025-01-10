"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

interface Area {
  _id: string;
  city: string;
  state: string;
}

export default function AreasManagement() {
  const [areas, setAreas] = useState<Area[]>([])
  const [newCity, setNewCity] = useState("")
  const [newState, setNewState] = useState("")

  useEffect(() => {
    fetchAreas()
  }, [])

  const fetchAreas = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch("http://localhost:5000/api/admin/areas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setAreas(data)
    } catch (error) {
      console.error("Error fetching areas:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch("http://localhost:5000/api/admin/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ city: newCity, state: newState }),
      })
      if (response.ok) {
        setNewCity("")
        setNewState("")
        fetchAreas()
      }
    } catch (error) {
      console.error("Error creating area:", error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Áreas</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
        <Input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Cidade"
          required
        />
        <Input
          type="text"
          value={newState}
          onChange={(e) => setNewState(e.target.value)}
          placeholder="Estado"
          required
        />
        <Button type="submit">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Adicionar Área
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cidade</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas.map((area) => (
            <TableRow key={area._id}>
              <TableCell>{area.city}</TableCell>
              <TableCell>{area.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

