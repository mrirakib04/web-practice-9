import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { UserMainContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router";

// Load your Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ rerefetchHR }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);

  const { data: userForPay = [] } = useQuery({
    queryKey: ["userForPay"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/hr/${user.email}`);
      return res.data;
    },
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not initialized. Please try again later.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    setIsLoading(true);
    setErrorMessage("");
    setPaymentSuccess(false);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (userForPay.paymentStatus === "paid") {
        console.log("paid", userForPay);
        const currentLimit = parseInt(userForPay.packageName);
        const limitValue = { packageName: currentLimit + 10 };
        AxiosSecure.patch(`/hr/limit/${user.email}`, limitValue)
          .then((res) => {
            setPaymentSuccess(true);
            setIsLoading(false);
            cardElement.clear(); // Clear card details after success
            console.log(res, user.email);
            rerefetchHR();
          })
          .catch((error) => {
            setErrorMessage(error || "Payment failed.");
            setIsLoading(false);
          });
        console.log(limitValue);
        return;
      }

      // Call your backend to complete the payment
      AxiosSecure.post("/payments", {
        paymentId: paymentMethod.id,
        paidBy: user.email,
      })
        .then((res) => {
          setPaymentSuccess(true);
          setIsLoading(false);
          cardElement.clear(); // Clear card details after success
          console.log(res, user.email);

          AxiosSecure.patch(`/hr/${user.email}`);
        })
        .catch((error) => {
          setErrorMessage(error || "Payment failed.");
          setIsLoading(false);
        });
    } catch (error) {
      setErrorMessage(`Payment failed. Please try again. ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Card Details</h2>
      <div className="p-2 border rounded-lg mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#4b5563" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`w-full py-2 text-white font-medium rounded-lg ${
          isLoading || !stripe
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
      {paymentSuccess && (
        <p className="mt-4 text-green-600 font-medium">
          Payment Successful! Thank you.
        </p>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>
      )}
    </form>
  );
};

PaymentForm.propTypes = {
  rerefetchHR: PropTypes.func.isRequired,
};

const Payment = ({ rerefetchHR }) => {
  const navigate = useNavigate();
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);
  const location = useLocation();
  console.log("location", location.pathname);

  const { data: hrForPaymentCheck = [] } = useQuery({
    queryKey: ["hrForPaymentCheck"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/hr/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  useEffect(() => {
    if (
      hrForPaymentCheck?.paymentStatus === "paid" &&
      location?.pathname === "/hr/payment"
    ) {
      navigate("/hr/dashboard/home");
    }
  }, [hrForPaymentCheck, navigate, location]);

  return (
    <div className="flex justify-center items-center bg-white mt-10 w-full">
      <div className="bg-white shadow-md rounded-lg p-6 md:w-1/2 lg:w-1/3 w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Pay Your Package Charge
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Complete your payment securely using your preferred method.
        </p>
        <Elements stripe={stripePromise}>
          <PaymentForm rerefetchHR={rerefetchHR}></PaymentForm>
        </Elements>
      </div>
    </div>
  );
};

Payment.propTypes = {
  rerefetchHR: PropTypes?.func?.isRequired, // Validate that rerefetchHR is a required function
};

export default Payment;
