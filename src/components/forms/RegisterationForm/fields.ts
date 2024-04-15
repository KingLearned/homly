import { BiUser, BiEnvelope, BiPhone, BiLockAlt } from "react-icons/bi";
export const Fields = [
  {
    type: "text",
    icon: BiUser,
    name: "firstname",
    placeholder: "Enter firstname",
    value: "",
  },
  {
    type: "text",
    icon: BiUser,
    name: "lastname",
    placeholder: "Enter lastname",
    value: "",
  },
  {
    type: "email",
    icon: BiEnvelope,
    name: "email address",
    placeholder: "Enter email address",
    value: "",
  },
  {
    type: "number",
    icon: BiPhone,
    name: "phone number (WhatsApp)",
    placeholder: "+234 9013746",
    value: "",
  },
  {
    type: "text",
    icon: BiUser,
    name: "username",
    placeholder: "Enter username",
    value: "",
  },
  {
    type: "password",
    icon: BiLockAlt,
    name: "password",
    placeholder: "Enter password",
    value: "",
  },
  {
    type: "password",
    icon: BiLockAlt,
    name: "confirm password",
    placeholder: "Confirm password",
    value: "",
  },
];
