import mailcheck from "mailcheck"
import validator from "deep-email-validator"

/**
 * @function
 * @param {import("@vercel/node").VercelRequest} req
 * @param {import("@vercel/node").VercelResponse} res
 */
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      mailcheck.run({
        email: req.body.email,
        suggested: ({ domain, full }) => {
          res.json({
            valid: false,
            message: `Did you mean ${full} instead? Change ${
              req.body.email.split("@")[1]
            } to ${domain}`
          })
        },
        empty: async () => {
          const { reason } = await validator(req.body.email)

          res.json({
            valid: true,
            message:
              reason === "disposable"
                ? "Disposable emails are not accepted"
                : `${req.body.email} is a valid email address`
          })
        }
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).end("Something went wrong")
    }
  } else {
    res.status(404).send(res.statusMessage || res.statusCode)
  }
}

export default handler
