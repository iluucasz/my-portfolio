import axios from 'axios';

export const fetchHygraphQuery = async (query: string) => {
   try {
      const response = await axios.post(
         process.env.NEXT_PUBLIC_HYGRAPH_URL!,
         { query },
         {
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`
            }
         }
      );

      const { data } = response.data;

      return data;
   } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
   }
};
