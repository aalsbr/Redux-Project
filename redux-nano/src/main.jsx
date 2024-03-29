import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store , { persistor } from './store.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>
 
)
