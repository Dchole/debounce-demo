import checkPassword from "hibp-checker"

/**
 * @function
 * @param {import("@vercel/node").VercelRequest} req
 * @param {import("@vercel/node").VercelResponse} res
 */
const handler = async (req, res) => {
  const compromised = await checkPassword(req.body.password)

  res.json({
    valid: !compromised,
    message: compromised
      ? "This password has been compromised, Please try again"
      : undefined
  })
}

export default handler
