"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "./shared";
import { propertyInterface } from "./shared/definedTypes";
import PropertyTemplate from "@/components/PostTemplate/property";
import RoommateTemplate from "@/components/PostTemplate/roommate";
import PostUpdates from "@/components/PostUpdates";
import ShowUpdates from "@/components/ShowUpdates";

export default function Home() {
  const [propertyData, setPropertyData] = useState<propertyInterface[]>([]);
  const Luxury: propertyInterface[] = [];
  const Flats: propertyInterface[] = [];
  const Single: propertyInterface[] = [];
  const Others: propertyInterface[] = [];
  const SelfContain: propertyInterface[] = [];

  const [roomMates, setRoomMates] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}properties/getall`);
        const roommates = await axios.get(`${api}roommate/getAllRooms`);
        const data = response.data;
        if (!data.error) {
          setPropertyData(data.properties);
          setRoomMates(roommates.data.room);
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    fetchData();
  }, []);

  propertyData?.forEach((property) => {
    property.HPCategory == "Luxury"
      ? Luxury.push(property)
      : property.HPCategory == "Flats"
      ? Flats.push(property)
      : property.HPCategory == "Single"
      ? Single.push(property)
      : property.HPCategory == "Others"
      ? Others.push(property)
      : SelfContain.push(property);
  });

  return propertyData?.length == 0 && Luxury?.length == 0 ? (
    <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
      <Image
        src="/Spin-1s-200px.svg"
        alt=""
        width={40}
        height={40}
        className="max-sm:w-1/2"
      />
    </div>
  ) : (
    <div className="px-5 lg:px-10 bg-neutral-100 pb-3 py-5">
      <div className="home-container bg-[url('/homebg.png')] bg-no-repeat bg-cover w-full flex">
        <div className="py-40 max-sm:py-20 text-center flex flex-col gap-3 bg-black-transparent w-full">
          <h1 className="text-4xl max-sm:text-2xl font-[900] text-yellow">
            Welcome to Homly!
          </h1>
          <p className="font-[900] text-white text-xl max-sm:text-sm px-5">
            <i>
              Explore accomodations and connect with your ideal roommates all
              with Homly!
            </i>
          </p>
          <PostUpdates />
        </div>
      </div>

      <ShowUpdates />

      {/*========= Luxry and duplex =========*/}
      <PropertyTemplate data={Luxury} />
      {/*========= Flats =========*/}
      <PropertyTemplate data={Flats} />
      {/*========= Single =========*/}
      <PropertyTemplate data={Single} />
      {/*========= Self contain =========*/}
      <PropertyTemplate data={SelfContain} />
      {/*========= Others =========*/}
      <PropertyTemplate data={Others} />
      {/*========= Room mate =========*/}
      <RoommateTemplate data={roomMates} />
    </div>
  );
}
