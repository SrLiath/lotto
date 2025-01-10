"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrophy, faSync } from "@fortawesome/free-solid-svg-icons"

interface Draw {
  id: number;
  date: string;
  numbers: number[];
}

const draws: Draw[] = [
  { id: 1, date: "2023-06-01", numbers: [3, 7, 11, 15, 19, 23, 27, 2, 6, 10, 14, 18, 22, 26] },
  { id: 2, date: "2023-05-25", numbers: [1, 5, 9, 13, 17, 21, 25, 29, 4, 8, 12, 16, 20, 24] },
  { id: 3, date: "2023-05-18", numbers: [2, 6, 10, 14, 18, 22, 26, 30, 3, 7, 11, 15, 19, 23] },
]

export default function Results() {
  const searchParams = useSearchParams()
  const ticketId = searchParams.get("ticket")
  const [isFlipped, setIsFlipped] = useState(false)

  const userTicket = ticketId ? {
    id: parseInt(ticketId),
    numbers: [5, 10, 15, 20, 25, 30, 2, 7, 12, 17, 22, 27, 3, 8, 13],
    drawDate: "2023-06-01"
  } : null

  const matchingDraw = userTicket ? draws.find(draw => draw.date === userTicket.drawDate) : null

  const matchedNumbers = userTicket && matchingDraw
    ? userTicket.numbers.filter(number => matchingDraw.numbers.includes(number))
    : []

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-500 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white mb-8">
          <FontAwesomeIcon icon={faTrophy} className="mr-2" />
          Resultados da Loteria
        </h1>

        {userTicket && matchingDraw && (
          <Card className={`flip-card ${isFlipped ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <CardHeader>
                  <CardTitle>Seu Bilhete #{userTicket.id} - Sorteio de {userTicket.drawDate}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {userTicket.numbers.map((number, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-lg"
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleFlip} className="w-full mt-4">
                    <FontAwesomeIcon icon={faSync} className="mr-2" />
                    Revelar Resultado
                  </Button>
                </CardContent>
              </div>
              <div className="flip-card-back">
                <CardHeader>
                  <CardTitle>Resultado do Sorteio de {userTicket.drawDate}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {userTicket.numbers.map((number, index) => (
                      <div
                        key={index}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${matchedNumbers.includes(number) ? "bg-green-500" : "bg-red-500"
                          }`}
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                  <p className="text-lg font-semibold mt-4">
                    Você acertou {matchedNumbers.length} número{matchedNumbers.length !== 1 ? "s" : ""}!
                  </p>
                  <Button onClick={handleFlip} className="w-full mt-4">
                    <FontAwesomeIcon icon={faSync} className="mr-2" />
                    Voltar
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        )}

        {draws.map((draw) => (
          <Card key={draw.id}>
            <CardHeader>
              <CardTitle>Sorteio de {draw.date}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {draw.numbers.map((number, index) => (
                  <div key={index} className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-white text-lg">
                    {number}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

