import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

interface ResultModalProps {
  isOpen: boolean
  onClose: () => void
  ticketNumbers: number[]
  drawnNumbers: number[]
}

export function ResultModal({ isOpen, onClose, ticketNumbers, drawnNumbers }: ResultModalProps) {
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowResults(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowResults(false)
    }
  }, [isOpen])

  const matchedNumbers = ticketNumbers.filter(number => drawnNumbers.includes(number))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resultado do Sorteio</DialogTitle>
        </DialogHeader>
        <div className={`transition-opacity duration-500 ${showResults ? "opacity-100" : "opacity-0"}`}>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {ticketNumbers.map((number, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${drawnNumbers.includes(number) ? "bg-green-500" : "bg-red-500"
                  }`}
              >
                {number}
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold mt-4">
            Você acertou {matchedNumbers.length} número(s)!
          </p>
        </div>
        <Button onClick={onClose} className="mt-4">
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          Fechar
        </Button>
      </DialogContent>
    </Dialog>
  )
}

