// @ts-nocheck
import { useFormik } from "formik"
import { useCallback, useEffect, useState } from "react"
import {
  onSubmit,
  initialValues,
  validationSchema
} from "../components/LoginForm/formik-config"
import useDebounce from "./useDebounce"
import { validateWithAPI } from "../utils/validate-with-api"

const useValidate = () => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    isSubmitting,
    getFieldProps
  } = useFormik({
    onSubmit,
    initialValues,
    validationSchema
  })

  const [changingField, setChangingField] = useState("")
  const [validatingFields, setValidatingFields] = useState([])
  const [customErrors, setCustomErrors] = useState(initialValues)
  const [APIErrors, setAPIErrors] = useState(initialValues)
  const [failedFields, setFailedFields] = useState(initialValues)
  const [validFields, setValidFields] = useState([])

  const customHandleChange = event => {
    handleChange(event)
    setChangingField(event.target.name)
    setValidatingFields([...validatingFields, event.target.name])
  }

  const customHandleSubmit = event => {
    event.preventDefault()

    /* Only submit form if all fields are valid */
    if (validFields.length === Object.keys(initialValues).length) {
      handleSubmit(event)
    }
  }

  const validateField = useCallback(async () => {
    // to prevent infinite re-render
    if (validatingFields.length) {
      let copyValidatingFields = []
      const inValidFields = []

      const validationResults = Object.entries(values)
        .map(async ([key, value]) => {
          // Check if the changingField (the active field) has no formik errors and it isn't empty
          if (key === changingField && !errors[key] && value) {
            return validateWithAPI(key, value)
          }

          return null
        })
        .filter(Boolean)

      const validationResult = await Promise.all(validationResults)

      const validFields = validationResult
        .map(({ valid, message, field }) => {
          if (!valid) {
            copyValidatingFields = validatingFields.filter(
              validatingField => validatingField !== field
            )
            inValidFields.push(field)
            setAPIErrors(prevErrors => ({ ...prevErrors, [field]: message }))
          }

          return valid ? field : null
        })
        .filter(Boolean)

      const validFieldObject = Object.fromEntries([validFields]) // valid field object to overwrite existing errors

      setValidatingFields(copyValidatingFields)
      setAPIErrors(prevErrors => ({ ...prevErrors, ...validFieldObject }))

      setValidFields(prevFields => {
        const stillValid = prevFields.filter(
          field => !inValidFields.includes(field)
        )

        return [...stillValid, ...validFields]
      })
    }
  }, [values, errors, validatingFields, changingField])

  useDebounce(validateField)

  useEffect(() => {
    const errorEntries = Object.entries(errors).map(([key, value]) => {
      return [key, touched[key] ? value : ""]
    })

    setCustomErrors({
      ...APIErrors,
      ...Object.fromEntries(errorEntries)
    })
  }, [errors, touched, APIErrors])

  return {
    values,
    validFields,
    validatingFields,
    errors: customErrors,
    failedFields,
    isSubmitting,
    handleChange: customHandleChange,
    handleSubmit: customHandleSubmit,
    getFieldProps
  }
}

export default useValidate
