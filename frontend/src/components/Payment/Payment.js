// import React from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { useParams } from "react-router-dom";
// import { stripePublicKey } from "../../helper";

// const Payment = () => {
//   const { totAmt } = useParams();
//   console.log("TOTALL:", totAmt);
//   const onToken = (token) => {
//     console.log("Payment Token:", token);
//     // Handle payment completion here if needed
//   };

//   return (
//     <div className="paymentPage">
//       <h2>Payment</h2>
//       <div className="paymentDetails">
//         <p>Total Amount: {totAmt} INR</p>
//       </div>
//       <StripeCheckout
//         name="Shopping Cart Payment"
//         currency="INR"
//         amount={totAmt * 100}
//         token={onToken}
//         stripeKey={stripePublicKey}
//       >
//         <button>Pay Now</button>
//       </StripeCheckout>
//     </div>
//   );
// };

// export default Payment;
