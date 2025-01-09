const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_51OKcINSBDQWgvrpB4K7oBAwXByuPC28Ycq7UMj4svIUTA2AA4yi4rjCOx15CqCQ2nufZHw41QY5guG4DU8NIY5n900JG7LlB51');

const PORT = 8080

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const amount = req.body.amount
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2024-12-18.acacia'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      customer: customer.id,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51OKcINSBDQWgvrpBV5lfsLxT1bZQNzI406M6mDWIRm1nWKtNVdKvz28cEuHUKVkuLF8aicUUkfLBlrF9kCSGvZdw00ccbPJ2Mv'
    });
    
  });

app.listen(PORT,()=>{
    console.log('server is running at port',PORT)
})