// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchData } from '../../fetch-data';


type Data = {
  error?: string
}

const fetchedData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    fetchData();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default fetchedData;