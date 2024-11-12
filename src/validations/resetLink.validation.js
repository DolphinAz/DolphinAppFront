import { object, string } from "yup";

export const resetLinkSchema = object({
  email: string()
    .email("Please enter a valid email")
    .required("Email is required"),
});
