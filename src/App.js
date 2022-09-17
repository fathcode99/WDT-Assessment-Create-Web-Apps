import React, {useEffect} from 'react';
import './App.css';
import Axios from 'axios'
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import HomePages from './pages/homePages';
import Login from './pages/loginPages';
import Register from './pages/registerPages'
import DetailPages from './pages/detailPages';
import CartPages from './pages/cartPages';
import FavoritePages from './pages/favoritePages';

const url = 'http://localhost:2000'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    let id = localStorage.getItem('idUser')
    Axios.get(`${url}/user/${id}`)
      .then(res => {
        dispatch({
          type: 'LOGIN',
          payload: res.data
        })
      })
  });

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePages />}  />
        <Route path='/login' element={<Login />}  />
        <Route path='/register' element={<Register/>}  />
        <Route path="/detail/:id" element={<DetailPages />} />
        <Route path="/cart" element={<CartPages />} />
        <Route path="/favorite" element={<FavoritePages />} />
      </Routes>
    </div>
  );
}

export default App;