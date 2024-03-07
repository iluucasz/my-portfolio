import { useEffect, useState } from 'react';

export type UseFetchDataProps<T> = {
   requestCallBack: () => Promise<any>;
};

export const useFetchData = <T>({ requestCallBack }: UseFetchDataProps<T>): { data: T | null; isLoading: boolean } => {
   const [ data, setData ] = useState<T | null>(null);
   const [ isLoading, setIsLoading ] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      requestCallBack()
         .then(response => {
            setData(response.data);
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [ requestCallBack ]);

   return { data, isLoading };
};
