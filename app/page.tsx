'use client'

// Import Dependancies
import { useState, useEffect } from "react"
import axios from 'axios'
import TypingAnimation from "./_components/TypingAnimation";

// Type definitions
type ChatMessage = {
  type: 'user' | 'bot';
  message: string;
};

export default function Home() {
  
  // Initialise react components
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => { 
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message: inputValue}]);
    sendMessage(inputValue)

    setInputValue('');
  }

  const sendMessage = (user_message: string) => {
    const instructions: string = "You are an expert Anki Card making computer who mades Anki cards for academic purposes. You always want to understand the 'why'. I want you to create Anki flashcards from a section of text that I will paste at the end of this message. Here are the instructions on what I want you to do: Skim the Text - Before diving into the details, skim through the text to get a general understanding of what it's about. Identify Key Points - Highlight or note the main ideas, terms, or concepts that seem important and capture the essence of the topic. Figure out how many Anki cards you should make. Simplicity is Key - Each card should represent one idea, fact, or concept. For harder questions you can expand on the answer to help understanding. Use Clear Wording - Make sure the wording is clear and straightforward. Context Matters - Sometimes a little context is important. Avoid Yes/No Questions - These usually don't contribute much to understanding or retention. Reply with the Anki cards in JSON format and only use basic cards. Example output: [{'question': 'How do you know that you have reached the end of a Linked List?', 'answer': 'Linked Lists are 'null-terminated' which means the end of the list is denoted by the value 'null'.'}] Here is the text, Only respond in JSON format:"
    const message = instructions + user_message
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    };
    const data = {
      model: "gpt-4",
      messages: [{"role": "user", "content": message}]
    };

    setIsLoading(true);

    // fetches from the OpeanAI API
    axios.post(url, data, {headers: headers}).then((response) => {
      const output = JSON.parse(response.data.choices[0].message.content)
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
      {
        isLoading && 
        <div key={chatLog.length} className="flex justify-start">
          <div className="w-96 border-b bg-gray-200 pb-4 pt-6 rounded">
            <TypingAnimation />
          </div>
        </div>
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
