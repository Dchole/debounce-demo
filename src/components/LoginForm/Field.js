import PropTypes from "prop-types"
import {
  CircularProgress,
  InputAdornment,
  TextField,
  Tooltip
} from "@material-ui/core"
import { Check, Warning } from "@material-ui/icons"
import { capitalize } from "lodash"

/**
 * @param {import("prop-types").InferType<CustomField.propTypes>} props
 */
const CustomField = ({
  name,
  error,
  value,
  valid,
  failed,
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
      color={valid ? "success" : failed ? "warning" : undefined}
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
        ) : failed ? (
          <Tooltip placement="right" title={failed} arrow>
            <InputAdornment position="end">
              <Warning color="warning" />
            </InputAdornment>
          </Tooltip>
        ) : undefined
      }}
    />
  )
}

CustomField.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  failed: PropTypes.string.isRequired,
  validating: PropTypes.bool.isRequired,
  helperText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

export default CustomField
