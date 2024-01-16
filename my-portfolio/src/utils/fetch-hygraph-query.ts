import { NEXT_PUBLIC_HYGRAPH_TOKEN, NEXT_PUBLIC_HYGRAPH_URL } from "../../config/index.";

export const fetchHygraphQuery = async (query: string, revalidate?: number) => {
  const response = await fetch(NEXT_PUBLIC_HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${NEXT_PUBLIC_HYGRAPH_TOKEN}`
    },
    body: JSON.stringify({ query }),
    next: {
      revalidate
    }
  })

  const { data } = await response.json();

  return data;
}