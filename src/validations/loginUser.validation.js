import { object, string } from "yup";

export const loginUserSchema = object({
  emailorUserName: string().required("Email or username is required"),
  password: string()
    .required("Password is required")
    .test(
      "min-length",
      "Password must be at least 8 characters",
      (value) => value && value.length >= 8
    )
    .test(
      "uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value)
    )
    .test(
      "lowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value)
    )
    .test("number", "Password must contain at least one number", (value) =>
      /\d/.test(value)
    )
    .test(
      "special-char",
      "Password must contain at least one special character",
      (value) => /[!@#\$%\^&\*]/.test(value)
    ),
});
