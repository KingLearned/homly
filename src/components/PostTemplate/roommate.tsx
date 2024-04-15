import Link from "next/link";
import Image from "next/image";
import { RoommateType } from "@/app/types";

const RoommateTemplate = ({
  data,
  classname,
}: {
  data: RoommateType[];
  classname?: string;
}) => {
  return (
    <div className="my-5">
      <div className="pl-5 flex justify-between items-center shadow bg-white py-5 rounded-t">
        <b className="relative text-[15px] capitalize text-deep-green">
          Room Mates
          <p className="absolute w-full h-[3px] rounded bg-yellow"></p>
        </b>
        <Link href={`/roommate/rooms`} className={`text-xs mr-3 ${classname}`}>
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-5 mt-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 capitalize">
        {data.length > 0 &&
          data.map(
            (room: any, index: any) =>
              index < 4 && (
                <Link
                  key={index}
                  href={`/roommate/single/${room.roommate_id}`}
                  className="cursor-pointer shadow-lg p-5 rounded hover:scale-95 duration-300 delay-75"
                >
                  <div>
                    <div className="w-full h-[190px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={room.images[0]}
                        alt={"room image"}
                        width={500}
                        height={40}
                        className="object-fill rounded h-full w-full"
                      />
                    </div>
                  </div>

                  <div className="flex mt-5">
                    <div className="text-sm w-3/4">
                      <h6 className="break-inside-auto truncate">
                        {room.title}
                      </h6>
                      <div className="location_icon_and_location1 flex gap-1 mt-1">
                        <Image
                          src="/location.png"
                          alt="location"
                          className="h-[20px] w-[20px]"
                          width={20}
                          height={10}
                        />
                        <span className="border-0 truncate">{room.state}</span>
                      </div>
                    </div>
                    <div className="houses_description_right text-right text-sm w-1/4">
                      <span className="font-bold">{room.amount}</span>
                    </div>
                  </div>
                  <div className="flex text-center text-xs capitalize mt-2">
                    <div className="border-[1px] p-1 gap-2 w-full mr-1 flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/double-bed.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-[20px]"
                      />
                      <p>{room.number_of_bedrooms} Bedroom</p>
                    </div>
                    <div className="border-[1px] p-1 gap-2 w-full  flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/toilet.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-[20px]"
                      />
                      <p>{room.number_of_toilets} Toilet</p>
                    </div>
                  </div>
                </Link>
              )
          )}
      </div>
    </div>
  );
};

export default RoommateTemplate;
