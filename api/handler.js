/**
 * @function
 * @param {import("@vercel/node").VercelRequest} _req
 * @param {import("@vercel/node").VercelResponse} res
 */
const handler = async (_req, res) => {
  try {
    res.json({ message: "Sign up successful" })
  } catch (error) {
    console.log(error.message)
    res.status(500).end("Something went wrong")
  }
}

export default handler
