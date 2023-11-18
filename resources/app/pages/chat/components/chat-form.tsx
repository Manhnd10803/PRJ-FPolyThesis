import { useState } from 'react';
import InputEmoji from 'react-input-emoji';

type ChatFormProps = {
  onSend: (message: string) => void;
};
export const ChatForm = ({ onSend }: ChatFormProps) => {
  // state
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const messageText = message.trim();
    if (!messageText) return;

    onSend(messageText);
    setMessage('');
  };

  // render
  return (
    <div className="chat-footer p-3 bg-white">
      <InputEmoji
        value={message}
        onChange={setMessage}
        cleanOnEnter
        onEnter={handleSendMessage}
        placeholder="Type a message"
        theme="auto"
        shouldReturn={true}
        keepOpened={true}
      />
    </div>
  );
};
