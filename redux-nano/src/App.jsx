
import './App.css'
import { Route , Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Landing from './components/Landing'
import Login from './components/Login'
import AddQuestion from './components/AddQuestion';
import Leaderboard from './components/LeaderBoard';

function App() {


  return (
    <>
    <Navbar/>
   <Routes>
   <Route path="/Landing"  element={<Landing/>} />

   <Route path="/Home"  element={<Home/>} />
   <Route path="/LeaderBoard"  element={<Leaderboard/>} />

  <Route path="/login" element={<Login/>} />
  <Route path="/addQuestion" element={<AddQuestion/>} />
  {/* <Route path="/" element={<Landing/>} /> */}

   </Routes>
    </>
  )
}

export default App
