type ChatMessage = {
  type: 'user' | 'bot';
  message: string;
  msgObject: { question: string, answer: string}
};

type Props = {
  chatLogIndex: number;
  setChatLog: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const DeleteButton: React.FC<Props> = ({ chatLogIndex, setChatLog}) => {
 
  const deleteSingleCard = (index: number) => {
    setChatLog((prevChatLog) => {
      return prevChatLog.filter((_, i) => i !== index);
    });
  };

  if (chatLogIndex > 0) {
    return (
      <button
        type="button"
        onClick={() => deleteSingleCard(chatLogIndex)}
        className="text-white rounded-lg px-3 py-1 text-white font-semibold"
      >
        <img src="bin-icon.png" alt="Delete Icon" height="45" width="30"/>
      </button>
    );
  }
};

export default DeleteButton;
