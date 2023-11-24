import { MessagesService } from '@/apis/services/messages.service';
import { CustomToggle } from '@/components/custom';
import { Loading } from '@/components/shared/loading';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { chatActions } from '@/redux/slice';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import parse from 'html-react-parser';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useChatContext } from '../context';

export const ChatBox = () => {
  // state
  const { chatId } = useChatContext();

  const localUserId = StorageFunc.getUserId();

  const dispatch = useAppDispatch();

  const { conversation, isLoading } = useAppSelector(state => state.chat);

  const queryClient = useQueryClient();

  //scroll to last message
  const messageEndRef = useRef<HTMLDivElement>(null);

  // func
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  //======================================= get list message =======================================//
  const getConversation = async () => {
    const { data } = await MessagesService.getConversationOfChannel(chatId);
    dispatch(chatActions.setConversation(data));
    return data;
  };

  const queryKeyConversation = ['conversation', chatId];

  const { isError: _, isFetching } = useQuery({
    queryKey: queryKeyConversation,
    queryFn: getConversation,
    enabled: !!chatId,
    onSuccess: data => {
      dispatch(chatActions.setConversation(data));
    },
  });

  //xoá 1 tin nhắn

  const deleteMessageItemMutation = useMutation(
    (messageId: number) => {
      return MessagesService.deleteMessage(messageId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeyConversation);
      },
    },
  );

  const handleDeleteMessage = (messageId: number) => {
    return () => {
      deleteMessageItemMutation.mutate(messageId);
    };
  };

  // effect
  useEffect(() => {
    if (conversation && conversation.length > 0) {
      scrollToBottom();
    }
  }, [conversation, isLoading]);

  // render
  return (
    <div className="chat-content scroller">
      {isFetching ? (
        <Loading size={100} textStyle={{ fontSize: '30px' }} />
      ) : (
        <>
          {conversation.map(item => {
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
                          <Dropdown.Item className="d-flex align-items-center" onClick={handleDeleteMessage(item.id)}>
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
          })}
        </>
      )}

      <div ref={messageEndRef} />
    </div>
  );
};
