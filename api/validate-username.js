import axios from "axios"

/**
 * @function
 * @param {import("@vercel/node").VercelRequest} req
 * @param {import("@vercel/node").VercelResponse} res
 */
const handler = async (req, res) => {
  try {
    const {
      data: [user]
    } = await axios.get(
      `https://jsonplaceholder.typicode.com/users?name=${req.body.username}`
    )

    res.json({
      valid: Boolean(user),
      message: user
        ? `Username ${user.name} isn't available`
        : "Username available"
    })
  } catch (error) {}
}

export default handler
