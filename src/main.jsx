import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/userContext.jsx'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>
  </Router>
)
