import { capitalize } from "lodash"
/**
 * Capitalize sentence every word in search field
 * @function
 * @param {string} input - Input value to search
 * @returns {string} returns capitalized sentence
 */
export const capitalizeInput = input =>
  input
    .split(" ")
    .map(word => capitalize(word))
    .join(" ")
