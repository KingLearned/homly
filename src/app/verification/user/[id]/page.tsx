"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api, setUser } from "@/app/shared";
import { useRouter } from "next/navigation";
import { BiCheckCircle } from "react-icons/bi";

const AccountVerification = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const userId = decodeURIComponent(id);
  const router = useRouter();
  const [state, setState] = useState(false);

  useEffect(() => {
    const verifyAccount = async () => {
      const response = await axios.post(`${api}users/verifyAccount/${userId}`);

      if (response.data.success == true) {
        setUser(response.data);
        setState(true);

        setTimeout(() => {
          if (
            response.data.user.HMType == "A" ||
            response.data.user.HMType == "RE"
          ) {
            return router.push(`/agent/profile/${response.data.user.HMId}`);
          } else if (response.data.user.HMType == "RO") {
            router.push(`/roommate/profile/${response.data.user.HMId}`);
          }
        }, 2000);
      } else {
        alert(response.data.message);
      }
    };

    verifyAccount();
  }, [router, userId]);

  return (
    <div>
      <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
        {!state ? (
          <div className="flex flex-col items-center">
            <Image
              src="/Spin-1s-200px.svg"
              alt=""
              width={40}
              height={40}
              className="w-[40px]"
            />
            <p>Verifying...</p>
          </div>
        ) : (
          <div>
            <BiCheckCircle size={70} color="green" className="mx-auto" />
            <p>Verification Successful</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountVerification;
