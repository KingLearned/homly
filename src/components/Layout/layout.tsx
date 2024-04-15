import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getToken, getUser } from "@/app/shared";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  // Updating Room mate profile with Room mate Data from the database
  // useEffect(() => {
  //   if (getUser()) {
  //     axios
  //       .get(`http://localhost:3000/users/roommate/${getUser().HMId}`, {
  //         headers: {
  //           Authorization: getToken(),
  //         },
  //       })
  //       .then((result) => {
  //         if (result && result.data.status == "success") {
  //           const user = result.data.user;
  //           if (user) {
  //             // dispatch(updateFieldsFromPayload(user));
  //           }
  //         }
  //       });
  //   }
  // }, [dispatch]);

  return (
    <div className="[&_p]:leading-loose text-neutral-700 text-sm">
      {children}
    </div>
  );
};

export default Layout;
