"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt, faUserPlus, faTrophy, faInfoCircle, faCalendarAlt, faHome, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  const winners = [
    { name: "João Silva", prize: "R$ 500.000" },
    { name: "Maria Santos", prize: "R$ 250.000" },
    { name: "Carlos Oliveira", prize: "R$ 100.000" },
  ]

  const lastDrawnNumbers = [5, 12, 18, 23, 30, 37, 42, 48, 53, 59]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-500">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-600">SorteLegal</h1>
          <nav>
            <Button asChild variant="ghost" className="mr-2">
              <Link href="/login">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Entrar
              </Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Registrar
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="home" onClick={() => setActiveTab("home")}>
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Início
            </TabsTrigger>
            <TabsTrigger value="about" onClick={() => setActiveTab("about")}>
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              Sobre Nós
            </TabsTrigger>
            <TabsTrigger value="how-it-works" onClick={() => setActiveTab("how-it-works")}>
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
              Como Funciona
            </TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                    Últimos Ganhadores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {winners.map((winner, index) => (
                      <li key={index} className="mb-2">
                        {winner.name} - {winner.prize}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                    Últimos Números Sorteados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {lastDrawnNumbers.map((number, index) => (
                      <div key={index} className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                        {number}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <p className="text-2xl font-bold text-white text-center mt-8">
              Prêmio Acumulado: R$ 5.000.000
            </p>
          </TabsContent>
          <TabsContent value="about">
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Sobre o SorteLegal</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  O SorteLegal é a sua plataforma confiável para jogos de loteria online.
                  Fundado em 2023, nosso objetivo é proporcionar uma experiência de jogo
                  segura, justa e emocionante para todos os nossos usuários.
                </p>
                <p className="mt-4">
                  Com tecnologia de ponta e um compromisso inabalável com a transparência,
                  garantimos que cada sorteio seja realizado com total integridade.
                  Junte-se a nós e faça parte desta emocionante jornada rumo aos seus sonhos!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="how-it-works">
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Como Funciona</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-4">
                  <li>Crie sua conta gratuitamente no SorteLegal.</li>
                  <li>Escolha seus números da sorte para o próximo sorteio.</li>
                  <li>Faça o pagamento seguro através de nossas opções disponíveis.</li>
                  <li>Aguarde o sorteio, que acontece todas as terças, quintas e sábados às 20h.</li>
                  <li>Confira os resultados em sua conta e, se for o ganhador, receba seu prêmio!</li>
                </ol>
                <p className="mt-4">
                  É simples, seguro e emocionante. Comece a jogar hoje e boa sorte!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white mt-8 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 SorteLegal. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

