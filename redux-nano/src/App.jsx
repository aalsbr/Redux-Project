
import './App.css'
import { Route , Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Landing from './components/Landing'
import Login from './components/Login'
import AddQuestion from './components/AddQuestion';

function App() {


  return (
    <>
    <Navbar/>
   <Routes>
   <Route path="/Landing"  element={<Landing/>} />

   <Route path="/Home"  element={<Home/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/addQuestion" element={<AddQuestion/>} />
  {/* <Route path="/" element={<Landing/>} /> */}

   </Routes>
    </>
  )
}

export default App
