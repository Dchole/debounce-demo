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

/**
 * Handles api requests
 * @function
 * @param {string} field - field to be validated
 * @param {Record<string, string>} value - field input value
 * @returns {Promise<{valid: boolean, message: string}>}
 */
export const validateWithAPI = async (field, value) => {
  const data = await fetch(`/api/validate-${field}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(value)
  }).then(res => res.json())

  return data
}
