import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './assets/Pages/Landing/Landing.jsx'
import SignUp from './assets/Pages/Auth/SignUp.jsx'
import Payement from './assets/Pages/Payement/Payement.jsx'
import Orders from './assets/Pages/Orders/Orders.jsx'
import Cart from './assets/Pages/Cart/Cart.jsx'
import Results from './assets/Pages/Results/Results.jsx';
import ProductDetail from './assets/Pages/ProductDetail/ProductDetail.jsx'
function Routing() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<SignUp/>}/>
        <Route path='/payement' element={<Payement/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/category/:categoryName' element={<Results/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/products/:productId' element={<ProductDetail/>}/>
      </Routes>
    </Router>

  )
}

export default Routing