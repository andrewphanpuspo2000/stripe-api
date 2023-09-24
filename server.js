import express from "express";
import cors from "cors";
const app = express();
import Stripe from "stripe";
app.use(cors());

app.use(express.json());
//preparing to process the payment

app.post("/create-payment-intent", async (req, res) => {
  //use string sdk to process
  const secretKey =
    "sk_test_51LdBFlJyhE6wVt3H6g446fvorppKLxCDuO7u2mTJtV1VaX69AtyBIKOSXE9eQbIFeLMdmYGMjxvYnFZohlCc2O0200ExOiQoXS";

  const stripe = new Stripe(secretKey);
  const { amount, currency, paymentMethodType } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency,
    payment_method_types: [paymentMethodType],
  });

  res.json({
    clientKey: paymentIntent.client_secret,
  });
});
//put the order in DB

app.listen(8002, (err) => {
  err ? console.log(err.message) : console.log("server is running");
});
