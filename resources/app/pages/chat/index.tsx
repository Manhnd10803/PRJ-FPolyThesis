import { MessagesService } from '@/apis/services/messages.service';
import sendMessageSound from '@/assets/mp3/send-message.mp3';
import { pathName } from '@/routes/path-name';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatBox } from './components/chat-box';
import { ChatForm } from './components/chat-form';
import { HeaderChat } from './components/header-chat';
import { PopUpDeleteChat } from './components/pop-up-delete-chat';
import { SideBar } from './components/side-bar';
import { ChatContextProvider } from './context';
import {
  useSetConversation,
  useMutationPrivateChannel,
  useUserChatInfo,
  useDeletePrivateChannel,
} from '@/hooks/useChatQuery';
import { IUser } from '@/models/user';

const audioSend = new Promise<HTMLAudioElement>(resolve => {
  resolve(new Audio(sendMessageSound));
});

export const ChatPage = () => {
  //state
  const { id: chatId = 0 } = useParams();

  const removeChannelId = useRef<number | null>(null);

  const { manuallyAddPrivateChannel } = useMutationPrivateChannel();

  const { deletePrivateChannel } = useDeletePrivateChannel();

  const { manuallySetConversation } = useSetConversation();
  // this will be inferred as `ChatBoxHandle`
  type ChatBoxHandle = React.ElementRef<typeof ChatBox>;

  const chatBoxRef = useRef<ChatBoxHandle>(null);

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const socketID = window.Echo.socketId();

  const sendMessageMutation = useMutation((messageText: string) => {
    return MessagesService.sendMessages(Number(chatId), { content: messageText }, socketID);
  });

  const handleSendMessage = (message: string) => {
    sendMessageMutation.mutate(message, {
      onSuccess: ({ data }) => {
        // play sound
        audioSend.then(audio => audio.play());
        const newData = {
          data: data.data,
          id: data.data.receiver_id,
        };

        // sửa lại thành 1 hook cho đỡ lỗi
        manuallySetConversation('add', newData);

        manuallyAddPrivateChannel(data.data.receiver as IUser);
        //scroll to bottom  chat box
        chatBoxRef.current?.scrollToBottom();
      },
    });
  };

  // mở modal xoá channel
  const onClickRemoveChat = (id: number) => {
    removeChannelId.current = Number(id);
    setShowModal(true);
  };

  // Xoá channel và chuyển về trang chat
  const handleConfirmDelete = () => {
    deletePrivateChannel(removeChannelId.current as number, {
      onSuccess: () => {
        navigate(pathName.CHAT);
      },
    });

    setShowModal(false);
  };

  // render
  return (
    <>
      <div id="content-page" className="content-page p-0">
        <Row>
          <Col sm="12">
            <Card className="mb-0">
              <Card.Body className="chat-page p-0">
                <div className="chat-data-block">
                  <ChatContextProvider value={{ chatId: Number(chatId), onClickRemoveChat }}>
                    <Row>
                      <Col lg={3} className="chat-data-left scroller" style={{ paddingRight: '2px' }}>
                        <SideBar />
                      </Col>
                      <Col lg={9} className="chat-data p-0 chat-data-right border-start">
                        {chatId ? (
                          <div style={{ position: 'relative', minHeight: '100%' }}>
                            <HeaderChat />

                            <ChatBox ref={chatBoxRef} />

                            <ChatForm onSend={handleSendMessage} />
                          </div>
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ minHeight: '100%' }}
                          >
                            <h1>Chat với bạn bè nào 💬 ...</h1>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </ChatContextProvider>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <PopUpDeleteChat showModal={showModal} onClose={() => setShowModal(false)} onDelete={handleConfirmDelete} />
    </>
  );
};
