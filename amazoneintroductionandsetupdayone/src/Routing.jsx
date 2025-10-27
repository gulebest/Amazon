import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './assets/Pages/Landing/Landing.jsx'
import Payment from './assets/Pages/Payment/Payment.jsx'
import Orders from './assets/Pages/Orders/Orders.jsx'
import Cart from './assets/Pages/Cart/Cart.jsx'
import Results from './assets/Pages/Results/Results.jsx';
import ProductDetail from './assets/Pages/ProductDetail/ProductDetail.jsx'
import Auth from './assets/Pages/Auth/Auth.jsx';
function Routing() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/category/:categoryName' element={<Results/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/products/:productId' element={<ProductDetail/>}/>
      </Routes>
    </Router>

  )
}

export default Routing