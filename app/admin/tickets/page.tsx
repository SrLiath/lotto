"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faEye, faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import Image from "next/image"

interface Area {
  _id: string;
  city: string;
  state: string;
}

interface Ticket {
  _id: string;
  user: string | null;
  area: Area;
  numbers: number[];
  purchased: string;
  purchaseLocation: string;
  associationCode: string;
  qrCode: string;
}

export default function TicketsManagement() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [selectedArea, setSelectedArea] = useState("")
  const [numbers, setNumbers] = useState("")
  const [purchaseLocation, setPurchaseLocation] = useState("")

  useEffect(() => {
    fetchTickets()
    fetchAreas()
  }, [])

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch("http://localhost:5000/api/admin/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setTickets(data)
    } catch (error) {
      console.error("Error fetching tickets:", error)
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
      const response = await fetch("http://localhost:5000/api/admin/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          areaId: selectedArea,
          numbers: numbers.split(",").map(Number),
          purchaseLocation,
        }),
      })
      if (response.ok) {
        setSelectedArea("")
        setNumbers("")
        setPurchaseLocation("")
        fetchTickets()
      }
    } catch (error) {
      console.error("Error creating ticket:", error)
    }
  }

  const handleGeneratePDF = async (ticketId: string) => {
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch(`http://localhost:5000/api/admin/tickets/${ticketId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `ticket-${ticketId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        console.error("Error generating PDF")
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Bilhetes</h1>
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
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="Números (separados por vírgula)"
          required
        />
        <Input
          type="text"
          value={purchaseLocation}
          onChange={(e) => setPurchaseLocation(e.target.value)}
          placeholder="Local de Compra"
          required
        />
        <Button type="submit">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Adicionar Bilhete
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Área</TableHead>
            <TableHead>Números</TableHead>
            <TableHead>Data de Compra</TableHead>
            <TableHead>Local de Compra</TableHead>
            <TableHead>QR Code</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket._id}>
              <TableCell>{ticket.user || "Colaborador"}</TableCell>
              <TableCell>{ticket.area.city}, {ticket.area.state}</TableCell>
              <TableCell>{ticket.numbers.join(", ")}</TableCell>
              <TableCell>{new Date(ticket.purchased).toLocaleString()}</TableCell>
              <TableCell>{ticket.purchaseLocation}</TableCell>
              <TableCell>
                <Image src={ticket.qrCode} alt="QR Code" width={50} height={50} />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/tickets/${ticket._id}`}>
                    <Button variant="outline" size="sm">
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      Detalhes
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => handleGeneratePDF(ticket._id)}>
                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.print()}>
                    <FontAwesomeIcon icon={faPrint} className="mr-2" />
                    Imprimir
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

