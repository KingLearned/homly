import { propertyInterface } from "@/app/shared/definedTypes";
import Image from "next/image";
import Link from "next/link";

interface PropertyTemplateProps {
    data: propertyInterface[]
}



const PropertyTemplate: React.FC<PropertyTemplateProps> = ({ data }) => {

  return (
    data.length > 0 &&
    <div className="my-5">
      <div className="pl-5 flex justify-between items-center shadow bg-white py-5 rounded-t">
        <b className="relative text-[15px] capitalize text-deep-green">
          {data[0].HPCategory}
          <p className="absolute w-full h-[3px] rounded bg-yellow"></p>
        </b>
        <Link href={`properties/${data[0].HPCategory}`} className="text-xs mr-3">View all</Link>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-5 mt-3 lg:grid-cols-4 lg:gap-8">
        {data &&
          data.map((property, index) => (
            index < 4 &&
            <div key={index} className="home_item1 cursor-pointer shadow-lg p-5 rounded hover:scale-95 duration-300 delay-75"
            >
              <Link href={`/properties/single/${property.HPId}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={property.HPImages[0]} alt={'propertyimage'} width={500} height={40} className="rounded object-fill h-[250px]" />
              </Link>

              <div className="home_houses_description1 flex mt-5">
                <div className="houses_description_left1 text-sm w-3/4">
                  <h6 className="break-inside-auto truncate">{property.HPTitle}</h6>
                  <div className="location_icon_and_location1 flex gap-1 mt-1">
                    <Image src="/location.png" alt="location" className="h-[20px] w-[20px]" width={20} height={10} />
                    <span className="border-0 truncate">{property.HPState}</span>
                  </div>
                </div>
                <div className="houses_description_right text-right text-sm w-1/4">
                  <span className="font-bold">{property.HPLegalFee > 1000 && property.HPPrice < 1000000 ? `${Math.round(property.HPPrice / 1000)}K` : property.HPPrice >= 1000000 ? `${Math.round(property.HPPrice / 1000000)}M` : `${property.HPPrice}K`}</span>
                </div>
              </div>
              <div className="flex text-center text-xs capitalize mt-2">
                <div className="border-[1px] p-1 gap-2 w-full mr-1 flex justify-center">
                  <Image src="/double-bed.png" alt="" width={40} height={40} className="w-[20px]" />
                  <p>{property.HPBedrooms} Bedroom</p>
                </div>
                <div className="border-[1px] p-1 gap-2 w-full  flex justify-center">
                    <Image src="/toilet.png" alt="" width={40} height={40} className="w-[20px]" />
                    <p>{property.HPToilets} Toilet</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PropertyTemplate
