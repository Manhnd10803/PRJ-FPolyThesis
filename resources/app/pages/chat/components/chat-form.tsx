import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BaseEmoji } from 'emoji-mart/dist-es';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  message: string;
};

type ChatFormProps = {
  onSend: (message: string) => void;
};
export const ChatForm = ({ onSend }: ChatFormProps) => {
  // state
  const [isShowEmoji, setIsShowEmoji] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, watch, resetField, setValue } = useForm<FormValues>();

  const { ref, ...rest } = register('message');

  const message = watch('message', '');

  const handleSendMessage: SubmitHandler<FormValues> = async data => {
    if (!data.message.trim()) return;

    onSend(data.message);

    resetField('message', { defaultValue: '' });
  };

  const handleSelectEmoji = (emoji: BaseEmoji) => {
    if (inputRef) {
      const cursorPosition = inputRef.current?.selectionStart || 0;
      // concat the emoji to the string
      const text = message.slice(0, cursorPosition) + emoji.native + message.slice(cursorPosition);

      setValue('message', text);

      const newCursorPosition = cursorPosition + emoji.native!.length;
      // allow to add multiple emojis in the same position of string

      setTimeout(() => {
        inputRef.current?.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 10);
    }
  };

  const handleToggleEmoji = () => setIsShowEmoji(!isShowEmoji);

  const handleClickOutside = () => {
    if (isShowEmoji) {
      setIsShowEmoji(false);
      inputRef.current?.focus();
    }
  };

  // render
  return (
    <div className="chat-footer p-3 bg-white">
      <div style={{ position: 'absolute', zIndex: 2, bottom: 70, display: isShowEmoji ? 'block' : 'none' }}>
        <Picker data={data} onEmojiSelect={handleSelectEmoji} onClickOutside={handleClickOutside} />
      </div>
      <Form className="d-flex align-items-center" onSubmit={handleSubmit(handleSendMessage)}>
        <div className="chat-attagement d-flex align-items-center me-2">
          {/* <Link to="#" style={{ lineHeight: 0 }}>
            <span className="icon material-symbols-outlined p-1 py-2">attach_file</span>
          </Link> */}
          <Link to="#" style={{ lineHeight: 0 }} onClick={handleToggleEmoji}>
            <span className="icon material-symbols-outlined p-1">emoji_emotions</span>
          </Link>
        </div>
        <Form.Control
          autoFocus
          type="text"
          className="form-control me-3"
          ref={(e: HTMLInputElement | null) => {
            ref(e);
            //@ts-ignore
            inputRef.current = e;
          }}
          {...rest}
          id="messageInput"
          placeholder="Type your message"
        />
        <Button type="submit" variant="primary d-flex align-items-center">
          <i className="far fa-paper-plane" aria-hidden="true"></i>
          <span className="d-none d-lg-block ms-1">Gửi</span>
        </Button>
      </Form>
    </div>
  );
};
