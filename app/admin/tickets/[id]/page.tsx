"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf, faCheck } from "@fortawesome/free-solid-svg-icons"
import { useState as useState2 } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Ticket {
  _id: string;
  user: {
    name: string;
    email: string;
  } | null;
  area: {
    city: string;
    state: string;
  };
  numbers: number[];
  purchased: string;
  purchaseLocation: string;
  associationCode: string;
  qrCode: string;
  draw?: {
    drawDate: string;
    numbers: number[];
  };
}

export default function TicketDetails() {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [validationResult, setValidationResult] = useState<{ isWinner: boolean; matchedNumbers: number[] } | null>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchTicketDetails()
    }
  }, [id])

  const fetchTicketDetails = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch(`http://localhost:5000/api/admin/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setTicket(data)
    } catch (error) {
      console.error("Error fetching ticket details:", error)
    }
  }

  const handleGeneratePDF = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch(`http://localhost:5000/api/admin/tickets/${id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `ticket-${id}.pdf`
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

  const handleValidateTicket = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch(`http://localhost:5000/api/admin/tickets/${id}/validate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setValidationResult(data)
    } catch (error) {
      console.error("Error validating ticket:", error)
    }
  }

  if (!ticket) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Detalhes do Bilhete</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>ID do Bilhete:</strong> {ticket._id}</p>
            <p><strong>Usuário:</strong> {ticket.user ? `${ticket.user.name} (${ticket.user.email})` : "Colaborador"}</p>
            <p><strong>Área:</strong> {ticket.area.city}, {ticket.area.state}</p>
            <p><strong>Números:</strong> {ticket.numbers.join(", ")}</p>
            <p><strong>Data de Compra:</strong> {new Date(ticket.purchased).toLocaleString()}</p>
            <p><strong>Local de Compra:</strong> {ticket.purchaseLocation}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Código de Associação e QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{ticket.associationCode}</p>
            <Image src={ticket.qrCode} alt="QR Code" width={200} height={200} />
          </CardContent>
        </Card>
        {ticket.draw && (
          <Card>
            <CardHeader>
              <CardTitle>Informações do Sorteio</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Data do Sorteio:</strong> {new Date(ticket.draw.drawDate).toLocaleDateString()}</p>
              <p><strong>Números Sorteados:</strong> {ticket.draw.numbers.join(", ")}</p>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="mt-6 flex gap-4">
        <Button onClick={() => router.back()}>Voltar</Button>
        <Button onClick={handleGeneratePDF}>
          <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
          Gerar PDF
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mr-2">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Validar Bilhete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Validação de Bilhete</DialogTitle>
            </DialogHeader>
            {validationResult === null ? (
              <Button onClick={handleValidateTicket}>Confirmar Validação</Button>
            ) : (
              <div>
                <p className={`text-lg font-bold ${validationResult.isWinner ? "text-green-600" : "text-red-600"}`}>
                  {validationResult.isWinner ? "Bilhete Premiado!" : "Bilhete Não Premiado"}
                </p>
                {validationResult.isWinner && (
                  <p><strong>Números Acertados:</strong> {validationResult.matchedNumbers.join(", ")}</p>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

