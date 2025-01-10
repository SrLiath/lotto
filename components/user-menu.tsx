"use client"

import { useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCreditCard, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-gray-200"
      >
        <FontAwesomeIcon icon={faUser} />
        <span>Usuário</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Perfil
          </Link>
          <Link href="/payment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
            Dados de Pagamento
          </Link>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Sair
          </button>
        </div>
      )}
    </div>
  )
}

