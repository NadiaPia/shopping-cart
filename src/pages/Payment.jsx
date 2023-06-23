import { useEffect, useState } from "react";
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import './Payment.css';


function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios.get(`https://shopping-hunter-api.web.app/payment/config`).then((r) => {
    const { publishableKey } = r.data;
    //console.log("publishableKey", publishableKey)      
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    axios.post(`https://shopping-hunter-api.web.app/payment/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then((result) => {
      var { clientSecret } = result.data;
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className="paymentContainer">      
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
