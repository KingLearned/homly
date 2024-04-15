"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { api, formatDate, getDate, getToken, getUser } from "@/app/shared";
import {
  agentInterface,
  agentReviewInterface,
  propertyInterface,
  userInterface,
} from "@/app/shared/definedTypes";
import { BiCheckShield } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

const AgentPage = (agentId: any) => {
  const router = useRouter();

  const currentUser: userInterface = getUser();

  const [agentData, setAgentData] = useState<agentInterface|undefined>(undefined);
  const [propertyData, setPropertyData] = useState<propertyInterface[]>([]);
  const [reviewsData, setReviewsData] = useState<agentReviewInterface[]>();
  const [RepsAgent, setRepsAgent] = useState<userInterface[]>([]);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isReview, setisReview] = useState(false);
  const [rate, setRate] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [message, setMessage] = useState("");
  const ratingNumber = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}users/getagent/${agentId.params.agentId}`
        );
        const data = response?.data;
        
        if(data){
            setAgentData(data.agent);
            setPropertyData(data.properties);
            setReviewsData(data.reviews);
            setRepsAgent(data.RepAgents)
            setStatus(data.success);
        }
      
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    fetchData();
  }, [agentId]);

  const userId = agentId.params.agentId
  const verifyAccount = async () => {
    if (userId) {
      setLoading(true);
      await axios.post(`${api}users/resendMail/${userId}`);
      router.push(`/verification/${userId}`);
    }
  };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const Star = rate;
      const Content = reviewContent;
      const headers = { Authorization: getToken() ? getToken() : "" };
      const response = await axios.post(
        `${api}users/write-agent-review/${agentId.params.agentId}`,
        { Star, Content },
        { headers }
      );
      const data = response.data;
      if (!data.error) {
        const addReview = {
          HMFirstname: currentUser?.HMFirstname,
          HMImage: currentUser?.HMImage,
          HMLastname: currentUser?.HMLastname,
          Content: Content,
          Created: getDate(),
          Star: Star,
          User: currentUser.HMId,
        };

        setMessage(data.message);
        setTimeout(() => {
          setMessage(""),
            setisReview(false),
            setRate(0),
            setReviewContent(""),
            reviewsData?.push(addReview);
        }, 3000);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  return !agentData ? (
    <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
      {status ? (
        <Image src="/Spin-1s-200px.svg" alt="" width={40} height={40} className="max-sm:w-1/2" /> 
      ) : (
        <h1 className="text-center text-3xl">
          Error 404:
          <br /> NOT FOUND !
        </h1>
      )}
    </div>
  ) : (
    <div className="p-12 max-sm:px-4">
      <h2 className="text-xl font-extrabold">
      {currentUser?.HMId == agentData?.HMId ?
        'My Profile Details'
      :
        'Agent Profile'
      }
      </h2>
      <div className="box flex max-sm:flex-col">
        <div className="my-3 p-5 rounded-md w-[30%] max-sm:w-full">
            <div className="flex flex-col justify-center items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={agentData.HMImage == null ? '/user-profile-icon.png' : agentData.HMImage}
                className="w-[150px] shadow-xl rounded-full h-[150px] object-fill"
                alt=""
                width={100}
                height={100}
              />
              <h2 className="font-extrabold capitalize">
                {agentData?.HMFirstname} {agentData?.HMLastname}
              </h2>
              <h2 className="font-bold text-green">
                {agentData?.HMType == "A"
                  ? "Normal Agent"
                  : "Representative"}
              </h2>
              {
                currentUser?.HMId == agentData?.HMId &&
                <Link
                  href={`/agent/edit-profile`}
                  className="submit_button py-3 px-5 shadow-lg hover:opacity-90 rounded-md text-white text-center"
                >
                  Edit Profile
                </Link>
              }
            </div>
            <hr className="mt-4 mb-4 border-gray-400 border-1" />

            <div>
              <div className="my-3">
                {currentUser?.HMId == agentData?.HMId ? agentData?.HMIsverified == "Y" ? (
                  <div className="w-[100px] flex gap-2 items-center p-2 text-green bg-light-green">
                    <BiCheckShield size={20} color="green" />
                    <p>verified</p>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="w-[150px] flex gap-2 items-center p-2 text-red-500 bg-light-green">
                      <FaTimes size={20} color="red" />
                      <p>Not verified</p>
                    </div>
                    <button
                      type="button"
                      className="p-2 text-white bg-green font-bold"
                      onClick={verifyAccount}
                    >
                      Verify Account
                    </button>
                  </div>
                ) : ''}
                {
                  (agentData?.HMType == "RE" && currentUser?.HMId == agentData?.HMId) &&
                  <div className="mt-3 flex justify-between items-center">
                    <h1 className="font-bold">Referral Code:</h1>
                    <h1 className="flex items-center p-2 bg-light-green justify-center font-bold w-[115px]">{agentData?.HMLink}</h1>
                  </div>
                }
              </div>

              <h2 className="text-xl my-4 font-bold">Extra Details</h2>
              <div className="mr-5 max-sm:mr-5">
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/tribal-shield.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />Ethnicy
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMEthinicity == '' || agentData.HMEthinicity == null ? 'None' : agentData.HMEthinicity}</p>
                </div>
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/nationality.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />Nationality
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMNationality == '' || agentData.HMNationality == null ? 'None' : agentData.HMNationality}</p>
                </div>
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/religion.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />Religion
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMReligion == '' || agentData.HMReligion == null ? 'None' : agentData.HMReligion}</p>
                </div>
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/links.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />Relationship status
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMRelationshipStatus == '' || agentData.HMRelationshipStatus == null ? 'None' : agentData.HMRelationshipStatus}</p>
                </div>
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/user-icon.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />Age
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMAge == '' || agentData.HMAge == null ? 'None' : agentData.HMAge}</p>
                </div>
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/gender.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />Gender
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMGender == '' || agentData.HMGender == null ? 'None' : agentData.HMGender}</p>
                </div>
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/occupation.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />Occupation
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMOccupation == '' || agentData.HMOccupation == null ? 'None' : agentData.HMOccupation}</p>
                </div>
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/school-work.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />School/Work place
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMSchool == '' || agentData.HMSchool == null ? 'None' : agentData.HMSchool}</p>
                </div>
                <div className="mb-5">
                  <h2 className="font-bold flex">
                    <Image src="/pet.png" alt="" width={20} height={20} className="object-contain  self-start mr-2" />Pet
                  </h2>
                  <p className="font-[500] ml-8 capitalize">{agentData.HMPets == '' || agentData.HMPets == null ? 'None' : agentData.HMPets}</p>
                </div>
              </div>
            </div>
        </div>

        <div className="w-[70%] max-sm:w-full about flex flex-col gap-5 p-12 border-emerald-500 border-[1px] bg-emerald-100 max-sm:px-4">
          <div className="flex gap-1">
            <p className="leading-loose">
              <span className="font-bold">My Biograph:</span>
              <br />
              {agentData?.HMBio}
            </p>
          </div>
          {/* RATINGS AND REVIEWS SUMMARY */}

          {
            currentUser?.HMType == "A" &&
            <div className="flex">
              <div className="flex justify-center w-full">
                <div className="my-4 sm:w-full mr-5">
                  <p className="flex flex-col sm:flex-row items-baseline">
                    <span className="font-bold mr-1 text-2xl">
                      {agentData?.HMReviews == 0 ? 0 : agentData?.HMReviews}
                    </span>
                    Reviews
                  </p>
                  <hr className=" border-gray-400 border-[1.8px] w-full" />
                </div>
                <div className="my-4 sm:w-full mr-3">
                  <p className="flex flex-col sm:flex-row items-baseline">
                    <span className="font-bold mr-1 text-2xl">
                      {agentData?.HMRating == 0 ? 0 : agentData?.HMRating}
                    </span>
                    Rating
                  </p>
                  <hr className=" border-gray-400 border-[1.8px]" />
                </div>
              </div>
              <div className="flex justify-center w-full">
                <div className="my-4 sm:w-full mr-5">
                  <p className="flex flex-col sm:flex-row items-baseline">
                    <span className="font-bold mr-1 text-2xl">
                      {agentData?.HMPublishes == 0 ? 0 : agentData?.HMPublishes}
                    </span>
                    Publishes
                  </p>
                  <hr className=" border-gray-400 border-[1.8px]" />
                </div>
                <div className="my-4 sm:w-full mr-5">
                  <p className="flex flex-col sm:flex-row items-baseline">
                    <span className="font-bold mr-1 text-2xl">
                      {agentData?.HMSales == null ? 0 : agentData?.HMSales}
                    </span>
                    Sales
                  </p>
                  <hr className=" border-gray-400 border-[1.8px]" />
                </div>
              </div>
            </div>
          }
          <hr className="mt-4 mb-4 border-gray-400 border-1" />
          <div className="flex gap-1">
            <Image
              src="/cil_education.png"
              alt=""
              width={20}
              height={20}
              className="object-contain  self-start mt-0"
            />
            <p className="leading-loose">
              <span className="font-bold">Educational Background:</span>
              <br />
              {agentData?.HMEducation}
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
              <span className="font-bold">Professional Achievements:</span>
              <br />
              {agentData?.HMProfession}
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
              <span className="font-bold">Likes & Dislikes:</span>
              <br />
              {agentData?.HMLikes}
            </p>
          </div>
        </div>
      </div>

      {/* AGENT REVIEWS SECTION */}
      {
        agentData?.HMType == "A" &&
        <div className="flex flex-col mb-10">
          <hr className="mt-4 mb-4 border-gray-400 border-1" />
          <h1 className="mt-2 font-[900] text-center text-2xl">REVIEWS</h1>
          <hr className="mt-4 mb-4 border-gray-400 border-1" />
          {(reviewsData?.length ?? 0) < 1 ? (
            <div className="h-[25vh] flex items-center justify-center m-1 rounded bg-slate-100">
              <h1 className="text-center text-3xl">No reviews yet!</h1>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 sm:grid-rows-2 gap-8 mt-6">
              {reviewsData?.map((review, index) => (
                <div className="pt-2 shadow-md rounded-md p-3" key={index}>
                  <div className="flex gap-3 mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={review?.HMImage}
                      className="w-[50px] h-[50px] rounded-full  object-fill"
                      alt=""
                      width={50}
                      height={50}
                    />
                    <span>
                      <h2 className="font-bold">
                        {review?.HMFirstname} {review?.HMLastname}
                      </h2>
                      <span>{formatDate(`${review?.Created}`)}</span>
                    </span>
                  </div>
                  <p>{review.Content}</p>
                  <div className="flex gap-1 mt-2">
                    {new Array(review?.Star).fill(0).map((array, index) => (
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
          {/* <button
            onClick={() => setisReview(true)}
            className="rounded-2xl self-center my-5 max-sm:w-1/2 w-1/5 text-white bg-deep-green shadow-lg py-3 hover:opacity-80 text-center"
          >
            Add your review
          </button> */}
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
                      placeholder="What do you like or dislike, how did the agent perform, tell us about the property?.. etc."
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
        </div>
      }

      {/* AGENT PROPERTY SECTION */}
      {
        agentData?.HMType == "A" &&
          <div>
            <hr className="mt-4 mb-4 border-gray-400 border-1" />
            <h1 className="mt-2 font-[900] text-center text-2xl">
              PUBLISHED PROPERTIES
            </h1>
            <hr className="mt-4 mb-4 border-gray-400 border-1" />
            {propertyData?.length < 1 ? (
              <div className="h-[25vh] flex items-center justify-center m-1 rounded bg-slate-100">
                <h1 className="text-center text-3xl">No properties yet!</h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-10 gap-x-5 mt-3 lg:grid-cols-4 lg:gap-8">
                {propertyData?.map((property, index) => (
                  <div
                    key={index}
                    className="home_item1 cursor-pointer shadow-lg p-5 rounded hover:scale-95 duration-300 delay-75"
                  >
                    <Link href={`/properties/single/${property?.HPId}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={property?.HPImages[0]} alt={property?.HPImages[0]} width={500} height={40} className="rounded object-fill h-[250px]" />
                    </Link>

                    <div className="home_houses_description1 flex mt-5">
                      <div className="houses_description_left1 text-sm w-3/4">
                        <h6 className="break-inside-auto truncate">
                          {property?.HPTitle}
                        </h6>
                        <div className="location_icon_and_location1 flex gap-1 mt-1">
                          <Image
                            src="/location.png"
                            alt="location"
                            className="h-[20px] w-[20px]"
                            width={20}
                            height={10}
                          />
                          <span className="border-0 truncate">
                            {property?.HPState}
                          </span>
                        </div>
                      </div>
                      <div className="houses_description_right text-right text-sm w-1/4">
                        <span className="font-bold">
                          {property?.HPPrice > 1000 &&
                          property?.HPPrice < 1000000
                            ? `${Math.round(property?.HPPrice / 1000)}K`
                            : property?.HPPrice > 1000000
                            ? `${Math.round(property?.HPPrice / 1000000)}M`
                            : `${property?.HPPrice}K`}
                        </span>
                      </div>
                    </div>
                    <div className="flex text-center text-xs capitalize mt-2">
                      <div className="border-[1px] p-1 gap-2 w-full mr-1 flex justify-center">
                        <Image
                          src="/double-bed.png"
                          alt=""
                          width={40}
                          height={40}
                          className="w-[20px]"
                        />
                        <p>{property?.HPBedrooms} Bedroom</p>
                      </div>
                      <div className="border-[1px] p-1 gap-2 w-full  flex justify-center">
                        <Image
                          src="/toilet.png"
                          alt=""
                          width={40}
                          height={40}
                          className="w-[20px]"
                        />
                        <p>{property?.HPToilets} Toilet</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
      }

      {/* REPS REFFERAL SECTION */}
      {
        agentData?.HMType == "RE" &&
          <div>
              <hr className="mb-4 mt-8 border-gray-400 border-1" />
              <h1 className="mt-2 font-[900] text-center text-2xl">REFERALS</h1>
              <hr className="mt-4 mb-4 border-gray-400 border-1" />
              {
                RepsAgent?.length < 1 ?
                  <div className="h-[25vh] flex items-center justify-center m-1 rounded bg-slate-100">
                    <h1 className="text-center text-3xl">No agents yet!</h1>
                  </div>
                : 
                <div className="grid grid-cols-1 gap-y-10 gap-x-5 mt-3 lg:grid-cols-4 lg:gap-8">
                  {
                    RepsAgent?.map((agent, index) => (
                      <div key={index} className="home_item1 cursor-pointer shadow-lg p-5 rounded hover:scale-95 duration-300 delay-75" >
                        <Link href={`/agent/profile/${agent.HMId}`}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={agent.HMImage == null ? '/user-profile-icon.png' : agent.HMImage} alt={agent.HMImage} width={500} height={40} className="rounded object-fill h-[250px]" />
                        </Link>
                        <div className="home_houses_description1 mt-2">
                          <h1 className="font-extrabold capitalize text-center text-lg">{agent.HMFirstname} {agent.HMLastname}</h1>
                          <h1 className="text-center text-green font-bold"><i>@{agent.HMUsername}</i></h1>
                        </div>
                      </div>
                    ))
                  }
                </div>
              }
          </div>
      }
    </div>
  );
};

export default AgentPage;
