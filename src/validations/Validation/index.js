import { object, string } from "yup";

export const transferValid = object({
    to: string()
        .required("address to is required")
        .max(45, "More than 45 characters"),
    value: string()
        .required("value is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
});

export const approveValid = object({
    to: string()
        .required("address to is required")
        .max(45, "More than 45 characters"),
    value: string()
        .required("value is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
});

export const transferFromValid = object({
    from: string()
        .required("address from is required")
        .max(45, "More than 45 characters"),
    to: string()
        .required("address to is required")
        .max(45, "More than 45 characters"),
    value: string()
        .required("value is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
});

export const allowanceValid = object({
    owner: string()
        .required("address owner is required")
        .max(45, "More than 45 characters"),
    spender: string()
        .required("address spender is required")
        .max(45, "More than 45 characters"),
});

export const burnValid = object({
    value: string()
        .required("value is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
});

export const burnFromValid = object({
    from: string()
        .required("address from is required")
        .max(45, "More than 45 characters"),
    value: string()
        .required("value is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
});

export const transferOwnershipValid = object({
    newOwner: string()
        .required("address new owner is required")
        .max(45, "More than 45 characters"),
});

export const mintValid = object({
    to: string()
        .required("address to is required")
        .max(45, "More than 45 characters"),
    value: string()
        .required("value is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
});

export const balanceOfValid = object({
    address: string()
        .required("address is required")
        .max(45, "More than 45 characters"),
});

export const permitValid = object({
    owner: string()
        .required("address owner is required")
        .max(45, "More than 45 characters"),
    spender: string()
        .required("address spender is required")
        .max(45, "More than 45 characters"),
    value: string()
        .required("value is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
    deadline: string()
        .required("deadline is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
    v: string()
        .required("v is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .max(3, "More than 32 characters"),
    r: string().required("r is required").max(32, "More than 32 characters"),
    s: string().required("s is required").max(32, "More than 32 characters"),
});
