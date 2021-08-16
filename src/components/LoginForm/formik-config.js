import * as Yup from "yup"

export const initialValues = {
  username: "",
  email: "",
  password: ""
}

export const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).required().label("Password")
})

/**
 * @typedef {typeof initialValues} TValues
 *
 * @function
 * @param {TValues} values - form field values
 * @param {import("formik").FormikHelpers<TValues>} actions - formik actions
 */
export const onSubmit = (values, actions) => {
  console.log({ values, actions })
}
