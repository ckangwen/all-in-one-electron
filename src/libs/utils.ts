import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const hasOwnProperty = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<string | number | symbol, any>,
	K extends string | number | symbol,
>(
	object: T,
	property: K
): object is T & Record<K, unknown> => Object.prototype.hasOwnProperty.call(object, property);

