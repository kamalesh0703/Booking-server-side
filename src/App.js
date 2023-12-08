import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import List from './Components/List/List';
import Hotel from './Components/Hotel/Hotel';   
import Signup from './Components/Signup/Signup'; 
import NavBar from './Components/Navbar/NavBar'; 
function App() {   
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/'  element={<Home/>} />
          <Route path='/hotels'  element={<List/>} />
          {/* <Route path='/services' element={<List/>} /> */}
          <Route path='/hotels/:id' element={<Hotel/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
