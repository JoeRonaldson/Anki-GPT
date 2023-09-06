'use client';

// Import Dependancies
import { useState, useEffect } from 'react';
import axios from 'axios';
import TypingAnimation from './_components/TypingAnimation';

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

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);

    sendMessage(inputValue);

    setInputValue('');
  };

  const sendMessage = (user_text: string) => {
    const instructions =
      "You are an expert Anki Card making computer who mades Anki cards for academic purposes. You always want to understand the 'why'. I want you to create Anki flashcards from a section of text that I will paste at the end of this message. Here are the instructions on what I want you to do: Skim the Text - Before diving into the details, skim through the text to get a general understanding of what it's about. Identify Key Points - Highlight or note the main ideas, terms, or concepts that seem important and capture the essence of the topic. Figure out how many Anki cards you should make. Simplicity is Key - Each card should represent one idea, fact, or concept. For harder questions you can expand on the answer to help understanding. Use Clear Wording - Make sure the wording is clear and straightforward. Context Matters - Sometimes a little context is important. Avoid Yes/No Questions - These usually don't contribute much to understanding or retention. Reply with the Anki cards in JSON format and only use basic cards. Example output: [{'question': 'How do you know that you have reached the end of a Linked List?', 'answer': 'Linked Lists are 'null-terminated' which means the end of the list is denoted by the value 'null'.'}] Only respond in JSON format, here is the text: ";
    const message = instructions + user_text;

    const url = '/api/chat';
    const data = {
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    };

    setIsLoading(true);

    // Posts to next.js api endpoint
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);

        // cost of api when using GPT-4
        const promtTokens = response.data.usage.prompt_tokens * (0.03 / 1000)
        const completionTokens = response.data.usage.completion_tokens * (0.06 / 1000)
        console.log(`Cost of service: $${promtTokens + completionTokens}`)

        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: 'bot', message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <main className="flex bg-gray-100">
      <div className="container mx-auto max-w-[700px]">
        <div className="flex flex-col h-screen bg-gray-100">
          <h1 className="bg-gradient-to-r from-blue-700 to-black text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
            Anki-GPT
          </h1>
          <div className="flex-grow p-6">
            <div className="flex flex-col space-y-4">
              {chatLog.map((message, index) => (
                <div key={index} className={'flex justify-center'}>
                  <div className={"bg-gray-800 rounded-lg p-4 text-white max-w-sm mx-auto max-w-[700px]"}>
                    {message.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-center">
                  <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex-none p-6">
            <div className="flex rounded-lg border border-gray-700 bg-gray-800">
              <input
                type="text"
                className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                placeholder="Paste your text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-grey-800 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-grey transition-colors duration-300"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
