//@ts-ignore
import socketio from 'socket.io-client';

// import Echo from 'laravel-echo';
import Echo from 'laravel-echo/dist/echo';

import { StorageFunc } from './utilities/local-storage/storage-func';

const token = StorageFunc.getAccessToken();

declare global {
  interface Window {
    Echo: Echo;
  }
}

window.Echo = new Echo({
  host: 'http://localhost:6001',
  broadcaster: 'socket.io',
  wsPort: 6001,
  client: socketio,
  encrypted: false, //Chỉ định xem kết nối giữa client và server có sử dụng SSL/TLS để mã hóa hay không
  disableStats: true, //thu thập thống kê (statistics) của kết nối
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
  transports: ['websocket'],
});

window.Echo.connector.socket.connected = true;
