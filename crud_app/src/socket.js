import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:8000';
const token=localStorage.getItem('token');

export const socket = io(URL, {
    autoConnect: false,
    auth: {token:token}
  });