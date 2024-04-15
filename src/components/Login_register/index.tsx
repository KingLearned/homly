"use client";
import { useState } from "react";
import axios from "axios";
import Modal from "@/components/Modal/index";
import Register from "../forms/RegisterationForm";
import Login from "@/components/forms/LoginForm/index";
import { useSelector, useDispatch } from "react-redux";
import { switchFormsAction } from "@/app/redux/form/index";
import { api } from "@/app/shared";

const Login_Register = ({ setLoggedIn }: { setLoggedIn: any }) => {
  interface RootState {
    form: {
      data: "login";
    };
  }
  const dispatch = useDispatch();
  const [HMEmail, setHMEmail] = useState<string>();
  const [mesages, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((action: RootState) => action.form);

  const swtchToLogin = () => dispatch(switchFormsAction("login"));
  const swtchToRegister = () => dispatch(switchFormsAction("register"));

  const handleSubmit = async () => {
    if (HMEmail) {
      setLoading(true);
      setTimeout(() => setMessage(""), 4000);
      setTimeout(() => {
        setMessage("");
        setLoading(false);
      }, 10000);
      const response = await axios.post(`${api}users/forgottenPassword`, {
        HMEmail,
      });
      setLoading(false);
      setMessage(response.data.message);
      if (response.data.status == "success") setHMEmail("");
    }
  };

  return (
    <Modal>
      {data == "login" ? (
        <Login onclick={swtchToRegister} setLoggedIn={setLoggedIn} />
      ) : data == "register" ? (
        <Register onclick={swtchToLogin} setLoggedIn={setLoggedIn} />
      ) : (
        <form className="flex flex-col gap-3 py-5">
          <h2 className="text-xl my-3">Retrive Account</h2>
          <p className="text-center text-red-400">{mesages}</p>
          <input
            type="email"
            value={HMEmail}
            placeholder="Enter Email"
            className="w-full border py-2 px-3 rounded focus:outline-green"
            onChange={(e) => setHMEmail(e.target.value)}
          />
          <button
            type="button"
            disabled={loading}
            className={
              !loading
                ? "bg-green text-white rounded px-4 py-2"
                : "bg-green text-white rounded px-4 py-2 opacity-55"
            }
            onClick={handleSubmit}
          >
            Retrive Account
          </button>
          <div className="text-center">
            {"Don't have an account ?"}{" "}
            <span
              className="text-green cursor-pointer"
              onClick={swtchToRegister}
            >
              Create Instant Account
            </span>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default Login_Register;
