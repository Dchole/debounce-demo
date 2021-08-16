import PropTypes from "prop-types"
import { CircularProgress, InputAdornment, TextField } from "@material-ui/core"
import { Check } from "@material-ui/icons"
import { capitalize } from "lodash"

/**
 * @typedef {Object} Props
 * @prop {string} name - field name and identifier
 * @prop {boolean} error - determines weather field has error
 * @prop {boolean} valid - determines weather field is valid
 * @prop {boolean} validating - determines weather field is validating
 * @prop {string} value - field value
 * @prop {string} helperText - field description/message
 * @prop {string} placeholder - placeholder text for field
 * @prop {VoidFunction} handleChange - custom handleChange function
 */
/**
 * @type {React.FC<Props>} props
 */
const CustomField = ({
  name,
  error,
  value,
  valid,
  validating,
  helperText,
  placeholder,
  handleChange,
  ...fieldProps
}) => {
  return (
    <TextField
      {...fieldProps}
      error={error}
      helperText={helperText}
      id={name}
      name={name}
      value={value}
      color={valid ? "success" : undefined}
      placeholder={name === "username" ? placeholder : undefined}
      label={capitalize(name)}
      margin="normal"
      variant="outlined"
      onChange={handleChange}
      autoCapitalize={name === "username" ? "word" : undefined}
      autoComplete={name === "password" ? "current-password" : undefined}
      autoFocus={name === "username"}
      fullWidth
      InputProps={{
        endAdornment: validating ? (
          <InputAdornment position="end">
            <CircularProgress size={20} />
          </InputAdornment>
        ) : valid ? (
          <InputAdornment position="end">
            <Check color="success" />
          </InputAdornment>
        ) : undefined
      }}
    />
  )
}

CustomField.prototype = {
  name: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  validating: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

export default CustomField
