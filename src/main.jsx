import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/userContext.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
)
