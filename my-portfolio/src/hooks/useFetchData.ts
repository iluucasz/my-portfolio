import { useEffect, useState } from "react"

export type UseFetchDataProps = {
  requestCallBack: () => Promise<any>
}

export const useFetchData = ({ requestCallBack }: UseFetchDataProps) => {
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
