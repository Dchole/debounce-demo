import PropTypes from "prop-types"
import { Button, CircularProgress, Container } from "@material-ui/core"
import Field from "./Field"
import useValidate from "../../hooks/useValidate"

/**
 * @typedef {Object} Props
 * @prop {string[]} availableUsers - List of names of available users
 */
/**
 * @type {React.FC<Props>} props
 */
const LoginForm = ({ availableUsers }) => {
  const {
    values,
    errors,
    validFields,
    handleChange,
    handleSubmit,
    isSubmitting,
    validatingFields,
    getFieldProps
  } = useValidate()

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit} autoComplete="off">
        {Object.keys(values).map(key => (
          <Field
            key={key}
            {...getFieldProps(key)}
            handleChange={handleChange}
            error={Boolean(errors[key])}
            helperText={errors[key]}
            valid={validFields.includes(key)}
            placeholder={
              availableUsers.length ? `Ex. ${availableUsers[0]}` : ""
            }
            validating={validatingFields.includes(key)}
          />
        ))}
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
      </form>
    </Container>
  )
}

LoginForm.propTypes = {
  availableUsers: PropTypes.arrayOf(PropTypes.string)
}

export default LoginForm
