"use client";
import { useState } from "react";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import axios from "axios";
import { objectValidator } from "@/util/index";
import { api, setUser } from "@/app/shared";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { modalAction } from "@/app/redux/modal";
import { switchFormsAction } from "@/app/redux/form";

const LoginForm = ({
  onclick,
  setLoggedIn,
}: {
  onclick?: () => void;
  setLoggedIn: any;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [message, setMessage] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const forgottenPassword = () =>
    dispatch(switchFormsAction("forgottenPassword"));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validete = objectValidator({ email, password });

    if (validete !== undefined) {
      setMessage(validete);
    } else {
      try {
        setLoading(true);
        const response = await axios.post(`${api}users/login`, {
          email,
          password,
        });
        setLoading(false);

        if (response.data.error) {
          setMessage(response.data.error);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          setUser(response.data);
          setEmail("");
          setPassword("");
          dispatch(modalAction(false));
          if (
            response.data.user.HMType == "A" ||
            response.data.user.HMType == "RE"
          ) {
            router.push(`/agent/profile/${response.data.user.HMId}`);
            setLoggedIn(true);
          } else if (response.data.user.HMType == "RO") {
            router.push(`/roommate/profile/${response.data.user.HMId}`);
            setLoggedIn(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="text-sm lg:px-10" onSubmit={handleSubmit}>
      <h1 className="text-xl mt-3 mb-8">Hey, Welcome to Homly</h1>
      <p className="text-center text-red-500 mb-4">{message}</p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <BiEnvelope />
            <p className="capitalize">email</p>
          </div>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="border py-2 px-3 rounded focus:outline-green"
          />
        </div>
        <div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <BiLockAlt />
              <p className="capitalize">password</p>
            </div>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="border py-2 px-3 rounded focus:outline-green"
            />
          </div>
          <div className="text-right">
            <span
              className="mt-3 text-green cursor-pointer"
              onClick={forgottenPassword}
            >
              Forgot your password ?
            </span>
          </div>
        </div>
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
          {!loading ? "Login" : "Loading..."}
        </button>
      </div>

      <div className="text-center mt-3">
        Don&apos;t have an account ? {""}
        <span className="text-green cursor-pointer" onClick={onclick}>
          Create Instant Account
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
