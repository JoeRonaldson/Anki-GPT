import axios from 'axios';
import { costCalc } from './costCalc';
import { convertToCsv } from './convertToCsv';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type ChatMessage = {
  type: 'user' | 'bot';
  message: string;
  msgObject: { question: string; answer: string };
};

export const sendMessage = (
  user_text: string,
  setIsLoading: SetState<boolean>,
  setChatLog: SetState<ChatMessage[]>,
  setCsvString: SetState<string | undefined>,
  setAllowDownload: SetState<boolean>
) => {
  const INSTRUCTIONS =
    "You are an expert Anki Card making computer who makes Anki cards for academic purposes. You always want to understand the 'why'. Create Anki flashcards from a section of text that I will paste at the end of this message. Here are the instructions on what I want you to do: Skim through the text to get a general understanding of what it's about. Identify the main ideas, terms, or concepts that seem important and capture the essence of the topic. Figure out how many Anki cards you should make. Each card should represent one idea, fact, or concept. For harder questions you can expand on the answer to help understanding. Make sure the wording is clear and straightforward. Context Matters, but never refer to the text as 'text', make sure to desicibe the tezt instead. Avoid Yes/No Questions - These usually don't contribute much to understanding or retention. Reply with the Anki cards in JSON format and only use basic card format. Example output: [{'question': 'How do you know that you have reached the end of a Linked List?', 'answer': 'Linked Lists are 'null-terminated' which means the end of the list is denoted by the value 'null'.'}] Only respond in JSON format, here is the text: ";
  const message = INSTRUCTIONS + user_text;
  const url = '/api/chat';
  const data = { model: 'gpt-4', messages: [{ role: 'user', content: message }] };

  setIsLoading(true);

  // Posts to next.js api endpoint route
  axios
    .post(url, data)
    .then((response) => {
      console.log(response);

      // Calc cost of api
      const cost = costCalc(
        response.data.usage.prompt_tokens,
        response.data.usage.completion_tokens,
        response.data.model
      );
      console.log(`Cost of service: $${cost.toFixed(2)}`);

      const outputArray = JSON.parse(response.data.choices[0].message.content);

      setChatLog((prevChatLog) => [
        ...prevChatLog,
        ...outputArray.map((item: { question: string; answer: string }) => ({
          type: 'bot',
          message: `Q: ${item.question}\n A: ${item.answer}`,
          msgObject: { question: item.question, answer: item.answer },
        })),
      ]);

      setAllowDownload(true);
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};
