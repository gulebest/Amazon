import React, { useContext, useState, useEffect } from 'react';
import classes from './orders.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { db } from '../../../Utility/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import ProductCard from '../../Components/Product/ProductCard';

function Orders() {
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));
      //Empty the basket
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log( snapshot);
        setOrders(
          snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
          }))
        );
       
      });
      return () => unsubscribe();
    }else{
      setOrders([])
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          <div style={{padding:"20px"}}>
          {
            orders?.length==0 && <div>You don't have orders yet.</div>
          }
          </div>
          <div>{
            
             orders?.map((eachOrder, i)=>{
                return(
                  <div key={i}>
                    <hr/>
                    <p>Order ID:{eachOrder?.id}</p>
                    {
                      eachOrder?.data?.basket?.map(order=>(
                        <ProductCard  
                        flex={true}
                        product={order}
                        key={order.id}
                        />
                       

                      ))
                    }
                  </div>
                )
              })





            }</div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
