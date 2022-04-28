import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import {BUTTON_TYPES_CLASSES} from "../button/button.component";

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton
} from "./payment-form.styles";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectCartTotal} from "../../store/cart/cart.selector";
import {FormEvent, useState} from "react";
import {StripeCardElement} from "@stripe/stripe-js";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const currentUser = useSelector(selectCurrentUser)
  const cartTotal = useSelector(selectCartTotal)

  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) return

    setIsProcessingPayment(true)

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => {
      return res.json();
    });

    const { paymentIntent: { client_secret } } = response

    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        }
      }
    })

    if (paymentResult.error) {
      alert('payment result error')
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('success')
      }
    }

    setIsProcessingPayment(false)
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPES_CLASSES.inverted}>Pay Now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm