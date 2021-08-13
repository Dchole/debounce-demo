import { useCallback, useState } from "react"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment
} from "@material-ui/core"
import { API } from "../../App"
import { capitalizeInput } from "../utils"
import useDebounce from "../../hooks/useDebounce"
import { initialValues, validationSchema } from "./formik-config"

/** @type {React.FC<{availableUsers: string[]}>} */
const LoginForm = ({ availableUsers }) => {
  const [error, setError] = useState(initialValues)
  const [values, setValues] = useState(initialValues)
  const [validatingField, setValidatingField] = useState("")

  const validateUsername = useCallback(async () => {
    const capitalizedInput = capitalizeInput(values.username)
    const encodedName = encodeURIComponent(capitalizedInput)
    const isUserAvailable = availableUsers.some(name =>
      name.startsWith(capitalizedInput)
    )

    if (values.username && !isUserAvailable) {
      return setError(prevError => ({
        ...prevError,
        username: "username is not available"
      }))
    }

    setError(initialValues)
    try {
      const [userDetails] = await fetch(`${API}?name=${encodedName}`).then(
        res => res.json()
      )
      console.log(userDetails)
      // setUserDetails((prevDetails) => ({ ...prevDetails, ...userDetails }));
    } catch (error) {
      console.log(error.message)
    } finally {
      setValidatingField("")
    }
  }, [values.username, availableUsers])

  const validateEmail = useCallback(() => {}, [values.email])
  const validatePassword = useCallback(() => {}, [values.password])

  useDebounce(validateUsername)
  useDebounce(validateEmail)

  /**
   * @typedef {typeof initialValues} TValues
   */

  /**
   * @function
   * @param {TValues} values - form field values
   * @param {import("formik").FormikHelpers<TValues>} actions - formik actions
   */
  const handleSubmit = (values, actions) => {
    console.log({ values, actions })
  }

  /**
   * @typedef {import("formik").FormikProps<TValues>} FormikProps
   */
  /**
   * Function that returns a custom onChange event handler
   * The handler sets user input value to state value for external validation
   * @function
   * @param {FormikProps['handleChange']} handleChange - handleChange handler from formik props
   * @param {FormikProps['errors']} formikErrors - formik errors
   * @param {FormikProps['setErrors']} setFormikErrors - formik action to set errors
   * @returns {(event: React.ChangeEvent<HTMLFormElement>) => void} returns custom onChange event handler
   */
  const handleChangeCustom =
    (handleChange, formikErrors, setFormikErrors) => event => {
      setValidatingField(event.target.name)
      handleChange(event)
      setFormikErrors({ ...formikErrors, username: error.username })

      setValues(prevValues => ({
        ...prevValues,
        [event.target.name]: event.target.value
      }))
    }

  return (
    <Container maxWidth="xs">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, errors, setErrors }) => (
          <Form
            autoComplete="off"
            onChange={handleChangeCustom(handleChange, errors, setErrors)}
          >
            <Field
              component={TextField}
              id="username"
              margin="normal"
              name="username"
              label="Username"
              variant="outlined"
              autoCapitalize="word"
              helperText="Username must be available"
              placeholder={
                availableUsers.length ? `Ex. ${availableUsers[0]}` : ""
              }
              autoFocus
              fullWidth
              InputProps={{
                endAdornment:
                  validatingField === "username" ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : undefined
              }}
            />
            <Field
              component={TextField}
              id="email"
              margin="normal"
              name="email"
              label="Email"
              variant="outlined"
              helperText="Enter any valid email"
              fullWidth
              InputProps={{
                endAdornment:
                  validatingField === "email" ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : undefined
              }}
            />
            <Field
              component={TextField}
              id="current-password"
              margin="normal"
              name="password"
              label="Password"
              variant="outlined"
              autoComplete="current-password"
              fullWidth
              InputProps={{
                endAdornment:
                  validatingField === "password" ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : undefined
              }}
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                disableElevation={isSubmitting}
              >
                Sign in {isSubmitting && <CircularProgress size={24} />}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LoginForm
