import Nav from './components/Navigation/Nav.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav></Nav> */}
        <Routes>
          <Route path="/" element={'Home'}>

          </Route>
          <Route path="/news" element={' News'}>

          </Route>
          <Route path="/about" element={'  About'}>

          </Route>
          <Route path="/contact" element={'  Contact'}>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>

          <Route path="/register" element={<Register />}>

          </Route>
          <Route path="*" element={' Not Found'}>

          </Route>

        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Router>
  );
}

export default App;
