import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Goods from './Components/goods';
import NoMatch from './Components/nomatch';
import Navigation from './Components/header';
import Home from './Components/home';
import RequireAuth from './Components/context/requireAuth';
import { UserContext } from './Components/context/contextAuth';
import { setAuthToken } from './Components/utils/axiosClient';
import Authorization from './Components/Authorization';
import Login from './Components/login';


const GoodsAuthRequire = (
  <RequireAuth>
    <Goods />
  </RequireAuth>
);

function App() {
  const [auth, setAuth] = React.useState(false);
  // пароль Vetka1961
  React.useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAuthToken(token);
      setAuth(true);
    }else {
      setAuth(false)
    }
  }, [auth]);
  const value = { auth, setAuth};
  return (
    <>
    <p>Project</p>
      <UserContext.Provider value={value}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="authorization" element={<Authorization />} />
          <Route path="login" element={<Login />} />
          <Route path="/goods" element={GoodsAuthRequire} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
