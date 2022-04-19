import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const paymentHandler = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) return

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 10000 }),
    }).then((res) => {
      return res.json();
    });

    console.log(response)
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPES_CLASSES.inverted}>Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm