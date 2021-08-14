import axios from "axios"
import { capitalizeInput } from "../src/components/utils"

/**
 * @function
 * @param {import("@vercel/node").VercelRequest} req
 * @param {import("@vercel/node").VercelResponse} res
 */
const handler = async (req, res) => {
  try {
    const capitalizedInput = capitalizeInput(req.body.username)
    const encodedName = encodeURIComponent(capitalizedInput)

    const {
      data: [user]
    } = await axios.get(
      `https://jsonplaceholder.typicode.com/users?name=${encodedName}`
    )

    res.json({
      valid: Boolean(user),
      message: user
        ? "Username available"
        : `"${req.body.username}" isn't available in our database`
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).end("Something went wrong")
  }
}

export default handler
