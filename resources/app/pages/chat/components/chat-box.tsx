import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import moment from 'moment';
import parse from 'html-react-parser';
import { Dropdown, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { chatActions } from '@/redux/slice';
import { MessagesService } from '@/apis/services/messages.service';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { CustomToggle } from '@/components/custom';
import { useEffect, useRef, useState } from 'react';
import { set } from 'lodash';
import toast from 'react-hot-toast';

export const ChatBox = () => {
  const { id: chat_id } = useParams<string>();

  if (!chat_id) return null;

  const [totalPage, setTotalPage] = useState(0);

  const localUserId = StorageFunc.getUserId();
  const dispatch = useAppDispatch();
  const { listMessage } = useAppSelector(state => state.chat);
  const queryClient = useQueryClient();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async ({ quantityMessages = 15, pageParam = 1 }) => {
    const { data } = await MessagesService.showMessages(chat_id, quantityMessages, pageParam);
    setTotalPage(data.last_page);
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery(
    ['list_message', chat_id],
    fetchMessages,
    {
      getNextPageParam: (lastPage, allPages) => lastPage.current_page + 1,
      onSuccess: data => {
        let listMessage = data?.pages.flatMap(page => page.data);
        dispatch(chatActions.setListMessage(listMessage as any));
      },
    },
  );

  const deleteMessageItemMutation = useMutation((messageId: number) => MessagesService.deleteChatItem(messageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['list_message', chat_id]);
    },
  });

  const handleDeleteChatItem = (id: number) => {
    deleteMessageItemMutation.mutate(id);
  };

  // useEffect(() => {
  //   if (listMessage && listMessage.length > 0) {
  //     scrollToBottom();
  //   }
  // }, [listMessage, isLoading]);

  // Thêm sự kiện scroll vào useEffect
  useEffect(() => {
    // render
    const handleScroll = () => {
      const chatContent = document.querySelector('.chat-content');
      if (chatContent) {
        const isScrolledToTop = chatContent.scrollHeight + chatContent.scrollTop <= chatContent.clientHeight + 1;

        if (isScrolledToTop && !isFetchingMore && hasNextPage && totalPage > data?.pages?.length) {
          setIsFetchingMore(true);
          fetchNextPage().then(() => {
            setIsFetchingMore(false);
          });
        }
        if (isScrolledToTop && !isFetchingMore && hasNextPage && totalPage === data?.pages?.length) {
          toast.error('Đã tải hết tin nhắn');
        }
      }
    };
    const chatContent = document.querySelector('.chat-content');
    if (chatContent) {
      chatContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatContent) {
        chatContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [data, hasNextPage, isFetchingMore, fetchNextPage]);
  return (
    <>
      <div className="chat-content scroller d-flex flex-column-reverse">
        <>
          {listMessage &&
            listMessage.map((item, index) => {
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
            })}
        </>
        <>
          {isFetchingMore && (
            <div style={{ textAlign: 'center', padding: '15px' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </>
      </div>
      <div />
    </>
  );
};
