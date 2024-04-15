"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiCamera, BiPencil } from "react-icons/bi";
import { Features } from "@/app/roommate/data/index";
import { objectValidator } from "@/util";
import { api, getToken, getUser } from "@/app/shared";
import { useRouter } from "next/navigation";

const Upload = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const url_data = decodeURIComponent(id);
  const headers = { headers: { Authorization: getToken() } };
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [state, setState] = useState<string>();
  const [landmark, setLandmark] = useState<string>();
  const [amount, setAmount] = useState<string>();

  const [nuberOfBedrooms, setNuberOfBedrooms] = useState<string>();
  const [numberOfToilets, setNumberOfToilets] = useState<string>();
  const [numberOfBathRooms, setNumberOfBathRooms] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [extra, setExtra] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const imageFields = [1, 2, 3, 4];
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImage] = useState([]);
  const updatedImg: any = [];

  const room_details: any = {
    title,
    state,
    landmark,
    amount,
    nuberOfBedrooms,
    numberOfToilets,
    numberOfBathRooms,
    description,
    extra,
    features: selectedFeatures,
  };

  previewImages.map((image) => updatedImg.push(image));

  // Set Images and previewImages
  // ----------------------------
  const handleImageChange = (index: number, event: any) => {
    const files = event.target.files;

    if (files.length > 0) {
      const newImages: any = [...images];
      newImages[index] = files[0];
      setImages(newImages);

      const newPreviewImages: any = [...previewImages];
      newPreviewImages[index] = URL.createObjectURL(files[0]);
      setPreviewImage(newPreviewImages);
    }
  };

  const getUpdatedImages = (arrayOfUploadedImages: string[]) => {
    let initailState = 0;
    for (let i = 0; i < updatedImg.length; i++) {
      if (updatedImg[i].includes("blob")) {
        updatedImg[i] = arrayOfUploadedImages[initailState];
        initailState++;
      }
    }
    return updatedImg;
  };

  const select_Remove_Extra = (text: string) => {
    setExtra((prevValues) => {
      if (prevValues.includes(text)) {
        return prevValues.filter((item) => item !== text);
      }
      return [...prevValues, text];
    });
  };

  const handleSelect = (text: string) => {
    setSelectedFeatures((prevValues) => {
      if (prevValues.includes(text)) {
        return prevValues.filter((item) => item !== text);
      } else {
        return [...prevValues, text];
      }
    });
  };

  const CHECK_USER_POST_STATUS = async () => {
    const response = await axios.get(`${api}roommate/userStatus`, headers);
    return response.data;
  };

  const uploadImages = async () => {
    const uploadedImages: any = [];
    const formData = new FormData();
    if (images.length > 0) {
      images.map((image) => formData.append("files[]", image));

      const requestOptions: any = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };
      const response: any = await fetch(
        "https://imageupload.eaxyget.com/multipleUpload",
        requestOptions
      );
      const result = await response.json();
      if (result.uploaded_images) {
        result.uploaded_images.map((image: any) =>
          uploadedImages.push(image.image_link)
        );
      }
    }
    return uploadedImages;
  };

  const sendPostToDataBase = async (
    apiUrl: string,
    upladedImages: string[]
  ) => {
    const room_object = { ...room_details, images: upladedImages };
    const response = await axios.post(`${api}${apiUrl}`, room_object, headers);
    if (response.data.status == "success") {
      setExtra([]);
      setSelectedFeatures([]);
      router.push(`/roommate/single/${getUser().HMId}`);
    }
    setLoading(false);
    setMessage(response.data.message);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async () => {
    const { feature, ...newObect } = room_details; // Remove Feature from the object before validation
    let room_object = objectValidator(newObect);

    const user = await CHECK_USER_POST_STATUS();
    const uploadedImages = await uploadImages();
    const IMAGES = getUpdatedImages(uploadedImages);

    if (room_object !== undefined) {
      setMessage(room_object);
    } else {
      if (url_data == "new_post" && images.length == 5) {
        if (images.length == 5) {
          if (user.status == true) {
            return sendPostToDataBase("roommate/upload", IMAGES);
          }
          setMessage(user.message);
        } else {
          setMessage("Please provide atleast 5 images");
        }
      } else {
        // UPDATE POST
        sendPostToDataBase("roommate/update", IMAGES);
      }
    }
  };

  useEffect(() => {
    //------->Edit post functionality<-------------
    if (url_data !== "new_post") {
      axios.get(`${api}roommate/room/${url_data}`).then((result) => {
        if (result.data.status) {
          const response = result.data.room;
          setTitle(response.title);
          setState(response.state);
          setLandmark(response.landmark);
          setAmount(response.amount);
          setNuberOfBedrooms(response.number_of_bedrooms);
          setNumberOfToilets(response.number_of_toilets);
          setNumberOfBathRooms(response.number_of_bathrooms);
          setDescription(response.description);
          if (response.images.length == 5) {
            setPreviewImage((previousPreviewImages) => {
              return response.images.map((image: any) => image);
            });
          }
          response.extra.map((item: string) =>
            setExtra((prevValues) => [...new Set([...prevValues, item])])
          );
          response.features.map((item: string) =>
            setSelectedFeatures((previewImages) => [
              ...new Set([...previewImages, item]),
            ])
          );
        }
      });
    }
  }, [router, url_data]);

  const extraList = [
    "conducive environment",
    "close to central market",
    "adequate security",
    "quiet surrounding",
  ];

  const inputClass =
    "mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]";

  return (
    <div className="px-14 max-sm:px-6 w-full">
      <form className="mt-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="relative w-full h-[250px] md:h-[350px] bg-[url('/camera_bg.png')] bg-cover bg-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImages && previewImages[0]}
              alt=""
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
            <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
              <label htmlFor="firstImage" className="cursor-pointer">
                <BiCamera size={40} className="bg-white drop-shadow" />
                <input
                  id="firstImage"
                  type="file"
                  className="hidden"
                  onChange={(event) => handleImageChange(0, event)}
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {imageFields.map((field, index) => (
              <div
                key={index}
                className="relative w-full h-[170px] bg-[url('/camera_bg.png')] bg-cover bg-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImages && previewImages[index + 1]}
                  alt=""
                  width={700}
                  height={100}
                  className="object-cover w-full h-full"
                />
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
                  <label htmlFor={`${index}`} className="cursor-pointer">
                    <BiCamera size={40} className="bg-white drop-shadow" />
                    <input
                      id={`${index}`}
                      type="file"
                      className="hidden"
                      onChange={(event) => handleImageChange(index + 1, event)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="property_section lg:flex-row flex gap-3 mt-8 w-full md:flex-col
            max-sm:flex-col"
        >
          {/* ============Input Section=========== */}
          <div className="w-full lg:w-[70%]">
            <div className="flex items-center gap-2">
              <BiPencil size={20} />
              <h2 className="text-xl font-medium">Add New Room</h2>
            </div>

            {/* ============Input Fields============ */}
            <div className="my-4">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="mb-3">
                  <label className="text-bold capitalize">title</label>
                  <input
                    type="text"
                    value={title || ""}
                    placeholder="Eg. 1 Self-contain apartment, 4 Bedroom apartment"
                    className={inputClass}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="text-bold capitalize">state</label>
                  <input
                    type="text"
                    value={state || ""}
                    placeholder="Eg. Abia state nigeria"
                    className={inputClass}
                    onChange={(event) => setState(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="text-bold capitalize">landmark</label>
                  <input
                    type="text"
                    value={landmark || ""}
                    placeholder="Eg. Nearby Plot 4 Johnson Avenue."
                    className={inputClass}
                    onChange={(event) => setLandmark(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="text-bold capitalize">amount</label>
                  <input
                    type="text"
                    value={amount || ""}
                    placeholder="Total number. eg. 5"
                    className={inputClass}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </div>
              </div>

              <hr />

              <div>
                <p className="font-bold text-lg mt-3">Room Details</p>
                <div className="flex max-sm:flex-col max-sm:w-full my-4">
                  <div className="mb-3 mx-2">
                    <label className="text-bold">Bedrooms</label>
                    <input
                      type="number"
                      value={nuberOfBedrooms || ""}
                      placeholder="Total number. eg. 4"
                      onChange={(event) =>
                        setNuberOfBedrooms(event.target.value)
                      }
                      className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                    />
                  </div>
                  <div className="mb-3 mx-2">
                    <label className="text-bold">Toilets</label>
                    <input
                      type="number"
                      value={numberOfToilets || ""}
                      placeholder="Total number. eg. 5"
                      onChange={(event) =>
                        setNumberOfToilets(event.target.value)
                      }
                      className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                    />
                  </div>
                  <div className="mb-3 mx-2">
                    <label className="text-bold">Bathrooms</label>
                    <input
                      type="number"
                      value={numberOfBathRooms || ""}
                      placeholder="Total number. eg. 3"
                      onChange={(event) =>
                        setNumberOfBathRooms(event.target.value)
                      }
                      className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                    />
                  </div>
                </div>
              </div>

              <div className="tell_us my-4">
                <h1 className="font-bold text-lg">Tell us about this place</h1>
                <textarea
                  required
                  placeholder="Write some short description about this place..."
                  value={description || ""}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="outline-none p-3 mt-2 h-[200px] resize-none w-full border-[1px] border-sky-200 focus:border-sky-500"
                ></textarea>
              </div>

              {/* ============Features============ */}
              <div className="what_theplace_offers mt-4">
                <h2 className="font-bold text-lg mb-3">Select Extra</h2>

                <div className="grid lg:grid-cols-2 gap-1 mb-6 capitalize md:grid-cols-2">
                  {extraList.map((item, index) => (
                    <label
                      key={index}
                      htmlFor={item}
                      className="flex gap-2 p-2 border border-transparent cursor-pointer hover:border-sky-300"
                    >
                      <input
                        type="checkbox"
                        id={item}
                        className="cursor-pointer"
                        value={item}
                        checked={extra.includes(extraList[index])}
                        onChange={(e) => select_Remove_Extra(e.target.value)}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="what_theplace_offers mt-8">
                <h2 className="font-bold text-lg mb-3">
                  What This Place Offers
                </h2>

                <div className="grid lg:grid-cols-2 gap-1 mb-6 md:grid-cols-2">
                  {Features.map((item, index) => (
                    <label
                      key={index}
                      htmlFor={item}
                      className="flex gap-2 p-2 border border-transparent cursor-pointer hover:border-sky-300"
                    >
                      <input
                        type="checkbox"
                        id={item}
                        className="cursor-pointer"
                        checked={selectedFeatures.includes(Features[index])}
                        value={item}
                        onChange={(e) => handleSelect(e.target.value)}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-5">
          <button
            type="button"
            onClick={handleSubmit}
            className={
              !loading
                ? "w-full bg-green p-3  shadow-lg hover:opacity-90 md:w-1/4 text-white text-center rounded font-bold"
                : "w-full bg-light-green p-3  shadow-lg hover:opacity-90 md:w-1/4 text-deep-green text-center rounded font-bold"
            }
          >
            {url_data == "new_post"
              ? !loading
                ? "Porceed to Upload"
                : "Loading..."
              : !loading
              ? "Update"
              : "Loading..."}
          </button>
          <h2 className="text-green uppercase max-sm:text-sm font-extrabold max-sm:text-center">
            {message}
          </h2>
        </div>
      </form>
    </div>
  );
};

export default Upload;
