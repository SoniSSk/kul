
const getEnvironmentVariables = () => {
    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
    const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const RAZORPAY_SECRET = process.env.NEXT_PUBLIC_RAZORPAY_SECRET;
    const PAYTM_HOST = process.env.NEXT_PUBLIC_PAYTM_HOST;
    const PAYTM_MID = process.env.NEXT_PUBLIC_PAYTM_MID;
    const PAYTM_KEY = process.env.NEXT_PUBLIC_PAYTM_KEY;
    const BACKEND_URL_PROD = process.env.NEXT_PUBLIC_BACKEND_URL_PROD;
    const ENV = process.env.NEXT_PUBLIC_ENV;
    const BACKEND_URL_STAGING = process.env.NEXT_PUBLIC_BACKEND_URL_STAGING;

    return {
      APP_NAME,
      RAZORPAY_KEY_ID,
      RAZORPAY_SECRET,
      PAYTM_HOST,
      PAYTM_KEY,
      PAYTM_MID,
      BACKEND_URL_PROD,
      BACKEND_URL_STAGING,
      ENV
    };
}

export default getEnvironmentVariables;