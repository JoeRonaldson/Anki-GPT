'use client';

// Import Dependancies
import { useState, useEffect, useRef , useMemo} from 'react';
import TypingAnimation from './_components/TypingAnimation';
import DownloadCSVButton from './_components/DownloadCSVButton';
import { sendMessage } from './_utils/sendMessage';
import DeleteCard from './_components/DeleteButton';
import { convertToCsv } from './_utils/convertToCsv';

// Type definitions
type ChatMessage = {
  type: 'user' | 'bot';
  message: string;
  msgObject: { question: string, answer: string}
};

export default function Home() {
  // Initialise state variables
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allowDownload, setAllowDownload] = useState(false);
  const [csvString, setCsvString] = useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue, msgObject: {question: "", answer: ""}}]);

    sendMessage(inputValue, setIsLoading, setChatLog, setCsvString, setAllowDownload);

    setInputValue('');
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // reset the height
      const scrollHeight = textAreaRef.current.scrollHeight;
      if (scrollHeight < 200) {
        textAreaRef.current.style.height = `${scrollHeight}px`; // set it to the scrollHeight
      } else {
        textAreaRef.current.style.height = '200px'; // max-height
      }
    }
  }, [inputValue]);

  // creates csv file everytime chatLog is updated
  const botMessages = useMemo(() => {
    return chatLog
      .filter((message: ChatMessage) => message.type === 'bot')
      .map((message: ChatMessage) => message.msgObject);
  }, [chatLog]);

  useEffect(() => {
    if (botMessages && botMessages.length > 0) {
      try {
        const newCsvString = convertToCsv(botMessages);
        setCsvString(newCsvString);
      } catch (error) {
        console.error('Failed to convert to CSV:', error);
      }
    }
  }, [botMessages]); // Dependency array

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
                <div key={index} className={'flex justify-center items-center'}>
                  <div className={'relative'}>
                    <div style={{ whiteSpace: "pre-line" }} className={'bg-gray-800 rounded-lg p-4 text-white mx-auto max-w-[700px] z-10'}>
                      {message.message}
                    </div>
                  </div>
                  <div className={'flex items-center ml-1'}>
                    <DeleteCard chatLogIndex={index} setChatLog={setChatLog}/>
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
          {!allowDownload && (
            <form onSubmit={handleSubmit} className="flex-none p-6">
              <div className="flex rounded-lg border border-gray-700 bg-gray-800 items-start">
                <textarea
                  ref={textAreaRef}
                  rows={1}
                  placeholder="Paste your text..."
                  className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ resize: 'none', maxHeight: '200px', overflowY: 'auto' }}
                />
                <button
                  type="submit"
                  className="bg-gray-800 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none self-end"
                >
                  Create
                </button>
              </div>
            </form>
          )}
          {allowDownload && (
            <div className="bg-gray-800 rounded-lg p-4 text-white mx-auto max-w-[700px]">
              <DownloadCSVButton csvString={csvString} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}