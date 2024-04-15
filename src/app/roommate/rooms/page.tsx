"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import RoommateTemplate from "@/components/PostTemplate/roommate";
import { api } from "@/app/shared";

const GetAllRoomMatePosts = () => {
  const [rooms, setRooms] = useState<any>();
  useEffect(() => {
    const getAllPost = async () => {
      const response = await axios.get(`${api}roommate/getAllRooms`);

      if (response.data.room) {
        setRooms(response.data.room);
      }
    };
    getAllPost();
  }, []);

  return !rooms ? (
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
    <div className="px-5 lg:px-10 bg-neutral-100 pb-3 my-5">
      <RoommateTemplate data={rooms} classname="hidden" />
    </div>
  );
};

export default GetAllRoomMatePosts;
