import './App.css';

import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './pages/NotFound';
import CategoryList from './pages/CategoryList';
import AddCategoryAdmin from './pages/AddCategoryAdmin'
import Detail from './pages/Detail';
import Product from './pages/Product';
import UpdateProduct from './pages/UpdateProduct';
import UpdateCategory from './pages/UpdateCategory';
import Auth from './pages/Auth';
import AddProductAdmin from './pages/AddProductAdmin';
import Complain from './pages/Complain';
import ComplainAdmin from './pages/ComplainAdmin'

import { setAuthToken, API } from './config/api';
import Profile from './pages/Profil';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/auth');
    } else {
      if (state.user.status === 'admin') {
        navigate('/category');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  console.log(state);


  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get('/check');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/' element={<Product />} />
      <Route path='/complain' element={<Complain />} />
      <Route path='/complain-admin' element={<ComplainAdmin />} />
      <Route path='*' element={<Notfound />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/login' element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/update-product/:id" element={<UpdateProduct />} />
      <Route path="/category" element={<CategoryList />} />
      <Route path="/add-category" element={<AddCategoryAdmin />} />
      <Route path="/update-category/:id" element={<UpdateCategory />} />
      <Route path="/update-product/:id" element={<UpdateProduct />} />
      <Route path="/add-product/" element={<AddProductAdmin />} />
    </Routes>


  );
}


export default App;
