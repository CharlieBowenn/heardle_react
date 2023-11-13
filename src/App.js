import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Categories from "./pages/Categories";
import GuitarLogo from './pics/GuitarLogo.png'
import './AppStyle.css';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
      </Routes>
    </>
  )
}
export default App;
// function App() {
//   return (
//     <div className="AppStyle">
//       <header className="App-header">
//         <img src={GuitarLogo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//       </header>
//     </div>
//   );
// }