import * as yup from "yup";

export const schema = yup.object().shape({
  mail: yup
    .string()
    .email("Adjon meg egy valós e-mail címet!")
    .required("Az e-mail cím megadás kötelező!"),
});
