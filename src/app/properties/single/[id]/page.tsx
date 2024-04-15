"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Amenity from "@/components/Amenity";
import Link from "next/link";
import { modalAction } from "@/app/redux/modal";
import { useDispatch } from "react-redux";
import axios from "axios";
import { api, formatDate, getDate, getToken, getUser } from "@/app/shared";
import { TagAgentInterface, propertyInterface, userInterface } from "@/app/shared/definedTypes";
import { useRouter } from "next/navigation";
import { switchFormsAction } from "@/app/redux/form";

const PropertyPage = (propertyId: any) => {
  const dispatch = useDispatch();
  const currentUser: userInterface = getUser();
  const router = useRouter();

  const [isReview, setisReview] = useState(false);
  const [isChat, setisChat] = useState(false);
  const [status, setSatus] = useState(false);
  const [statusMessage, setstatusMessage] = useState("Loading...");
  const [rate, setRate] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [message, setMessage] = useState("");
  const [isImageModal, setisImageModal] = useState(false);
  const [Img, setImg] = useState('');

  const ratingNumber = [1, 2, 3, 4, 5];

  const [propertyData, setPropertyData] = useState<propertyInterface>();
  const [TaggedAgents, setTaggedAgents] = useState<TagAgentInterface[]>([]);
  const [Features, setFeatures] = useState([]);

  const swtchToLogin = () => {
    dispatch(switchFormsAction("login"));
    dispatch(modalAction(true));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}properties/single/${propertyId.params.id}`
        );
        const data = response.data;
        if (!data.error) {
          setPropertyData(data.property);
          setSatus(true);
          setFeatures(JSON.parse(data.property.HPAmenity));
          setTaggedAgents(data.property.HPTagged)

          console.log(response.data)
        } else {
          console.log(data.error);
          setstatusMessage(data.error);
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    fetchData();
  }, [propertyId]);

  const ImageModal = (Img?:string) => {
    return (
      <div className={"bg-darklayer w-full h-full fixed top-0 left-0 py-10 px-5 max-sm:px-3 "} >
        <div className="w-full h-full relative flex flex-col justify-center items-center mx-auto p-10 max-sm:px-3 rounded-2xl my-10">
          <Image src="/circle-cancel.png" className="self-end" alt="image" width={25} height={25} onClick={() => setisImageModal(false)} />
          <div className="w-full h-full my-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={Img}
              className="w-[100%] h-[500px]"
              alt={Img}
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    )
  }

  const openReview = () => {
    dispatch(modalAction(true));
  };

  const communicateAgent = () => {
    const message = `Hi ${propertyData?.HMFirstname}, I hope this message finds you well. My name is ${currentUser?.HMFirstname}. I would love to indecate interest in an apartment you published with title:${propertyData?.HPTitle}. When can I inspect this accomadation.`;

    router.push(`https://wa.me/+234${propertyData?.HMPhone}?text=${message}`);
  };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const HRStar = rate;
      const HRContent = reviewContent;
      const HRAgent = propertyData?.HPUser;
      const headers = { Authorization: getToken() ? getToken() : "" };
      const response = await axios.post(
        `${api}properties/write-review/${propertyId.params.id}`,
        { HRAgent, HRStar, HRContent },
        { headers }
      );
      const data = response.data;
      if (!data.error) {
        const addReview = {
          HMFirstname: currentUser.HMFirstname,
          HMImage: currentUser.HMImage,
          HMLastname: currentUser.HMLastname,
          HRContent: HRContent,
          HRCreated: getDate(),
          HRId: propertyData ? propertyData.HPUser : 0,
          HRStar: HRStar,
          HRUser: currentUser.HMId,
        };
        setMessage(data.message);
        setTimeout(() => {
          setMessage(""),
            setisReview(false),
            setRate(0),
            setReviewContent(""),
            propertyData?.reviews.push(addReview);
        }, 3000);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const deleteProperty = async () => {
    try {
      const headers = { Authorization: getToken() ? getToken() : "" };
      const response = await axios.post(
        `${api}users/agent/delete-property/${propertyId.params.id}`,
        {},
        { headers }
      );

      if (response.data.success) {
        alert(response.data.message)
        router.push("/")
      } else {
        alert(response.data.error);
        console.log(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  return !status ? (
    <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
      {statusMessage == "Loading..." ? (
        <Image
          src="/Spin-1s-200px.svg"
          alt=""
          width={40}
          height={40}
          className="max-sm:w-1/2"
        />
      ) : (
        <h1 className="text-center text-3xl">
          Error 404:
          <br /> Property not found!
        </h1>
      )}
    </div>
  ) : (
    <div
      className="px-3 flex flex-col mt-5 text-sm lg:px-14 xl:px-14 2xl:px-14 justify-center lg:w-full xl:w-[100vw] 2xl:w-[100vw] 
    max-sm:w-full md:w-full self-center"
    >
      {/* HEADER */}
      <div className="header-container max-sm:flex max-sm:flex-col-reverse max-sm:gap-4">
        {/* TEXT SECTION */}
        <div className="mb-4 max-sm:mb-1">
          <h1 className="text-xl font-bold mb-2 capitalize">
            {propertyData?.HPTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="left max-sm:text-sm">
              <div className="flex gap-2 ">
                <Image
                  src="/carbon_location.png"
                  alt="carbon_location.png"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <p>{propertyData?.HPState}</p>
              </div>
            </div>
          </div>
        </div>
        {/* IMAGE SECTION */}
        <div className="flex max-md:flex-col gap-2 lg:gap-4 xl:gap-2 2xl:gap-2 w-full max-sm:mb-3">
          {/* First image takes 2 columns and 2 rows */}
          <div className="w-1/2 max-sm:w-full max-md:w-full h-[345px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={propertyData?.HPImages[0]}
              className="object-cover lg:w-full h-[345px]"
              alt=""
              width={700}
              height={400}
            />
            {/* <video controls width="40" className="w-[100vw] h-full max-sm:h-[20rem]">
              <source src={previewImage[0]} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
          </div>
          {/* Remaining 4 images - hidden on small screens */}
          {isImageModal && ImageModal(Img)}
          <div className="upload_image_right grid grid-cols-2 max-sm:w-full w-1/2 gap-3">
            {propertyData?.HPImages.map(
              (image, index) =>
                index > 0 && (
                  <div key={index} className="h-[150px] max-sm:mb-5" onClick={() => { setImg(image), setisImageModal(true) } }>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={image}
                      width={300}
                      height={200}
                      className="object-cover w-full h-[170px]"
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {currentUser && propertyData?.HPUser == currentUser?.HMId && (
        <div className="flex gap-3">
          <Link
            href={`/agent/property/edit/${propertyId.params.id}`}
            className="submit_button w-[max-content] mt-3 py-3 px-5 shadow-lg hover:opacity-90 rounded-md max-sm:w-full text-white text-center"
          >
            Edit Property
          </Link>
          <button
            onClick={deleteProperty}
            className="bg-red-500 w-[max-content] mt-3 py-3 px-5 shadow-lg hover:opacity-90 rounded-md max-sm:w-full text-white text-center"
          >
            Delete Property
          </button>
        </div>
      )}
      {/* DESC AND PRICE AND ABOUT */}
      <div className="desc-price-container mb-2 flex max-md:flex-col py-8 max-sm:py-3 flex-row">
        {/* LEFT SIDE */}
        <div className="left flex-3 mr-12 w-full  md:w-2/3">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={propertyData?.HMImage}
              className="w-[50px] h-[50px] rounded-full object-fill"
              alt=""
              width={100}
              height={100}
            />
            <div className="flex items-center">
              <div>
                <p>
                  {propertyData?.HMFirstname} {propertyData?.HMLastname}
                </p>
                <h2 className="font-bold">
                  <span className=" text-green font-bold">
                    {propertyData?.HMType == "A"
                      ? "Normal Agent"
                      : "Representative"}
                  </span>
                </h2>
              </div>
              <Link
                href={`/agent/profile/${propertyData?.HMId}`}
                className="rounded-full text-white bg-deep-green shadow-lg p-3 hover:opacity-80 text-center"
              >
                Check profile
              </Link>
            </div>
          </div>

          <div className="flex justify-between max-sm:gap-[0.5rem] gap-1 mt-3">
            <div className="flex border-[1px] py-2 px-3 max-sm:px-1 justify-center items-center gap-2 max-sm:flex-col">
              <Image
                src="/double-bed.png"
                alt=""
                width={40}
                height={40}
                className="max-sm:w-1/2"
              />
              <p className="text-sm max-sm:text-xs font-[900]">
                {propertyData?.HPBedrooms} Bedrooms
              </p>
            </div>
            <div className="flex border-[1px] py-2 px-3 max-sm:px-1 justify-center items-center gap-2 max-sm:flex-col">
              <Image
                src="/home-house-map-roof-round (1).png"
                alt=""
                width={40}
                height={40}
                className="max-sm:w-1/2"
              />
              <p className="text-sm max-sm:text-xs font-[900]">
                {Features.length} Amenities
              </p>
            </div>
            <div className="flex border-[1px] py-2 px-3 max-sm:px-1 justify-center items-center gap-2 max-sm:flex-col">
              <Image
                src="/toilet.png"
                alt=""
                width={40}
                height={40}
                className="max-sm:w-1/2 max-md:w-1/4"
              />
              <p className="text-sm max-sm:text-xs font-[900]">
                {propertyData?.HPToilets} Toilets
              </p>
            </div>
            <div className="flex border-[1px] py-2 px-3 max-sm:px-1 justify-center items-center gap-2 max-sm:flex-col">
              <Image
                src="/bathroom.png"
                alt=""
                width={40}
                height={40}
                className="max-sm:w-1/2 max-md:w-1/4"
              />
              <p className="text-sm max-sm:text-xs font-[900]">
                {propertyData?.HPBathrooms} Bathrooms
              </p>
            </div>
          </div>

          <hr className="mt-6 mb-3 border-gray-200 border-[1.5px] " />

          <div className="extras p-2">
            <div className="">
              <h1 className="text-xl font-bold">About this property</h1>
              <p className="py-4 leading-[2rem]">
                {propertyData?.HPDescription}
              </p>
            </div>

            <hr className="mt-6 mb-3 border-gray-200 border-[1.5px] " />

            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <div className="flex items-center gap-4 sm:gap-14 mb-6 flex-col sm:flex-row self-start sm:self-start">
              <div className="flex flex-col gap-4 self-start sm:self-start ml-0">
                {Features.slice(0, Features.length / 2 + 1).map(
                  (amenity, index) => (
                    <Amenity key={index} icon={"/house.png"} text={amenity} />
                  )
                )}
              </div>
              <div className="flex flex-col gap-4 self-start mt-[-2]">
                {Features.slice(Features.length / 2 + 1).map(
                  (amenity, index) => (
                    <Amenity key={index} icon={"/house.png"} text={amenity} />
                  )
                )}
              </div>
            </div>
          </div>
          <hr className="mt-6 mb-3 border-gray-400 border-1 max-sm:mt-3 max-sm:mb-1" />

        </div>

        {/* RIGHT SIDE PRICE SECTION */}
        <div className="right flex flex-col p-6 shadow-lg rounded-md w-full md:w-1/3 sm:flex-2 lg:w-1/3 md:h-1/3 lg:h-1/3 text-sm flex-grow-0 max-sm:mt-6 top-0 right-0">
          {" "}
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <span className="text-sm font-bold">
                N{propertyData?.HPPrice.toLocaleString()} / Year
              </span>
            </div>
          </div>
          {currentUser?.HMId != propertyData?.HMId && (
            <button
              onClick={() => (currentUser ? setisChat(true) : swtchToLogin())}
              className="rounded-full text-white bg-deep-green shadow-lg py-3 hover:opacity-80 p-2 mt-2 text-center"
            >
              Communicate with Agent
            </button>
          )}
          <span className="self-center p-2">You Won`t be charged Yet</span>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between">
              <span>Maxminum Agency Fee</span>
              <span>N{propertyData?.HPMaxAFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Mininum Agency Fee</span>
              <span>N{propertyData?.HPMinAFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Caution Fee</span>
              <span>N{propertyData?.HPCautionFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Security Fee</span>
              <span>N{propertyData?.HPSecurityFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Legal Fee</span>
              <span>N{propertyData?.HPLegalFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Property Price</span>
              <span>N{propertyData?.HPPrice.toLocaleString()}</span>
            </div>
          </div>
          <hr className="mt-2 mb-2 border-gray-400 border-[1.9px] max-sm:mx-4" />
          <div className="flex justify-between">
            <span className="text-sm">Total Amount:</span>
            <span className="font-bold text-sm">
              N
              {(
                Number(propertyData?.HPMinAFee) +
                Number(propertyData?.HPPrice) + Number(propertyData?.HPCautionFee) + Number(propertyData?.HPSecurityFee) + Number(propertyData?.HPLegalFee)
              ).toLocaleString()}{" "}
              - N
              {(
                Number(propertyData?.HPMaxAFee) +
                Number(propertyData?.HPPrice) + Number(propertyData?.HPCautionFee) + Number(propertyData?.HPSecurityFee) + Number(propertyData?.HPLegalFee)
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {/* AGENT */}
      <div className="agent-container md:w-full lg:w-[63%] flex flex-col mb-10 ">
        <p className="mb-6 font-bold text-[24px] max-sm:hidden">
          Meet Your Agent
        </p>
        {/* AGENT CARD */}
        <div className="box p-12 bg-light-green  rounded-sm shadow-md shadow-emerald-900 max-sm:p-0">
          <div className="details bg-red-1 flex justify-around pt-4 pb-2 max-sm:items-center max-sm:flex-col">
            <div className="flex flex-col justify-center items-center text w-[max-content] px-5 py-3 rounded-md border-[2px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={propertyData?.HMImage}
                className="w-[50px] h-[50px] rounded-full  object-fill"
                alt=""
                width={100}
                height={100}
              />
              <p>
                {propertyData?.HMFirstname} {propertyData?.HMLastname}
              </p>
              <h2 className="font-bold">
                <span className=" text-green font-bold">
                  {propertyData?.HMType == "A"
                    ? "Normal Agent"
                    : "Representative"}
                </span>
              </h2>
              <Link
                href={`/agent/profile/${propertyData?.HMId}`}
                className="rounded-full text-white bg-deep-green shadow-lg py-3 hover:opacity-80 p-2 mt-2 text-center"
              >
                Check profile
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 max-sm:grid-cols-2 gap-6 w-[40%] max-sm:w-[60%]">
              <div>
                <p className="flex flex-col sm:flex-row items-baseline">
                  <span className="font-bold mr-1 text-lg">
                    {propertyData?.HMReviews}
                  </span>
                  Reviews
                </p>
                <hr className=" border-gray-400 border-[1.8px] w-full" />
              </div>
              <div>
                <p className="flex flex-col sm:flex-row items-baseline">
                  <span className="font-bold mr-1 text-lg">
                    {propertyData?.HMRating}/5
                  </span>
                  Rating
                </p>
                <hr className=" border-gray-400 border-[1.8px]" />
              </div>
              <div>
                <p className="flex flex-col sm:flex-row items-baseline">
                  <span className="font-bold mr-1 text-lg">
                    {propertyData?.HMPublishes}
                  </span>
                  Publishes
                </p>
                <hr className=" border-gray-400 border-[1.8px]" />
              </div>
              <div>
                <p className="flex flex-col sm:flex-row items-baseline">
                  <span className="font-bold mr-1 text-lg">
                    {propertyData?.HMSales == null ? 0 : propertyData?.HMSales}
                  </span>
                  Sales
                </p>
                <hr className=" border-gray-400 border-[1.8px]" />
              </div>
            </div>
          </div>
          <hr className="mt-4 mb-4 border-gray-400 border[1.5px]" />

          <div className="about flex flex-col gap-5 p-2 max-sm:px-4">
            <div className="flex gap-1">
              <Image
                src="/cil_education.png"
                alt=""
                width={20}
                height={20}
                className="object-contain  self-start mt-0"
              />
              <p className="leading-loose">
                <span className="font-bold">Educational Background:</span>{" "}
                {propertyData?.HMEducation}
              </p>
            </div>
            <div className="flex gap-1">
              <Image
                src="/pajamas_work.png"
                alt=""
                width={20}
                height={20}
                className="object-contain  self-start mt-0"
              />
              <p className="leading-loose">
                <span className="font-bold">Professional Achievements:</span>{" "}
                {propertyData?.HMProfession}
              </p>
            </div>
            <div className="flex gap-1">
              <Image
                src="/fluent_thumb-like-dislike-16-regular.png"
                alt=""
                width={20}
                height={20}
                className="object-contain  self-start mt-0"
              />
              <p className="leading-loose">
                <span className="font-bold">Likes & Dislikes:</span>{" "}
                {propertyData?.HMLikes}
              </p>
            </div>
          </div>
          <hr className="mt-4 mb-4 border-gray-400 border-[1.8px] max-sm:mx-5" />
          <div className="experiences flex justify-center p-6">
            {currentUser?.HMId != propertyData?.HMId && (
              <button
                onClick={() => (currentUser ? setisChat(true) : swtchToLogin())}
                className="rounded-full max-sm:w-3/4 w-2/4 text-white bg-deep-green shadow-lg py-3 hover:opacity-80 mt-2 text-center"
              >
                Communicate with Agent
              </button>
            )}
          </div>
          <hr className="mt-4 mb-4 border-gray-400 border-1" />
          <p className="pl-2 mt-4 font-[900]">
            {" "}
            To Protect Your Money, never make a payment away from this website
          </p>
        </div>

        <div className="what_theplace_offers mt-6">
              <h1 className="text-bold mb-1 font-bold text-green">TAGGED AGENT(S)</h1>
              {
                TaggedAgents.length > 0 ?
                  <div className="mt-3 grid lg:grid-cols-2 gap-3 md:grid-cols-2">
                    {
                      TaggedAgents.map((agent, index) => (
                        <Link key={index} href={`/agent/profile/${agent.AgentId}`}
                          className="border-[1px] p-3 bg-sky-100 max-w-[content] rounded flex flex-col cursor-pointer"
                        >
                          <h1 className="font-bold capitalize">{agent.AgentFullName}</h1>
                        </Link>
                      ))
                    }
                  </div>
                :
                  <h1 className="border-[1px] p-3 text-center font-bold">NONE</h1>
              }
        </div>

      </div>

      <hr className="mt-4 mb-4 border-gray-400 border-1" />
      {/* REVIEWS REVIEWS REVIEWS */}
      <div className="flex flex-col mb-10">
        <h1 className="mt-2 font-[900] text-center text-2xl">
          PROPERTY REVIEWS
        </h1>
        <hr className="mt-4 mb-4 border-gray-400 border-1" />
        {(propertyData?.reviews?.length ?? 0) < 1 ? (
          <div className="h-[25vh] flex items-center justify-center">
            <h1 className="text-center text-3xl">No reviews yet!</h1>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 sm:grid-rows-2 gap-8 mt-6">
            {propertyData?.reviews.map((review, index) => (
              <div className="pt-2 shadow-md rounded-md p-3" key={index}>
                <div className="flex gap-3 mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.HMImage}
                    className="rounded-full"
                    alt=""
                    width={50}
                    height={50}
                  />
                  <span>
                    <h2 className="font-bold">
                      {review.HMFirstname} {review.HMLastname}
                    </h2>
                    <span>{formatDate(`${review.HRCreated}`)}</span>
                  </span>
                </div>
                <p>{review.HRContent}</p>
                <div className="flex gap-1 mt-2">
                  {new Array(review.HRStar).fill(0).map((array, index) => (
                    <Image
                      key={index}
                      src="/material-symbols_star.png"
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {currentUser ? (
        currentUser?.HMType == "RO" ? (
          <button
            onClick={() => setisReview(true)}
            className="rounded-2xl self-center my-5 max-sm:w-1/2 w-1/5 text-white bg-deep-green shadow-lg py-3 hover:opacity-80 text-center"
          >
            Add your review
          </button>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      {isReview && (
        <div
          className={
            "bg-layer w-screen h-screen fixed top-0 left-0 py-10 px-5 max-sm:px-3 overflow-y-scroll"
          }
        >
          <div className="w-full lg:w-[700px] mx-auto bg-white p-10 max-sm:px-3 rounded-2xl my-10">
            <div className="form-cancel w-full flex justify-end cursor-pointer">
              <Image
                src="/circle-cancel.png"
                alt="image"
                width={25}
                height={25}
                onClick={() => setisReview(false)}
              />
            </div>
            <form className="text-sm lg:px-10" onSubmit={submitReview}>
              <h1 className="text-xl mt-3 mb-8 max-sm:text-lg max-sm:text-center">
                WRITE YOUR REVIEW HERE
              </h1>

              <div className="flex flex-col gap-2">
                <h3 className="text-gray-500 font-medium">
                  Rate your recent experience
                </h3>
                <div className="flex gap-2 mb-3 w-[max-content]">
                  {ratingNumber.map((index) => (
                    <div
                      key={index}
                      className={`p-1 cursor-pointer w-[max-content] ${
                        rate >= index ? "bg-sky-500" : ""
                      }`}
                      onClick={() => setRate(index)}
                    >
                      <Image
                        src="/material-symbols_star.png"
                        alt=""
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <h3 className="text-gray-500 font-medium">
                  Tell us more about it
                </h3>
                <textarea
                  required
                  placeholder="What do you like or dislike, how did the agent perform, tell us about the property.. etc."
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="outline-none p-3 mt-2 h-[200px] resize-none w-full rounded-md border-[1px] border-sky-200 focus:border-sky-500"
                ></textarea>
              </div>

              <h1 className="text-green text-2xl max-sm:text-lg font-extrabold text-center h-[30px]">
                {message}
              </h1>
              <div className="mt-3 flex px-3">
                <button
                  type="submit"
                  className="bg-green text-sm text-white p-2 w-full rounded-full m-auto"
                >
                  Submit review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isChat && (
        <div className={"bg-layer w-screen h-screen fixed top-0 left-0 py-10 px-5 max-sm:px-3 overflow-y-scroll" } >
          <div className="w-full lg:w-[700px] flex flex-col justify-center items-center mx-auto bg-white p-10 max-sm:px-3 rounded-2xl my-10">
            <Image src="/circle-cancel.png" className="self-end" alt="image" width={25} height={25} onClick={() => setisChat(false)} />
            <div className="bg-red-200 p-8 my-5">
              <div className="flex justify-center items-center">
                <Image
                  src="/caution-img.png"
                  alt="image"
                  width={25}
                  height={25}
                />
                <p className="text-xl font-extrabold">Warnings!</p>
              </div>
              <div>
                <li className="my-3">
                  In keeping with our policy on reliability, agents, reps or
                  roommates are not allowed to charge you an extra fee such as
                  inspection fees or any added fee.
                </li>
                <li className="my-3">
                  Agents fee should never be more than 10% of your rent. Report
                  any agent or rep who charges otherwise.
                </li>
                <li className="my-3">
                  For your security, do not pay agency fees or roommate fees
                  outside this platform. Also make sure to pay rent directly to
                  landlord or barrister in charge.
                </li>
                <li className="my-3">
                  Paying via this platform allows us to weed out unreliable
                  agents or reps while allowing you the power to review this
                  agent, rate him/ her, publish a sale on his profile, remove
                  this accomodation from our system so others don&apos;t find
                  it.
                </li>
                <li className="my-3">
                  We have provided an automated text once you click
                  &rdquo;continue to chat&ldquo; so you keep your communication
                  professional outside this platform.
                </li>
                <p>
                  <b>NB:</b> Dear customer we live to serve you better. Pls
                  expect upgrades as we are currently and always improving this
                  platform. Your feedback is always highly appreciated.
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={communicateAgent}
                className="rounded-2xl w-[200px] max-sm:w-max self-center max-sm:mx-2 m-5 px-5 py-4 text-white bg-deep-green shadow-lg hover:opacity-80 text-center"
              >
                CONTINUE TO CHAT
              </button>
              <button className="rounded-2xl w-[200px] max-sm:w-max self-center max-sm:mx-2 m-5 px-5 py-4 text-white bg-deep-green shadow-lg hover:opacity-80 text-center">
                PAY HERE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
