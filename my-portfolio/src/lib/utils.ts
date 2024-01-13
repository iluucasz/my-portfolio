import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}


//JUNTA CLASSE
// twMerge(
//   'text-white',
//   'bg-red-900'
// )

//FAZ CONDIÇÃO DE CLASSE
// clsx({
//   "text-red-900": false
// }
// )