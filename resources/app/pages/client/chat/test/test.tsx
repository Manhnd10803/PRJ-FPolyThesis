import { MessagesService } from '@/apis/services/messages.service';
import Echo from 'laravel-echo';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import io from 'socket.io-client';

export const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  // Khai báo biến socket ở cấp độ component
  // const socket = io('http://localhost:6001');

  const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:6001',
  });

  // useEffect(() => {
  //   // Lắng nghe sự kiện 'chat' để nhận tin nhắn từ máy chủ Laravel
  //   socket.on('chat', (message) => {
  //     console.log('Received message:', message);
  //     setReceivedMessage(message);
  //   });

  //   return () => {
  //     // Ngắt kết nối khi component bị hủy
  //     socket.disconnect();
  //   };
  // }, [socket]);

  // const handleSendMessage = (e) => {
  //   e.preventDefault();

  //   const messageText = message.trim();
  //   if (messageText) {
  //     // Gửi tin nhắn từ ứng dụng React
  //     socket.emit('chat', messageText);

  //     // Gửi tin nhắn đến Laravel thông qua broadcasting
  //     MessagesService.sendMessages({ content: messageText }).then((response) => {
  //       console.log('Sent message:', response.data);
  //     });

  //     setMessage('');
  //   }
  // };

  useEffect(() => {
    // Lắng nghe sự kiện 'chat' để nhận tin nhắn từ máy chủ Laravel
    const receiver_id = 6;
    echo.private(`user.${receiver_id}`).listen('PrivateMessageSent', event => {
      console.log('Received message:', event.message);
      setReceivedMessage(event.message);
    });

    return () => {
      // Ngắt kết nối khi component bị hủy
      echo.disconnect();
    };
  }, [echo]);

  const handleSendMessage = e => {
    e.preventDefault();

    const messageText = message.trim();
    if (messageText) {
      const receiver_id = 6;

      // Gửi tin nhắn đến Laravel thông qua broadcasting
      MessagesService.sendMessages({ content: messageText }).then(response => {
        console.log('Sent message:', response.data);
      });
      // Gửi tin nhắn từ ứng dụng React
      echo.private(`user.${receiver_id}`).whisper('typing', {
        message: messageText,
      });

      setMessage('');
    }
  };

  return (
    <div id="content-page" className="content-page">
      <Container>
        <Row>
          <Col sm="5" lg="5"></Col>
          <Col sm="5" lg="5">
            <h1>Socket.IO Chat Example</h1>
            <Form onSubmit={handleSendMessage} encType="multipart/form-data">
              <Form.Group className="form-group">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control
                  type="text"
                  value={message}
                  name="content"
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Enter your message"
                  rows={5}
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button type="submit" className={`d-block w-100 mt-3`} variant="primary">
                  Send
                </Button>
              </div>
            </Form>
            <div>
              <p>Received message: {receivedMessage}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
