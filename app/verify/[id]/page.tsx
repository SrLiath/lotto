"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"

interface VerificationResult {
  ticket: {
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
  };
  isWinner: boolean;
  matchedNumbers: number[];
}

export default function VerifyTicket() {
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      verifyTicket()
    }
  }, [id])

  const verifyTicket = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/tickets/${id}/verify`)
      const data = await response.json()
      setVerificationResult(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error verifying ticket:", error)
      setIsLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!verificationResult) {
    return <div>Error: Unable to verify ticket</div>
  }

  const { ticket, isWinner, matchedNumbers } = verificationResult

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Verificação de Bilhete</h1>
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Bilhete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>ID do Bilhete:</strong> {ticket._id}</p>
              <p><strong>Usuário:</strong> {ticket.user ? `${ticket.user.name} (${ticket.user.email})` : "Colaborador"}</p>
              <p><strong>Área:</strong> {ticket.area.city}, {ticket.area.state}</p>
              <p><strong>Números:</strong> {ticket.numbers.join(", ")}</p>
              <p><strong>Data de Compra:</strong> {new Date(ticket.purchased).toLocaleString()}</p>
              <p><strong>Local de Compra:</strong> {ticket.purchaseLocation}</p>
            </div>
            <div>
              <Image src={ticket.qrCode} alt="QR Code" width={200} height={200} />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Resultado da Verificação</h2>
            {ticket.draw ? (
              <>
                <p><strong>Data do Sorteio:</strong> {new Date(ticket.draw.drawDate).toLocaleDateString()}</p>
                <p><strong>Números Sorteados:</strong> {ticket.draw.numbers.join(", ")}</p>
                <p className={`text-lg font-bold ${isWinner ? "text-green-600" : "text-red-600"}`}>
                  {isWinner ? (
                    <><FontAwesomeIcon icon={faCheck} /> Bilhete Premiado!</>
                  ) : (
                    <><FontAwesomeIcon icon={faTimes} /> Bilhete Não Premiado</>
                  )}
                </p>
                {isWinner && (
                  <p><strong>Números Acertados:</strong> {matchedNumbers.join(", ")}</p>
                )}
              </>
            ) : (
              <p>O sorteio ainda não foi realizado para este bilhete.</p>
            )}
          </div>
        </CardContent>
      </Card>
      <Button onClick={handlePrint} className="mt-4">
        <FontAwesomeIcon icon={faPrint} className="mr-2" />
        Imprimir
      </Button>
    </div>
  )
}

