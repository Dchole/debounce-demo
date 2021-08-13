import * as Yup from "yup"

export const initialValues = {
  username: "",
  email: "",
  password: ""
}

export const validationSchema = () =>
  Yup.object({
    username: Yup.string().required().label("Username"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().min(8).required().label("Password")
  })
