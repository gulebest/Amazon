import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './assets/Pages/Landing/Landing.jsx'
import Payment from './assets/Pages/Payment/Payment.jsx'
import Orders from './assets/Pages/Orders/Orders.jsx'
import Cart from './assets/Pages/Cart/Cart.jsx'
import Results from './assets/Pages/Results/Results.jsx';
import ProductDetail from './assets/Pages/ProductDetail/ProductDetail.jsx'
import {CheckoutProvider} from '@stripe/react-stripe-js/checkout';
import {loadStripe} from '@stripe/stripe-js';
import Auth from './assets/Pages/Auth/Auth.jsx';
import { Elements } from '@stripe/react-stripe-js';
import ProtectedRout from '../src/assets/Components/Protected/ProtectedRout'

const stripePromise = loadStripe('pk_test_51SNId5JWhKSIeDPOAQCM5t65dcTeArpbOIjWh9BQIVpOnxD0yv3dCpDxuwpdE71UsXZQ2A1omy5X9MPINh5kOyqB00EthvbXJM');

function Routing() {

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/payment' element={
          <ProtectedRout msg={"you must log in to pay"}
          redirect={"/payment"}>
          <Elements stripe={stripePromise}>
          <Payment/>
          </Elements>
          </ProtectedRout>
          }/>
        <Route path='/orders' element={
          <ProtectedRout msg={"you must log in to see your orders"}
          redirect={"/orders"}>


            <Orders/>
          </ProtectedRout>
          }/>
          
        <Route path='/category/:categoryName' element={<Results/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/products/:productId' element={<ProductDetail/>}/>
      </Routes>
    </Router>

  )
}

export default Routing