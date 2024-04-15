"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/app/shared";
import Image from "next/image";
import { UpdateInterface } from "@/app/shared/definedTypes";
import Link from "next/link";


const ShowUpdates = () => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [Contents, setContent] = useState<UpdateInterface[]>([])
    const [seeMore, SetSeeMore] = useState(false)
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${api}properties/get-updates`);
          const data = response.data;

          setContent(data.updates);

          const intervalId = setInterval(() => {
            setCurrentIndex(
              (prevIndex) => (prevIndex + 1) % data.updates?.length
            );
          }, 4000);

          return () => {
            clearInterval(intervalId);
          };
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    return !seeMore ? 
      <div className="flex max-sm:flex-col my-6 w-full">
        <button className="bg-green text-white font-bold px-5 max-sm:py-2 rounded-md">
          UPDATES:
        </button>

            <div className="flex w-full max-sm:mt-3">
                <div className="rounded-md border border-gray-700 max-sm:mx-0 mx-3 max-sm:h-[95px] max-sm:px-1 px-5 py-1 w-full">
                    {
                        Contents?.length < 1 ?
                            <h1 className="font-[700] text-sm">...</h1>
                        :
                        <Link href={`/roommate/profile/${Contents[currentIndex].HUserId}`} >
                            <h1 className="font-[700] text-sm">{Contents[currentIndex].HUContent} <br /> <span className="font-[100]">{Contents[currentIndex].HULocation}, {Contents[currentIndex].HUCategory}</span></h1>
                        </Link>
                    }
                </div>

                <button onClick={() => SetSeeMore(true)} className="border border-black rounded-md font-[500] w-[10%] max-sm:w-[15%] max-sm:ml-2 max-sm:text-xs" 
                >See more</button>
            </div>
      
      </div>
      : 
      <div
        className={
          "bg-layer w-screen fixed top-0 left-0 py-10 px-5 max-sm:px-3 z-30 overflow-y-scroll h-full"
        }
      >
        <div className="w-full lg:w-[900px] mx-auto bg-white p-10 max-sm:px-3 rounded-2xl my-10">
          <div className="form-cancel w-full flex justify-end cursor-pointer">
            <Image
              src="/circle-cancel.png"
              alt="image"
              width={25}
              height={25}
              onClick={() => SetSeeMore(false)}
            />
          </div>
          <div className="w-full">
            <h1 className="text-center font-extrabold mb-5 text-green">
              UPDATES:
            </h1>
            {Contents?.map((content, index) => (
              <Link key={index} href={`/roommate/profile/${content.HUserId}`}>
                <h1 className="font-[700] my-5">
                  {content.HUContent} <br />{" "}
                  <span className="font-[100]">
                    {content.HULocation}, {content.HUCategory}
                  </span>
                </h1>
                <hr className="my-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    
}

export default ShowUpdates;