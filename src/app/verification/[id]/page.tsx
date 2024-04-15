"use client";
import { api } from "@/app/shared";
import axios from "axios";
import { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";

const Verify = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const userId = decodeURIComponent(id);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const ResendMail = async () => {
    if (userId) {
      setLoading(true);
      const response = await axios.post(`${api}users/resendMail/${userId}`);
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
      <div className="h-1/2 my-auto">
        <BiCheckCircle size={70} color="green" className="mx-auto" />
        <div className="text-center">
          <p className="text-2xl">Thanks for Signing up with Homly</p>
          <p>We sent a mail. Please check your mail to verify your account.</p>
          <p className="text-green font-bold">{message}</p>
          <button
            disabled={loading}
            onClick={ResendMail}
            className={
              !loading
                ? "text-white bg-green font-bold py-2 px-4 my-5 rounded hover:opacity-85"
                : "text-white bg-green font-bold py-2 px-4 my-5 rounded opacity-40"
            }
          >
            Resend Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
