import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { modalAction } from "@/app/redux/modal";

const Modal = ({ children }: { children: React.ReactNode }) => {
  interface RootState {
    modal: {
      value: false;
    };
  }
  const dispatch = useDispatch();
  const { value } = useSelector((state: RootState) => state.modal);

  const closeModal = () => {
    dispatch(modalAction(false));
  };

  return (
    <div
      className={
        !value
          ? "hidden"
          : "bg-layer w-screen h-screen fixed top-0 left-0 py-10 px-5 overflow-y-scroll z-10"
      }
    >
      <div className="w-full lg:w-[700px] mx-auto bg-white p-10 rounded-2xl my-10">
        <div className="form-cancel w-full flex justify-end cursor-pointer">
          <Image
            src="/circle-cancel.png"
            alt="image"
            width={25}
            height={25}
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
