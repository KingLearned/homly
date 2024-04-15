"use client";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BiSolidGraduation,
  BiBriefcase,
  BiLike,
  BiDislike,
} from "react-icons/bi";
import Link from "next/link";
import { api, getUser } from "@/app/shared";
import { switchFormsAction } from "@/app/redux/form";
import { modalAction } from "@/app/redux/modal";
import Warning from "@/components/Message/Warning";
import MessageText from "@/components/Message/MessageText";

const RoomMatePostView = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const url_data = decodeURIComponent(id);
  const dispatch = useDispatch();
  const [isChat, setisChat] = useState(false);
  const [roomAndUserData, setRoomAndUserData] = useState<any>();

  const ImageLength = [1, 2, 3, 4];

  const router = useRouter();
  const deletePost = async (postId: string) => {
    if (postId) {
      const result = await axios.post(`${api}roommate/deleted/${postId}`);
      alert(result.data.message);

      if (result.data.status == "success") {
        router.push("/roommate/upload/new_post");
      }
    }
  };

  const communicateAgent = () => {
    if (getUser() == null) {
      setisChat(false);
      dispatch(switchFormsAction("login"));
      dispatch(modalAction(true));
    } else {
      const message = MessageText(
        roomAndUserData?.HMFirstname,
        roomAndUserData?.title,
        roomAndUserData?.HMPhone
      );
      router.push(message);
    }
  };

  useEffect(() => {
    axios.get(`${api}roommate/singleRoom/${url_data}`).then((result) => {
      setRoomAndUserData(result.data.result);
    });
  }, []);

  const titleStyling = "capitalize font-bold text-lg mt-3";
  return (
    <>
      <div className="p-2 lg:px-8 w-[100%]">
        <div className="px-3">
          <div className="mb-4 capitalize">
            <h1 className="text-xl font-bold">
              {(roomAndUserData && roomAndUserData.title) || ""}
            </h1>
            <div className="flex items-center justify-between">
              <div className="left max-sm:text-sm">
                <div className="flex gap-2">
                  <Image
                    src="/carbon_location.png"
                    alt="carbon_location.png"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <p>{roomAndUserData && roomAndUserData.state} </p>
                </div>
              </div>
            </div>
          </div>

          {/*--------------Image Section Start--------------*/}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="w-full h-[250px] md:h-[350px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={roomAndUserData && roomAndUserData.images[0]}
                alt=""
                width={700}
                height={100}
                className="object-cover lg:w-full h-full"
              />
            </div>
            <div className="w-full h-[350px] grid grid-cols-2 gap-2">
              {ImageLength.map((image, index) => (
                <div key={index} className="w-full h-[170px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={roomAndUserData && roomAndUserData.images[index + 1]}
                    alt=""
                    width={700}
                    height={100}
                    className="object-cover lg:w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* ---------------Image Section End--  -------*/}
        </div>

        <div className="w-full my-8 shadow-xl bg-white px-5">
          <div className="grid grid-cos-1 gap-5 lg:gap-20 lg:grid-cols-2 ">
            <div className="flex flex-col gap-5">
              <div className="w-full flex justify-between items-center mb-3">
                {roomAndUserData &&
                getUser() &&
                roomAndUserData.roommate_id == getUser().HMId ? (
                  <div className="flex gap-5 font-semibold">
                    <Link
                      href={`/roommate/upload/${
                        roomAndUserData && roomAndUserData.roommate_id
                      }`}
                      className="hover:text-green border-b border-green pb-2"
                    >
                      EDIT POST
                    </Link>
                    <button
                      onClick={() => deletePost(roomAndUserData.id)}
                      className="hover:text-red-300 border-b border-red-300 pb-2"
                    >
                      DELETE
                    </button>
                  </div>
                ) : null}
                <div className="border-b-2">
                  <h2 className="font-bold text-lg">
                    PRICE: {roomAndUserData && roomAndUserData.amount}
                  </h2>
                </div>
              </div>
              {/*------------------------------------------------------------*/}
              <div
                className="flex flex-col gap-8 [&_span]:uppercase
             [&_p]:capitalize mb-5"
              >
                <div className="border-b pb-4">
                  <div
                    className="grid grid-cols-1 gap-3 lg:grid-cols-2 [&_h2]:capitalize
                   [&_h2]:font-bold [&_h2]:text-lg [&_p]:first-letter:uppercase text-justify [&_p]:bg-sky-50 [&_p]:p-2"
                  >
                    <div>
                      <h2>State :</h2>
                      <p>{roomAndUserData && roomAndUserData.state}</p>
                    </div>
                    <div>
                      <h2>Landmark :</h2>
                      <p>{roomAndUserData && roomAndUserData.landmark}</p>
                    </div>
                    <div>
                      <h2>Bedrooms :</h2>
                      <p>
                        {roomAndUserData && roomAndUserData.number_of_bedrooms}
                      </p>
                    </div>
                    <div>
                      <h2>Toilets :</h2>
                      <p>
                        {roomAndUserData && roomAndUserData.number_of_toilets}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <b className={titleStyling}>about this place</b>
                <p className="py-4">
                  {roomAndUserData && roomAndUserData.description}
                </p>
              </div>

              {roomAndUserData && roomAndUserData.features.length > 0 && (
                <b className={titleStyling}>What This Place Offers</b>
              )}
              <div className="flex items-center gap-4 sm:gap-14 mb-6 flex-col sm:flex-row self-start sm:self-start">
                <div className="flex flex-col gap-4 self-start sm:self-start ml-0">
                  <ul className="list-inside list-disc grid grid-col-1 gap-y-5 gap-x-10 lg:grid-cols-2">
                    {roomAndUserData && roomAndUserData.features.length > 0
                      ? roomAndUserData.features.map(
                          (feature: any, index: number) => (
                            <li key={index} className="capitalize">
                              {feature}
                            </li>
                          )
                        )
                      : null}
                  </ul>
                </div>
              </div>

              {roomAndUserData && roomAndUserData.extra.length > 0 && (
                <b className={titleStyling}>Extra</b>
              )}
              <div className="flex items-center gap-4 sm:gap-14 mb-6 flex-col sm:flex-row self-start sm:self-start">
                <div className="flex flex-col gap-4 self-start sm:self-start ml-0">
                  <ul className="list-inside list-disc grid grid-col-1 gap-y-5 gap-x-10 lg:grid-cols-2">
                    {roomAndUserData && roomAndUserData.extra.length > 0
                      ? roomAndUserData.extra.map(
                          (feature: any, index: number) => (
                            <li key={index} className="capitalize">
                              {feature}
                            </li>
                          )
                        )
                      : null}
                  </ul>
                </div>
              </div>
            </div>

            {/*----------------Room Mate Profile Section----------------*/}
            <div className="lg:p-10 lg:border-l">
              <div className="flex flex-col items-center justify-center gap-4">
                <h2 className={titleStyling}>Meet Your Room Mate</h2>
                <div className="w-[100px] h-[100px] rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={roomAndUserData && roomAndUserData.HMImage}
                    alt=""
                    width={700}
                    height={100}
                    className="object-cover lg:w-full w-full h-full rounded-full"
                  />
                </div>
                <h2 className={titleStyling}>
                  {roomAndUserData && roomAndUserData.HMFirstname}{" "}
                  {roomAndUserData && roomAndUserData.HMLastname}
                </h2>
              </div>
              <div className="border-b w-1/2 mx-auto mt-5"></div>

              <div className="w-full flex justify-center my-10">
                <div
                  className="w-full grid grid-cols-2 justify-center gap-x-2 gap-y-4 
                capitalize [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mt-3 [&_p]:first-letter:uppercase [&_p]:p-2 [&_p]:bg-sky-50"
                >
                  <div>
                    <h2>Ethinicity:</h2>
                    <p>{roomAndUserData && roomAndUserData.HMEthinicity}</p>
                  </div>
                  <div>
                    <h2>Nationality:</h2>
                    <p>{roomAndUserData && roomAndUserData.HMNationality}</p>
                  </div>
                  <div>
                    <h2>Religion:</h2>
                    <p>{roomAndUserData && roomAndUserData.HMReligion}</p>
                  </div>
                  <div>
                    <h2>age:</h2>
                    <p>{roomAndUserData && roomAndUserData.HMAge}</p>
                  </div>
                  <div>
                    <h2>gender:</h2>
                    <p>{roomAndUserData && roomAndUserData.HMGender}</p>
                  </div>
                  <div>
                    <h2>status:</h2>
                    <p>{roomAndUserData && roomAndUserData.HMStatus}</p>
                  </div>
                  <div>
                    <h2>occupation:</h2>
                    <p>{roomAndUserData && roomAndUserData.HMOccupation}</p>
                  </div>
                  <div>
                    <h2>pets:</h2>
                    <p>{roomAndUserData && roomAndUserData.HMPets}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 [&_h2]:capitalize [&_h2]:font-bold [&_h2]:text-lg [&_p]:first-letter:uppercase text-justify [&_p]:py-3 [&_p]:px-2">
                <div>
                  <h2>About me:</h2>
                  <p>{roomAndUserData && roomAndUserData.HMBiography}</p>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <BiSolidGraduation size={30} className="text-deep-green" />
                    <h2>educational background :</h2>
                  </div>
                  <p>{roomAndUserData && roomAndUserData.HMEducation}</p>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <BiBriefcase size={30} className="text-deep-green" />
                    <h2>profession Achievment :</h2>
                  </div>
                  <p>{roomAndUserData && roomAndUserData.HMProfession}</p>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <BiLike size={30} className="text-deep-green" />
                    <h2>Likes :</h2>
                  </div>
                  <p>{roomAndUserData && roomAndUserData.HMLikes}</p>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <BiDislike size={30} className="text-deep-green" />
                    <h2>dislikes :</h2>
                  </div>
                  <p>{roomAndUserData && roomAndUserData.HMDislikes}</p>
                </div>
              </div>
              <div className="flex justify-center py-5">
                <button
                  onClick={() => setisChat(true)}
                  className="w-[100%] py-2 px-5 bg-green rounded text-white lg:w-auto"
                >
                  Communicate with room mate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*---------------------Warning message---------------------*/}
      {isChat && (
        <Warning
          closeWarning={() => setisChat(false)}
          chatFunction={communicateAgent}
          paymentFunction={() => alert("coming soon")}
        />
      )}
    </>
  );
};

export default RoomMatePostView;
