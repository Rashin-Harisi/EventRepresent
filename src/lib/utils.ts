import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

export function textSeparation(text:string){
  const textArray = text.split(" ");
  const result = textArray.slice(0,3).join(" ")
  return result
}

export function newPrice(price:string , discount:string){
  const dis= (+price)*(+discount)/100;
  const newP = (+price) - dis
  return newP
}

export const generateOtp = () => {
  return Math.floor(Math.random() * 1000000)
}