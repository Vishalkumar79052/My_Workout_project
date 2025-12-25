import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Navbar from './component/Navbar';


function App() {
  return (
  <div className="App">
     <BrowserRouter>
     <Navbar/>
       <div className="pages">
        <Routes>
          <Route path='/' element={<Home/>}>

          </Route>
        </Routes>

       </div>

     </BrowserRouter>
  </div>

  );
}

export default App;
