"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faTrophy } from "@fortawesome/free-solid-svg-icons"
import { UserMenu } from "@/components/user-menu"
import { ResultModal } from "@/components/result-modal"

interface Ticket {
  id: number;
  numbers: number[];
  drawDate: string;
  isDrawn: boolean;
  drawnNumbers?: number[];
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      numbers: [5, 10, 15, 20, 25, 30, 2, 7, 12, 17, 22, 27, 3, 8, 13],
      drawDate: "2023-06-01",
      isDrawn: true,
      drawnNumbers: [3, 7, 11, 15, 19, 23, 27, 2, 6, 10, 14, 18, 22, 26, 30]
    },
    {
      id: 2,
      numbers: [1, 6, 11, 16, 21, 26, 4, 9, 14, 19, 24, 29, 3, 8, 13],
      drawDate: "2023-06-08",
      isDrawn: false
    },
  ])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  const handleShowResult = (ticket: Ticket) => {
    setSelectedTicket(ticket)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Bem-vindo, Usuário!</h1>
          <UserMenu />
        </div>
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <CardTitle>Bilhete #{ticket.id} - Sorteio: {ticket.drawDate}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {ticket.numbers.map((number, index) => (
                    <div key={index} className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">
                      {number}
                    </div>
                  ))}
                </div>
                {ticket.isDrawn ? (
                  <Button onClick={() => handleShowResult(ticket)} className="w-full">
                    <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                    Ver Resultado
                  </Button>
                ) : (
                  <p className="text-sm text-gray-600">Aguardando sorteio</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href="/select-numbers">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Comprar Novos Números
            </Link>
          </Button>
        </div>
      </div>
      {selectedTicket && (
        <ResultModal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          ticketNumbers={selectedTicket.numbers}
          drawnNumbers={selectedTicket.drawnNumbers || []}
        />
      )}
    </div>
  )
}

