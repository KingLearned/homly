import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BiUser, BiLinkAlt } from "react-icons/bi";
import InputField from "@/components/forms/InputField/index";
import { useState } from "react";
import { objectValidator } from "@/util/index";
import { modalAction } from "@/app/redux/modal";
import { useDispatch } from "react-redux";
import { api, setUser } from "@/app/shared";
import { Fields } from "./fields";

const Register = ({
  onclick,
  setLoggedIn,
}: {
  onclick?: () => void;
  setLoggedIn: any;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [HMUserType, setUserType] = useState<string | undefined>("RO");

  const [fields, setFields] = useState(Fields);
  const [refLink, setRefLink] = useState({
    type: "text",
    icon: BiLinkAlt,
    name: "referal link (optional)",
    placeholder: "frank",
    value: "",
  });

  const handleChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    const singleField = updatedFields[index];

    if (singleField) {
      singleField.value = value;
      setFields(updatedFields);
    }
    setMessage(undefined);
  };

  const handleRefLink = (event: any) => {
    const text = event.target.value;
    setRefLink({ ...refLink, value: text });
    setMessage(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      HMFirstname: fields[0].value,
      HMLastname: fields[1].value,
      HMEmail: fields[2].value,
      HMPhoneNumber: fields[3].value,
      HMUsername: fields[4].value,
      HMPassword: fields[5].value,
      HMConfirmPassword: fields[6].value,
      HMUserType,
      HMRefLink: refLink.value,
    };

    // delete data.HMRefLink
    const { HMRefLink, ...userObject } = data;
    const validete = objectValidator(userObject);

    if (validete !== undefined) {
      setMessage(validete);
    } else {
      if (data.HMPassword !== data.HMConfirmPassword)
        return setMessage("Password mismatch");

      setLoading(true);
      setTimeout(() => setLoading(false), 4000);
      const response = await axios.post(`${api}users/register`, data);
      setLoading(false);

      if (response.data.status == "failed") {
        return setMessage(response.data.message);
      }
      setUser(response.data);
      dispatch(modalAction(false));
      if (response.data.status == true) {
        fields.map((field) => (field.value = ""));
        setRefLink({ ...refLink, value: ""});
        router.push(`/verification/${response.data.userId}`);
      }
    }
  };

  return (
    <form className="text-sm" onSubmit={handleSubmit}>
      <h2 className="text-xl mt-3 mb-8">Let&apos;s get you started on Homly</h2>
      <p className="text-center text-red-500 mb-4">{message}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/*==== Input Fields ====*/}
        {fields.map((field, index) => (
          <InputField
            key={index}
            data={field}
            onchange={(event) => handleChange(index, event.target.value)}
          />
        ))}

        <div className="mt-2">
          <div className="flex items-center gap-2">
            <BiUser />
            <p>Sign up as</p>
          </div>
          <select
            className="border w-full py-2 rounded bg-transparent text-sm focus:outline-none"
            value={HMUserType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="RO">User/Room mate</option>
            <option value="A">Agent</option>
            <option value="RE">Rep</option>
          </select>
        </div>

        {HMUserType == "A" && (
          <InputField data={refLink} onchange={handleRefLink} />
        )}
      </div>

      <div className="mt-3 flex px-3">
        <button
          disabled={loading}
          type="submit"
          className={
            !loading
              ? "bg-green text-sm text-white p-2 w-full rounded-full m-auto mt-5"
              : "bg-green opacity-30 text-sm text-white p-2 w-full rounded-full m-auto mt-5"
          }
        >
          {!loading ? "Proceed to Signup" : "Loading..."}
        </button>
      </div>
      <div className="text-center mt-3">
        Already have an account ?{" "}
        <span className="text-green cursor-pointer" onClick={onclick}>Login</span>
      </div>
    </form>
  );
};

export default Register;
