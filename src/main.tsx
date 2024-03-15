import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'
import.meta.env

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'https://13.235.104.232/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>,
)
