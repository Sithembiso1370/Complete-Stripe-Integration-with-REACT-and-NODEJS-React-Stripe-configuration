import './App.css';
import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


function App() {
  const publishableKey ='pk_test_51MqH3fCOumsDCIEuHDYMd7LQpLV4MtfBOH3MQlOkXQ94loQ8QosfAb5BygVLszcFaSKfkcPVZvqMBl8LfEEXaSy900FeCYfM5w';
  const [product, setproduct] = useState({
    name: 'Mpesu',
    price: 18,
  });

  const priceForStripe = product.price*100;

  const payNow = async token =>{
    try {
      const response = await axios({
        url: 'http://localhost:5000/payment',
        method: 'post',
        data: {
          amount:  product.price*100,
          token
        },
      });

      if(response.status === 200){
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      // console.log('Your payment was succesfull..')
    }
  }

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };


  return (
    <div className="container">
      <h2>Complete React and Stripe Payment Intergration</h2>
      <p>
        <span>Product: </span>{product.name}
      </p>
      <p>
        <span>Price: </span>${product.price}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default App;
