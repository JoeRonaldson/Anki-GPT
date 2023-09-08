'use client';

// Import Dependancies
import { useState, useEffect } from 'react';
import TypingAnimation from './_components/TypingAnimation';
import DownloadCSVButton from './_components/DownloadCSVButton';
import { sendMessage } from './_utils/sendMessage';

// Type definitions
type ChatMessage = {
  type: 'user' | 'bot';
  message: string;
};

export default function Home() {
  // Initialise state variables
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [csvString, setCsvString] = useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);

    sendMessage(inputValue, setIsLoading, setChatLog, setCsvString);

    setInputValue('');
  };

  return (
    <main className="flex bg-gray-100">
      <div className="container mx-auto max-w-[700px]">
        <div className="flex flex-col h-screen bg-gray-100 p-5">
          <h1 className="bg-gradient-to-r from-blue-700 to-black text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
            Anki-GPT
          </h1>
          <div className="flex-grow p-6">
            <div className="flex flex-col space-y-4">
              {chatLog.map((message, index) => (
                <div key={index} className={'flex justify-center'}>
                  <div className={'bg-gray-800 rounded-lg p-4 text-white mx-auto max-w-[700px]'}>
                    {message.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-center">
                  <div className="bg-gray-800 rounded-lg p-4 text-white mx-auto max-w-[700px]">
                    <TypingAnimation />
                  </div>
                </div>
              )}
            </div>
          </div>
          {!csvString && (
            <form onSubmit={handleSubmit} className="flex-none p-6">
              <div className="flex rounded-lg border border-gray-700 bg-blue-950">
                <input
                  type="text"
                  className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                  placeholder="Paste your text..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-950 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-grey transition-colors duration-300"
                >
                  Create
                </button>
              </div>
            </form>
          )}
          {csvString && (
            <div className="bg-blue-950 rounded-lg p-4 text-white mx-auto max-w-[700px]">
              <DownloadCSVButton csvString={csvString} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
