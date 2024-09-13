import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'
import.meta.env

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'https://api.40god.in/';
axios.defaults.baseURL = 'https://api.40god.in/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>,
)
