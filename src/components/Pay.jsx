import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const STRIPE_PUB_KEY='pk_test_51LUF47FN7DDetpbPN0HJQdazqeJ8mxeUsDlBxIZjNyYiwSkhPqcp7C5pMYADM5GpTR21FvMYEazCFjuGWWiqLMSy00yay01b72';

export default function Pay() {

  const [stripeToken, setStripeToken] = useState(null);

  const navigate = useNavigate();

  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 2000
        });
        console.log(res.data);
        
        navigate("/success");

      } catch (error) {
        console.log(error);
      }
    }
    stripeToken && makeRequest();

  }, [stripeToken, navigate])
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}  
      >
        { stripeToken ? (
          <span>Processing...</span>
        ) : (
          <StripeCheckout
            name="Carbon Hub"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            billingAddress
            shippingAddress
            description="Your Total is $20"
            amount={2000}
            token={onToken}
            stripeKey={STRIPE_PUB_KEY}
          >

          
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding:"20px",
              backgroundColor: "black",
              color:"white",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Pay Now
          </button>
          </StripeCheckout>
        )}          
      </div>
    </>
  )
}