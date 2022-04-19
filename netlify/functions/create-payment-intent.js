require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

console.log(process.env)

const headers = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  ? {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST'}
  : {};

exports.handler = async (event) => {

  if (event.httpMethod !== 'POST') {
    // To enable CORS
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: 'This was not a POST request!'
    };
  }

  try {
    // in cents
    const { amount } = JSON.parse(event.body)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
      headers
    }
  } catch (error) {
    console.log({ error })

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
      headers
    }
  }
}

