/**
 * Handles api requests
 * @function
 * @param {string} field - field to be validated
 * @param {string} value - field input value
 * @returns {Promise<{valid: boolean, message: string}>}
 */
export const validateWithAPI = async (field, value) => {
  const data = await fetch(`/api/validate-${field}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ [field]: value })
  }).then(res => res.json())

  return { ...data, field }
}
