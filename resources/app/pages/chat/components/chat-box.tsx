import { MessagesService } from '@/apis/services/messages.service';
import { CustomToggle } from '@/components/custom';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { chatActions } from '@/redux/slice';
import { StorageFunc } from '@/utilities/local-storage/storage-func';

export const ChatBox = () => {
  // state
  const { id: chat_id } = useParams<string>();

  if (!chat_id) return null;

  const localUserId = StorageFunc.getUserId();

  const dispatch = useAppDispatch();

  const { listMessage } = useAppSelector(state => state.chat);

  const queryClient = useQueryClient();

  //scroll to last message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // func
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  //======================================= get list message =======================================//
  const getListMessage = async () => {
    const { data } = await MessagesService.showMessages(chat_id);
    dispatch(chatActions.setListMessage(data));
    return data;
  };

  const queryKeyListMessage = ['list_message', chat_id];

  const { isLoading } = useQuery({
    queryKey: queryKeyListMessage,
    queryFn: getListMessage,
    enabled: !!chat_id,
    onSuccess: data => {
      dispatch(chatActions.setListMessage(data));
    },
  });

  //xoá 1 tin nhắn

  const deleteMessageItemMutation = useMutation(
    (messageId: number) => {
      return MessagesService.deleteChatItem(messageId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeyListMessage);
      },
    },
  );
  const handleDeleteChatItem = (id: number) => {
    // console.log(id);
    deleteMessageItemMutation.mutate(id);
  };

  // effect
  useEffect(() => {
    if (listMessage && listMessage.length > 0) {
      scrollToBottom();
    }
  }, [listMessage, isLoading]);

  // render
  return (
    <div className="chat-content scroller">
      {listMessage ? (
        listMessage.map(item => {
          if (localUserId === item.sender_id) {
            return (
              <div className="chat d-flex other-user" key={item.id}>
                <div className="chat-user">
                  <Link className="avatar m-0" to="">
                    <img loading="lazy" src={item.sender.avatar} alt="avatar" className="avatar-35 " />
                  </Link>
                  <span className="chat-time mt-1">{moment(item.created_at).format('LT')}</span>
                </div>
                <div className="chat-detail" style={{ maxWidth: '60%' }}>
                  <div>
                    <Dropdown className="d-flex justify-content-center align-items-center" as="span">
                      <Dropdown.Toggle
                        as={CustomToggle}
                        variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                      >
                        more_vert
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-right">
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          onClick={() => handleDeleteChatItem(item.id)}
                        >
                          <i className="material-symbols-outlined md-18 me-1">delete_outline</i>
                          Xoá
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="chat-message">
                    <div>{parse(item.content.replace('</br>', '<br />'))}</div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="chat chat-left" key={item.id}>
                <div className="chat-user">
                  <Link className="avatar m-0" to="">
                    <img loading="lazy" src={item.sender.avatar} alt="avatar" className="avatar-35 " />
                  </Link>
                  <span className="chat-time mt-1">{moment(item.created_at).format('LT')}</span>
                </div>
                <div className="chat-detail" style={{ maxWidth: '50%' }}>
                  <div className="chat-message">
                    <div>{parse(item.content.replace('</br>', '<br />'))}</div>
                  </div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div
          style={{ minHeight: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
