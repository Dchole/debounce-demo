import { useCallback, useReducer, useState } from "react"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import {
  Button,
  CircularProgress,
  Container,
  InputAdornment
} from "@material-ui/core"
import { Check } from "@material-ui/icons"
import { initialValues, validationSchema } from "./formik-config"
import { validateWithAPI } from "../utils"
import useDebounce from "../../hooks/useDebounce"
import validationReducer, { initialState } from "../validationReducer"

/** @type {React.FC<{availableUsers: string[]}>} */
const LoginForm = ({ availableUsers }) => {
  const [validatingField, setValidatingField] = useState("")
  const [error, setError] = useState(false)
  const [state, dispatch] = useReducer(validationReducer, initialState)

  const validateField = useCallback(async () => {
    if (state[validatingField]?.value && !error) {
      try {
        const { valid, message } = await validateWithAPI(validatingField, {
          [validatingField]: state[validatingField].value
        })

        dispatch({
          field: validatingField,
          payload: { valid, helperText: message }
        })
      } catch (error) {
        console.log(error.message)
      } finally {
        setValidatingField("")
      }
    } else {
      setValidatingField("")
    }
  }, [state, error, validatingField])

  useDebounce(validateField)

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
   *
   * Function that returns a custom onChange event handler
   * The handler sets user input value to state value for external validation
   * @function
   * @param {FormikProps['handleChange']} handleChange - handleChange handler from formik props
   * @param {FormikProps['errors']} formikErrors - formik errors
   * @returns {(event: React.ChangeEvent<HTMLFormElement>) => void} returns custom onChange event handler
   */
  const handleChangeCustom = (handleChange, formikErrors) => event => {
    setValidatingField(event.target.value ? event.target.name : "")
    handleChange(event)
    setError(Boolean(formikErrors[event.target.name]))

    dispatch({
      field: event.target.name,
      payload: {
        value: event.target.value,
        helperText: ""
      }
    })
  }

  return (
    <Container maxWidth="xs">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, errors }) => (
          <Form
            onChange={handleChangeCustom(handleChange, errors)}
            autoComplete="off"
          >
            <Field
              component={TextField}
              id="username"
              margin="normal"
              name="username"
              label="Username"
              variant="outlined"
              autoCapitalize="word"
              placeholder={
                availableUsers.length ? `Ex. ${availableUsers[0]}` : ""
              }
              color={
                !errors.username && state.username.valid ? "success" : "primary"
              }
              sx={{
                "& .MuiFormHelperText-root": {
                  color:
                    !errors.username && state.username.valid
                      ? "green"
                      : undefined
                }
              }}
              helperText={state.username.helperText}
              error={Boolean(errors.username) || !state.username.valid}
              autoFocus
              fullWidth
              InputProps={{
                endAdornment:
                  validatingField === "username" ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : state.username.valid ? (
                    <InputAdornment position="end">
                      <Check color="success" />
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
              color={!errors.email && state.email.valid ? "success" : undefined}
              sx={{
                "& .MuiFormHelperText-root": {
                  color:
                    !errors.email && state.email.valid ? "green" : undefined
                }
              }}
              helperText={state.email.helperText}
              error={Boolean(errors.email) || !state.email.valid}
              fullWidth
              InputProps={{
                endAdornment:
                  validatingField === "email" ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : state.email.valid ? (
                    <InputAdornment position="end">
                      <Check color="success" />
                    </InputAdornment>
                  ) : undefined
              }}
            />
            <Field
              component={TextField}
              id="current-password"
              margin="normal"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              autoComplete="current-password"
              color={
                !errors.password && state.password.valid ? "success" : undefined
              }
              sx={{
                "& .MuiFormHelperText-root": {
                  color:
                    !errors.password && state.password.valid
                      ? "green"
                      : undefined
                }
              }}
              helperText={state.password.helperText}
              error={Boolean(errors.password) || !state.password.valid}
              fullWidth
              InputProps={{
                endAdornment:
                  validatingField === "password" ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : state.password.valid ? (
                    <InputAdornment position="end">
                      <Check color="success" />
                    </InputAdornment>
                  ) : undefined
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              disableElevation={isSubmitting}
              sx={{ mt: 2 }}
            >
              Sign in{" "}
              {isSubmitting && (
                <CircularProgress size={24} sx={{ position: "absolute" }} />
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LoginForm
