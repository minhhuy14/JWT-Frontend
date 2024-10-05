import NavHeader from './components/Navigation/NavHeader.js';
import "./App.scss";
import {
  BrowserRouter as Router
} from "react-router-dom";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useContext, useState } from 'react';
import _ from 'lodash'
import AppRoutes from './routes/AppRoutes.js';
import { Rings } from 'react-loader-spinner';
import { UserContext } from './context/UserContext.js';

function App() {

  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <Rings
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <div>Loading data...</div>
          </div>

          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className="App">
              <AppRoutes />
            </div>
          </>
        }
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
