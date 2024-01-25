import { useEffect, useState } from "react"

export type UseFetchDataProps<T> = {
  requestCallBack: () => Promise<any>
}

export const useFetchData = <T> ({ requestCallBack }: UseFetchDataProps<T>): {data: T | null} => {
  const [data, setData] = useState<undefined | any>()

  useEffect(() => {
    const fetchCallBack = async () => {
      const response = await requestCallBack();
      setData(response)
    }
    fetchCallBack();
  }, [requestCallBack])

  return { data }
}
