import { MessagesService } from '@/apis/services/messages.service';
import { CustomToggle } from '@/components/custom';
import { Loading } from '@/components/shared/loading';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { momentVi } from '@/utilities/functions/moment-locale';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import parse from 'html-react-parser';
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { Link, useParams } from 'react-router-dom';
import { useConversation, useSetConversation } from '@/hooks/useChatQuery';

interface Props {
  children?: ReactNode;
}

type ChatBoxRef = {
  scrollToBottom: () => void;
};

export const ChatBox = forwardRef<ChatBoxRef, Props>((__, ref) => {
  const localUserId = StorageFunc.getUserId();
  const { id: chatId } = useParams();
  const dispatch = useAppDispatch();

  //scroll to last message
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { ref: startRef, inView: startInView } = useInView();

  const { ref: endRef, inView: endInView } = useInView();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToBottom: scrollToBottom,
      };
    },
    [],
  );

  //======================================= get list message =======================================/

  const {
    data: conversation,
    isLoading,
    hasNextPage,
    isFetching: isFetchingNextPage,
    fetchNextPage,
  } = useConversation(chatId);

  const { manuallySetConversation } = useSetConversation();

  //xoá 1 tin nhắn
  const deleteMessageItemMutation = useMutation(
    (messageId: number) => {
      return MessagesService.deleteMessage(messageId);
    },
    {
      onSuccess: ({ data }) => {
        const newData = {
          data: data.data.id,
          id: data.data.receiver_id,
        };
        manuallySetConversation('delete', newData);
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
    if (endInView && conversation && conversation?.length > 0) {
      scrollToBottom();
    }
  }, [conversation, startInView, endInView]);

  useEffect(() => {
    if (startInView && hasNextPage) {
      fetchNextPage();
    }
  }, [startInView, hasNextPage, fetchNextPage]);

  // render
  if (isLoading) {
    return (
      <div className="chat-content scroller d-flex flex-column-reverse">
        <Loading size={100} textStyle={{ fontSize: '30px' }} />;
      </div>
    );
  }

  if (status === 'error') {
    // @ts-ignore
    return <p>Error: {error?.message}</p>;
  }

  // render ngược lại vì dùng flex-column-reverse
  return (
    <div className="chat-content scroller d-flex flex-column-reverse">
      {conversation ? (
        <>
          <div ref={messageEndRef} />
          <div
            ref={endRef}
            style={{ position: 'absolute', zIndex: -10, opacity: 0, height: '100%', width: '100%' }}
          ></div>

          {conversation?.map(item => {
            if (localUserId === item.sender_id) {
              return (
                <div className="chat d-flex other-user" key={item.id}>
                  <div className="chat-user">
                    <Link className="avatar m-0" to="">
                      <img loading="lazy" src={item?.sender?.avatar} alt="avatar" className="avatar-35 " />
                    </Link>
                    <span className="chat-time mt-1 text-success">{momentVi(item.created_at).fromNow()}</span>
                  </div>
                  <div className="chat-detail" style={{ maxWidth: '60%' }}>
                    <div>
                      <Dropdown className="d-flex justify-content-center align-items-center" as="span">
                        <Dropdown.Toggle
                          as={CustomToggle}
                          variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show text-dark"
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
                      <img loading="lazy" src={item?.sender?.avatar} alt="avatar" className="avatar-35 " />
                    </Link>
                    <span className="chat-time mt-1 text-success">{momentVi(item.created_at).fromNow()}</span>
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
          {/* <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div> */}
          <div ref={startRef}>
            {isFetchingNextPage ? (
              <Loading size={60} textStyle={{ fontSize: '20px' }} textLoading="Đang tải tin nhắn cũ hơn ..." />
            ) : (
              <h4>{conversation.length > 0 ? 'Không còn tin nhắn cũ hơn' : 'Chưa có tin nhắn nào'}</h4>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
});
