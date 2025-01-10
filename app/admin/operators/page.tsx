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

interface Operator {
  _id: string;
  name: string;
  email: string;
  area: Area;
}

export default function OperatorsManagement() {
  const [operators, setOperators] = useState<Operator[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [selectedArea, setSelectedArea] = useState("")

  useEffect(() => {
    fetchOperators()
    fetchAreas()
  }, [])

  const fetchOperators = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const response = await fetch("http://localhost:5000/api/admin/operators", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setOperators(data)
    } catch (error) {
      console.error("Error fetching operators:", error)
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
      const response = await fetch("http://localhost:5000/api/admin/operators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
          phone: newPhone,
          areaId: selectedArea,
        }),
      })
      if (response.ok) {
        setNewName("")
        setNewEmail("")
        setNewPassword("")
        setNewPhone("")
        setSelectedArea("")
        fetchOperators()
      }
    } catch (error) {
      console.error("Error creating operator:", error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Operadores</h1>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        <Input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nome"
          required
        />
        <Input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <Input
          type="tel"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Telefone"
          required
        />
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
        <Button type="submit">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Adicionar Operador
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Área</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operators.map((operator) => (
            <TableRow key={operator._id}>
              <TableCell>{operator.name}</TableCell>
              <TableCell>{operator.email}</TableCell>
              <TableCell>{operator.area.city}, {operator.area.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

