'use client'

import { useState, useEffect } from "react"
import axios from 'axios'


export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]); // Probably wont need
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: any)  => { 
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message: inputValue}]);
    sendMessage(inputValue)

    setInputValue('');
  }

  const sendMessage = (user_message) => {
    const instructions = "In the following messages you must start every word with a capital letter. Start now: "
    const message = instructions + user_message
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": message}]
    };

    setIsLoading(true);

    // fetches from the OpeanAI API
    axios.post(url, data, {headers: headers}).then((response) => {
      // console.log(response); 
      setChatLog((prevChatLog) => [...prevChatLog, {type: 'bot', message: response.data.choices[0].message.content} ]);
      setIsLoading(false); 
    }).catch((error) => {
      setIsLoading(false); 
      console.log(error)
    })

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
          <div className="text-center text-lg w-96 border-b bg-gray-200 pb-4 pt-6 rounded" key={index}>{message.message} </div>
        ))
      }

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="max-w-5xl w-full lg:flex items-center justify-center">
          <input type="text" name="text-input" id="text-input" placeholder="Enter text here..." 
          className="text-center text-base w-96 border-b bg-gray-200 pb-4 pt-6 rounded"
          value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>
        <button className="mt-8 text-center text-base w-96 border-b bg-gray-200 hover:bg-grey-300 pb-4 pt-6 rounded" >
          Make Anki Cards
        </button>
      </form>
    </main>
  )
}
