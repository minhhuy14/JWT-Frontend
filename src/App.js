import Nav from './components/Navigation/Nav.js';
import Login from './components/Login/Login.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

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
          <Route path="*" element={' Not Found'}>

          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
