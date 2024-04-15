"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { api } from "@/app/shared";
import { propertyInterface } from "@/app/shared/definedTypes";

const PropertyPage = (category: any) => {
  const router = useRouter();

  const [propertyData, setPropertyData] = useState<propertyInterface[]>([]);
  const [status, setSatus] = useState(false);
  const [statusMessage, setstatusMessage] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}properties/category/${category.params.category}`
        );
        const data = response.data;
        if (!data.error) {
          setPropertyData(data.properties);
          setSatus(true);
        } else {
          setstatusMessage(data.error);
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    fetchData();
  }, [category.params.category]);


  return !status ? (
    <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
      {statusMessage == "Loading..." ? (
        <Image src="/Spin-1s-200px.svg" alt="" width={40} height={40} className="max-sm:w-1/2" />
      ) : (
        <h1 className="text-center text-3xl">
          Error 404:
          <br />
          Category not found!
        </h1>
      )}
    </div>
  ) : (
    <div className="max-sm:p-0 px-12 pb-5 my-8 mx-5">
      <div className="flex justify-center shadow bg-white py-4 rounded-t">
        <b className="relative text-[15px] text-center uppercase text-deep-green w-[content]">
          {category.params.category}
          <p className="absolute w-full h-[3px] rounded bg-yellow"></p>
        </b>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-5 mt-3 lg:grid-cols-4 lg:gap-8">
        {propertyData?.map((property, index) => (
          <div
            key={index}
            className="home_item1 cursor-pointer shadow-lg p-5 rounded hover:scale-95 duration-300 delay-75"
          >
            <Link href={`/properties/single/${property.HPId}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.HPImages[0]}
                alt={property.HPImages[0]}
                width={500}
                height={40}
                className="rounded object-fill h-[250px]"
              />
            </Link>

            <div className="home_houses_description1 flex mt-5">
              <div className="houses_description_left1 text-sm w-3/4">
                <h6 className="break-inside-auto truncate">
                  {property.HPTitle}
                </h6>
                <div className="location_icon_and_location1 flex gap-1 mt-1">
                  <Image
                    src="/location.png"
                    alt="location"
                    className="h-[20px] w-[20px]"
                    width={20}
                    height={10}
                  />
                  <span className="border-0 truncate">{property.HPState}</span>
                </div>
              </div>
              <div className="houses_description_right text-right text-sm w-1/4">
                <span className="font-bold">
                  {property.HPPrice > 1000 && property.HPPrice < 1000000
                    ? `${Math.round(property.HPPrice / 1000)}K`
                    : property.HPPrice > 1000000
                    ? `${Math.round(property.HPPrice / 1000000)}M`
                    : `${property.HPPrice}K`}
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
                <p>{property.HPBedrooms} Bedroom</p>
              </div>
              <div className="border-[1px] p-1 gap-2 w-full  flex justify-center">
                <Image
                  src="/toilet.png"
                  alt=""
                  width={40}
                  height={40}
                  className="w-[20px]"
                />
                <p>{property.HPToilets} Toilet</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyPage;
