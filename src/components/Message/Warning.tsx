import Image from "next/image";

const Warning = ({
  closeWarning,
  chatFunction,
  paymentFunction,
}: {
  closeWarning: () => void;
  chatFunction: () => void;
  paymentFunction?: () => void;
}) => {
  return (
    <div
      className={
        "bg-layer w-screen h-screen fixed top-0 left-0 py-10 px-5 max-sm:px-3 overflow-y-scroll"
      }
    >
      <div className="w-full lg:w-[700px] flex flex-col justify-center items-center mx-auto bg-white p-10 max-sm:px-3 rounded-2xl my-10">
        <Image
          src="/circle-cancel.png"
          className="self-end"
          alt="image"
          width={25}
          height={25}
          onClick={closeWarning}
        />
        <div className="bg-red-200 p-8 my-5">
          <div className="flex justify-center items-center">
            <Image src="/caution-img.png" alt="image" width={25} height={25} />
            <p className="text-xl font-extrabold">Warnings!</p>
          </div>
          <div>
            <ul className="list-inside flex flex-col gap-4">
              <li>
                In keeping with our policy on reliability, agents, reps or
                roommates are not allowed to charge you an extra fee such as
                inspection fees or any added fee.
              </li>
              <li>
                Agents fee should never be more than 10% of your rent. Report
                any agent or rep who charges otherwise.{" "}
              </li>
              <li>
                For your security, do not pay agency fees or roommate fees
                outside this platform. Also make sure to pay rent directly to
                landlord or barrister in charge.{" "}
              </li>
              <li>
                Paying via this platform allows us to weed out unreliable agents
                or reps while allowing you the power to review this agent, rate
                him/ her, publish a sale on his profile, remove this
                accomodation from our system so others dont find it.{" "}
              </li>
              <li>
                We have provided an automated text once you click continue to
                chat so you keep your communication professional outside this
                platform.
              </li>
            </ul>

            <p>
              <b>NB:</b> Dear customer we live to serve you better. Pls expect
              upgrades as we are currently and always improving this platform.
              Your feedback is always highly appreciated.
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={chatFunction}
            className="rounded-2xl w-[200px] max-sm:w-max self-center max-sm:mx-2 m-5 px-5 py-4 text-white bg-deep-green shadow-lg hover:opacity-80 text-center"
          >
            CONTINUE TO CHAT
          </button>
          <button
            onClick={paymentFunction}
            className="rounded-2xl w-[200px] max-sm:w-max self-center max-sm:mx-2 m-5 px-5 py-4 text-white bg-deep-green shadow-lg hover:opacity-80 text-center"
          >
            PAY HERE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
