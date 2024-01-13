// imports
import { io } from 'socket.io-client';
import { MODE } from './constants';

// vars
const VITE_APP_API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const URL = process.env.NODE_ENV === MODE.PRODUCTION ? undefined : VITE_APP_API_BASE_URL;

// instance
const socket = io(URL, {
    // autoConnect: false,
});

export default socket;