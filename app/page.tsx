'use client'

import { useState, useEffect } from "react"


export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [chatLog, setChatLog] = useState([]) // Probably wont need
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event)  => { 
    event.preventDefault()

    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message: inputValue}])

    setInputValue('')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="max-w-5xl w-full lg:flex items-center justify-center">
        <p className="text-center text-lg w-96 border-b bg-gray-200 pb-4 pt-6 rounded">
          Anki-GPT
        </p>
      </div>

      {
        chatLog.map((message, index) => (
          <div className="text-center text-lg w-96 border-b bg-gray-200 pb-4 pt-6 rounded" key="index">{message.message} </div>
        ))
      }
      
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="max-w-5xl w-full lg:flex items-center justify-center">
          <input type="text" name="text-input" id="text-input" placeholder="Enter text here..." 
          className="text-center text-base w-96 border-b bg-gray-200 pb-4 pt-6 rounded"
          value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>
        <button className="mt-8 text-center text-base w-96 border-b bg-gray-200 pb-4 pt-6 rounded" >
          Make Anki Cards
        </button>
      </form>
    </main>
  )
}
