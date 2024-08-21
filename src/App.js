/* eslint-disable */

import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import Mypage from './route/mypage.js';
import First from './route/first.js';
import SchoolMap from './route/school.js';
import Login from './route/login.js';
import Signup from './route/signup.js';
import Home from './route/home.js';
import Allow from './route/allow.js';
import Navigatebar from './route/nav.js';
import Meals from './route/meal.js';
import Community from './route/community.js';
import CommunityWrite from './route/communitywrite.js';
import View from './route/view.js';
import TSignup from './route/tsignup.js';
import MoningSong from './route/moningsong.js';
import Catmap from './route/catmap.js';

function App() {

  let [login, setLogin] = useState(0);
  let [url, setUrl] = useState('/');


  let navigate = useNavigate()

  let info = sessionStorage.getItem("info");
  let session_id = sessionStorage.getItem("session_id");

  let urlcheck = useQuery('urlcheck', () => {
    setUrl(window.location.pathname != url ? window.location.pathname : url);
  }, {
    refetchInterval: 1000
  })

  useEffect(() => {
    if (session_id !== '' && info !== '') {
      axios.post('https://posan-web.vercel.app/logcheck', {
        info: info,
        session_id: session_id,
      }).then((result) => {
        if (result.data === '로그인' || result.data === '잘못된 접근') {
          sessionStorage.setItem('info', '');
          sessionStorage.setItem('session_id', '');
          setLogin(1);
        } else {
          const log = async () => {
            await setLogin(2);
          }
          log();
        }
      });
    } else {
      setLogin(1);
    }
  }, [url])


  return (
    <div className="App">
      {
        login == 2 && (<Navigatebar />)
      }
      <Container>
        <Routes>
          {
            login == 1 && (<>
              <Route path="/" element={<First />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/H@Y^ra9eN@jXp" element={<TSignup />} />
              <Route path="/*" element={<Login />} />
            </>)
          }
          {
            login == 2 && (<>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/booking" element={<SchoolMap />} />
              <Route path="/allow" element={<Allow />} />
              <Route path="/meal" element={<Meals />} />
              <Route path="/community" element={<Community />} />
              <Route path="/communitywrite" element={<CommunityWrite />} />
              <Route path="/community/view/:id" element={<View />} />
              <Route path="/yaxNP@w9V+d!@yn/:id" element={<Allow />} />
              <Route path="/moningsong" element={<MoningSong />} />
            </>)
          }

        </Routes>
      </Container>
      <br /><br />
    </div>
  )

}

export default App;
