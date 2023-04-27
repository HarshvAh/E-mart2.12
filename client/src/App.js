// import logo from './logo.svg';

// Import components here
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/login" ;
import Home from "./components/home_seller" ;
import AnyPage from "./components/anypage" ;
import Register from "./components/register" ;

import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <BrowserRouter>
      <div>
        {/* <NavigationBar/> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register/>}/>
          <Route path="*" element={<AnyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// function NavigationBar() {
//   const location = useLocation();

//   return location.pathname !== "/login" && <Navigation />;
// }

export default App;
