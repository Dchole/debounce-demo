import { capitalize } from "@material-ui/core/utils"

/**
 * Handles api requests
 * @function
 * @param {string} field - field to be validated
 * @param {string} value - field input value
 * @returns {Promise<{valid: boolean, message: string}>}
 */
export const validateWithAPI = async (field, value) => {
  try {
    const res = await fetch(`/api/validate-${field}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ [field]: value })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    console.log(data, res.ok)

    return { ...data, field }
  } catch (error) {
    console.log({ error })

    const customError = new Error(
      `${capitalize(
        field
      )} validation failed\nBut don't fling. Go and and submit your form`
    )
    customError.name = field

    throw customError
  }
}
