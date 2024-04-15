// ReviewItem.tsx

import { reviewsInterface } from "@/app/shared/definedTypes";
import Image from "next/image";

interface ReviewItemProps {
  review: {
    name: string;
    date: string;
    content: string;
    rating: number;
  };
}

const formatDate = (date:string) => {
  return `${new Date(date).toLocaleDateString('en-US', { month: 'short'})}, ${new Date(date).toLocaleDateString('en-US', { year: 'numeric'})}`
}

const ReviewItem = ( review:reviewsInterface ) => (
  <div className="pt-2">
    <div className="flex gap-3 mb-2">
      <Image src={`/${review.HMImage}`} alt="" width={50} height={50} className="rounded-full" />
      <span>
        <h2 className="font-bold">{review.HMFirstname} {review.HMLastname}</h2>
        <span>{formatDate(`${review.HRCreated}`)}</span>
      </span>
    </div>
    <p>{review.HRContent}</p>
    <div className="flex gap-1 mt-2">
      {new Array(review.HRStar).fill(0).map((array, index) => (
        <Image key={index} src="/material-symbols_star.png" alt="" width={20} height={20} className="object-contain" />
      ))}
    </div>
  </div>
);

export default ReviewItem;
