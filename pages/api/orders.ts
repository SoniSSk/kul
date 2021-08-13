// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from "razorpay";

type Data = {
  error?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(process.env.RAZORPAY_KEY_ID)
  try {
    if (req.method === 'POST') {
      
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
      const options = {
        amount: 100,
        currency: "INR",
        receipt: "receipt_order_" + Math.floor(Math.random() * 1000),
      };
    
      const order = await instance.orders.create(options);
  
      if (!order) throw new Error("Some error occured");
  
      res.json(order);
    } else {
      res.status(400).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default handler;
