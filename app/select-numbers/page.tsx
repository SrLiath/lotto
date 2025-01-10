"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faCheck, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export default function SelectNumbers() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const router = useRouter()

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number))
    } else if (selectedNumbers.length < 15) {
      setSelectedNumbers([...selectedNumbers, number])
    }
  }

  const removeNumber = (index: number) => {
    setSelectedNumbers(selectedNumbers.filter((_, i) => i !== index))
  }

  const moveNumber = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < selectedNumbers.length) {
      const newSelectedNumbers = [...selectedNumbers]
      const temp = newSelectedNumbers[index]
      newSelectedNumbers[index] = newSelectedNumbers[newIndex]
      newSelectedNumbers[newIndex] = temp
      setSelectedNumbers(newSelectedNumbers)
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const newSelectedNumbers = Array.from(selectedNumbers)
    const [reorderedItem] = newSelectedNumbers.splice(result.source.index, 1)
    newSelectedNumbers.splice(result.destination.index, 0, reorderedItem)
    setSelectedNumbers(newSelectedNumbers)
  }

  const handleSubmit = () => {
    if (selectedNumbers.length === 15) {
      console.log("Números selecionados:", selectedNumbers)
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-500 p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Selecione Seus Números da Sorte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 mb-6">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
              <Button
                key={number}
                variant={selectedNumbers.includes(number) ? "default" : "outline"}
                className={`w-12 h-12 p-0 ${selectedNumbers.includes(number) ? "bg-green-600 text-white" : "bg-white text-green-600"}`}
                onClick={() => toggleNumber(number)}
              >
                {number}
              </Button>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Ordem de Seleção</h3>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="selected-numbers">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {selectedNumbers.map((number, index) => (
                      <Draggable key={index} draggableId={`number-${index}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center bg-white rounded-full px-3 py-1"
                          >
                            <span className="mr-2 font-semibold">{index + 1}.</span>
                            <span>{number}</span>
                            <div className="ml-auto flex items-center">
                              <button
                                onClick={() => moveNumber(index, "up")}
                                className="text-green-500 hover:text-green-700 mr-1"
                                disabled={index === 0}
                              >
                                <FontAwesomeIcon icon={faArrowUp} />
                              </button>
                              <button
                                onClick={() => moveNumber(index, "down")}
                                className="text-green-500 hover:text-green-700 mr-1"
                                disabled={index === selectedNumbers.length - 1}
                              >
                                <FontAwesomeIcon icon={faArrowDown} />
                              </button>
                              <button
                                onClick={() => removeNumber(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {selectedNumbers.length} de 15 números selecionados
          </p>
          <Button onClick={handleSubmit} disabled={selectedNumbers.length !== 15}>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Confirmar Números
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

