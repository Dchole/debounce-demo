import checkPassword from "hibp-checker"

/**
 * @function
 * @param {import("@vercel/node").VercelRequest} req
 * @param {import("@vercel/node").VercelResponse} res
 */
const handler = async (req, res) => {
  try {
    const compromised = await checkPassword(req.body.password)

    res.json({
      valid: !compromised,
      message: compromised
        ? "This password has been compromised, Enter a different password"
        : undefined
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).end("Something went wrong")
  }
}

export default handler
