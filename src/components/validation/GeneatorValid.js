import { object, string, ref, number } from "yup";

export const GeneratorValid = object({
  name: string()
    .required("name is required")
    .max(350, "More than 250 characters"),

  symbol: string()
    .required("symbol is required")
    .max(350, "More than 250 characters"),
  supply: number("just number")
    .typeError("Amount must be a number")
    .required("The supply is required")
    .min(1, "less than one")
    .max(
      115792089237316195423570985008687907853269984665640564039457584007913129639935,
      "greater than unit 256"
    ),
  cap: number()
    .typeError("Amount must be a number")
    .min(ref("supply"), "less than supply")
    .max(
      115792089237316195423570985008687907853269984665640564039457584007913129639935,
      "greater than unit 256"
    ),
  link: string().url("not url"),
});
