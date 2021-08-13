import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import PaytmChecksum from './PaytmChecksum';
import getConfig from "next/config";

type Data = {
    error?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { publicRuntimeConfig } = getConfig();
    const { PAYTM_MID, PAYTM_KEY } = publicRuntimeConfig;
    console.log(req.query.id)
    try {
        if (req.method === 'GET') {
            var paytmParams: any = {};
            const mid = PAYTM_MID;
            const key = PAYTM_KEY;
            const orderId = "Order_" + new Date().toLocaleTimeString().replace(" ", "").split(":").join("")
            paytmParams.body = {
                "requestType": "Payment",
                "mid": mid,
                "websiteName": "WEBSTAGING",
                "orderId": orderId,
                // "callbackUrl": "https://merchant.com/callback",
                "txnAmount": {
                    "value": "1.00",
                    "currency": "INR",
                },
                "userInfo": {
                    "custId": "CUST_001"

                }
            };

            const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), key);

            paytmParams.head = {
                "signature": checksum
            };

            const result = await axios.post(`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`, paytmParams);

            if (!result.data.body) throw new Error("Some error occured");

            res.json({ ...result.data, orderId });
        } else {
            res.status(400).json({ error: "Method not allowed" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default handler;
