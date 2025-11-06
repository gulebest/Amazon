import React, { useContext, useState, useEffect } from 'react';
import classes from './orders.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';

import {
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';

// Adjust this import path based on your folder structure
import { db } from '../../../Utility/firebase';

function Orders() {
  const { state } = useContext(DataContext);
  const user = state.user;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));

        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className={classes.orders_list}>
              {orders.map((order) => (
                <div key={order.id} className={classes.order_card}>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Amount:</strong> ${(order.amount / 100).toFixed(2)}</p>
                  <p><strong>Date:</strong> {new Date(order.created * 1000).toLocaleString()}</p>
                  <div>
                    <strong>Items:</strong>
                    <ul>
                      {order.basket?.map((item, i) => (
                        <li key={i}>
                          {item.title || item.name || 'Product'} — Qty: {item.amount || 1} — ${item.price?.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
