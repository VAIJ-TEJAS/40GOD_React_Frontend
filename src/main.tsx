import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'
import.meta.env

// axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.baseURL = 'https://api.40god.com/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>,
)
