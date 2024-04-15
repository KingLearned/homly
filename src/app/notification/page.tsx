import Image from "next/image";

const page = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="emmy_notification_page_container p-6 bg-light-gray
      max-sm:w-[90%] w-[60%] md:[75%] flex flex-col justify-center items-center mb-80">
        <h1>Notifications</h1>
        <div className="border-b-2"></div>
        <div className="message p-6 bg-slate-100 flex items-center justify-between
        md:w-[90%]
        max-sm:flex-col max-sm:w-[90%] w-[70%] border-r-full rounded-t-[20px] border-2">
          <div>
            <div className="flex items-center object-cover">
              <Image src="/Ellipse 1.png" alt="" width={70} height={70} />
              <h2>
                1 person has indicated interest in the property you upload
              </h2>
            </div>
            <div className="bg-reds-200 flex gap-3 w-full
            md:flex-col mt-6 pt-6 max-sm:gap-1 my-3
            lg:flex-row button_containers max-sm:flex-col">
              <button className="ring-2 ring-button-shadow
              rounded-full text-white bg-deep-green p-2 mt-8
              w-1/2 md:w-full
              mb-4 max-sm:w-full text-xs">
                Continue to chat
              </button>
              <button className="ring-2 ring-button-shadow rounded-full p-2 mt-8 mb-4 max-sm:w-full
              text-xs text-gray-950 border-gray-950 border-[1px] w-1/2
              md:w-full">
                decline
              </button>
            </div>
          </div>
          <Image
            src="/Rectangle 3.png"
            alt=""
            width={200}
            height={200}
            className="self-start object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
