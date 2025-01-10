"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

interface Area {
  _id: string;
  city: string;
  state: string;
}

interface Draw {
  _id: string;
  area: Area;
  drawDate: string;
  numbers: number[];
}

export default function DrawsManagement() {
  const [draws, setDraws] = useState<Draw[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [selectedArea, setSelectedArea] = useState("")
  const [drawDate, setDrawDate] = useState("")
  const [numbers, setNumbers] = useState("")

  useEffect(() => {
    fetchDraws()
    fetchAreas()
  }, [])

  const fetchDraws = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch("http://localhost:5000/api/admin/draws", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setDraws(data)
    } catch (error) {
      console.error("Error fetching draws:", error)
    }
  }

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
      const response = await fetch("http://localhost:5000/api/admin/draws", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          areaId: selectedArea,
          drawDate,
          numbers: numbers.split(",").map(Number),
        }),
      })
      if (response.ok) {
        setSelectedArea("")
        setDrawDate("")
        setNumbers("")
        fetchDraws()
      }
    } catch (error) {
      console.error("Error creating draw:", error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Sorteios</h1>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma área" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((area) => (
              <SelectItem key={area._id} value={area._id}>
                {area.city}, {area.state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={drawDate}
          onChange={(e) => setDrawDate(e.target.value)}
          required
        />
        <Input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="Números (separados por vírgula)"
          required
        />
        <Button type="submit">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Adicionar Sorteio
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Área</TableHead>
            <TableHead>Data do Sorteio</TableHead>
            <TableHead>Números Sorteados</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {draws.map((draw) => (
            <TableRow key={draw._id}>
              <TableCell>{draw.area.city}, {draw.area.state}</TableCell>
              <TableCell>{new Date(draw.drawDate).toLocaleDateString()}</TableCell>
              <TableCell>{draw.numbers.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

