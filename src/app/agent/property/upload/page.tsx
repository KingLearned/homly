"use client";
import { Features, api, getToken, getUser } from "@/app/shared";
import { TagAgentInterface, userInterface } from "@/app/shared/definedTypes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const currentUser: userInterface = getUser();

  const [MinAgencyFee, setminAgencyFee] = useState(0);
  const [MaxAgencyFee, setmaxAgencyFee] = useState(0);
  const [legalFee, setlegalFee] = useState(0);
  const [HPCautionFee, setHPCautionFee] = useState(0)
  const [HPSecurityFee, setHPSecurityFee] = useState(0)
  const [HPPrice, setHPPrice] = useState(0)
  const [MintotalAmount, setminTotalamount] = useState(0);
  const [MaxtotalAmount, setmaxTotalamount] = useState(0);


  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [HPTitle, setHPTitle] = useState("");
  const [HPCategory, setHPCategory] = useState("Luxury");
  const [HPDescription, setHPDescription] = useState("");
  const [HPState, setHPState] = useState("");
  const [HPCity, setHPCity] = useState("");
  const [HPToilets, setHPToilets] = useState("");
  const [HPBedrooms, setHPBedrooms] = useState("");
  const [HPBathrooms, setHPBathrooms] = useState("");



  const [selectedFeature, setSelectFeature] = useState(    new Array(Features.length).fill(false)  );
  const [propFeatures, setpropFeatures] = useState<string[]>([]);
  
  const [TagAgents, setTagAgents] = useState<TagAgentInterface[]>([]);
  const [AddAgents, setAddAgents] = useState<TagAgentInterface[]>([]);

  const [captureValue, setcaptureValue] = useState('')


  useEffect(() => {
    !currentUser?.HMFirstname ? router.push("/") : "";
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}properties/tag-agents/${currentUser?.HMId}`);
        setTagAgents(response.data.TagAgents)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, [])


  const handleSFeature = (index: number) => {
    const newSelectedFeatures = [...selectedFeature];

    const removeFeature = propFeatures.indexOf(Features[index]);
    !newSelectedFeatures[index]
      ? propFeatures.push(Features[index])
      : removeFeature !== -1 && propFeatures.splice(removeFeature, 1);

    newSelectedFeatures[index] = !newSelectedFeatures[index];
    setSelectFeature(newSelectedFeatures);
  };

  const imageThumb = [ "firstImage", "secondImage", "thirdImage", "fourthImage", "fifthImage"];
  const [isImgChanged, setisImgChanged] = useState(
    new Array(imageThumb.length).fill(false)
  );
  const [previewImage, setPreviewImage] = useState<string[]>(
    new Array(imageThumb.length).fill(null)
  );

  const [Images, setImages] = useState(new Array(imageThumb.length).fill(null));

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const changedImg = [...isImgChanged];
    changedImg[index] = !changedImg[index];

    const file = changedImg ? e.target.files?.[0] : "";
    setisImgChanged((changedImg) => [
      ...changedImg.slice(0, index),
      file ? true : false,
      ...changedImg.slice(index + 1),
    ]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage((prevImages) => [
          ...prevImages.slice(0, index),
          reader.result as string,
          ...prevImages.slice(index + 1),
        ]);
      };
      reader.readAsDataURL(file);

      setImages((prevImages) => [
        ...Images.slice(0, index),
        file,
        ...Images.slice(index + 1),
      ]);
    } else {
      setPreviewImage((prevImages) => [
        ...prevImages.slice(0, index),
        "",
        ...prevImages.slice(index + 1),
      ]);
      setImages((prevImages) => [
        ...Images.slice(0, index),
        null,
        ...Images.slice(index + 1),
      ]);
    }
  };

  const handlePropertyUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // UPLOADING AND GETTING OF PROPERTY IMAGES FROM THE IMAGE UPLOAD SERVER
      if(Images.every((image) => image !== null)){
        
        if (Images[0].size < 50 * 1024 * 1024){
          // const uploadProperty = async (propertyImages: []) => {
          //   const headers = { Authorization: getToken() ? getToken() : "" }
          //   const response = await axios.post(
          //     `${api}users/agent/upload-property`,
          //     {
          //       HPTitle,
          //       HPCategory,
          //       HPDescription,
          //       propertyImages,
          //       HPState,
          //       HPCity,
          //       MinAgencyFee,
          //       MaxAgencyFee,
          //       legalFee,
          //       HPCautionFee,
          //       HPSecurityFee,
          //       HPPrice,
          //       HPToilets,
          //       HPBedrooms,
          //       HPBathrooms,
          //       AddAgents,
          //       propFeatures,
          //     },
          //     { headers }
          //   );
            
          //   if (response?.data?.success) {
          //     setMessage(response?.data?.message);
          //     setTimeout(() => {
          //       setMessage("")
          //       setLoading(false)
          //       router.push(`/properties/single/${response.data.uploadId}`);
          //     }, 3000);
          //   }
          // }
          // setLoading(true)
        
          // const formData = new FormData();
          // Images.forEach((Image, index) => {
          //   formData.append(`files[]`, Image);
          // });
          // const requestOptions: any = {
          //   method: "POST",
          //   body: formData,
          //   redirect: "follow",
          // };
          // fetch("https://imageupload.eaxyget.com/multipleUpload", requestOptions)
          //   .then((response) => response.json())
          //   .then((result) => {
          //     const uploadedImages: any = [];
          //     const getImages = result?.uploaded_images;
          //     getImages.forEach((Image: { image_link: string }) => {
          //       uploadedImages.push(Image.image_link);
          //     });
          //     uploadProperty(uploadedImages);
          //   })
          //   .catch((error) => { console.log(error), setLoading(false) })
        }else{
          alert('Video should not be more than 50MB of size!')
        }

      } else {
        alert('All property video and images must be completed!')
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return !currentUser ?
    <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
      <Image src="/Spin-1s-200px.svg" alt="" width={40} height={40} className="max-sm:w-1/2"  />
    </div>
  :
  currentUser?.HMType == "A" || currentUser?.HMType == "RE" ? 
    <div className="agent_upload_container px-14 max-sm:px-6 w-full">
      <form className="mt-5" onSubmit={handlePropertyUpload}>
        <div className="upload_images_container flex max-sm:flex-col gap-4 max-sm:h-full h-[20rem] mb-6 z-[-1]">
          <div className={`upload_image_left w-1/2 max-sm:w-full h-full max-sm:h-[20rem] flex items-center justify-center overflow-hidden`} >
            <input type="file" name="firstImage" id="firstImage" onChange={(e) => { previewImage[0] = '' , handleImageChange(e, 0); }} accept="video/*" hidden />
            <label htmlFor="firstImage" className="absolute z-50">
              <Image src="/video_icon.png" alt="" width={40} height={40} />
            </label>
            {previewImage[0] &&
              <div className="h-full">
                <video controls width="40" className="w-[100vw] h-full max-sm:h-[20rem]">
                  <source src={previewImage[0]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* <Image
                  src={previewImage[0]}
                  alt="property"
                  className="w-[100vw] h-[100vh] object-cover"
                  width={40}
                  height={40}
                /> */}
              </div>
            }
          </div>
          {/* IMAGE 2ND - 5TH */}
          <div className="upload_image_right grid grid-cols-2 max-sm:w-full w-1/2 gap-3">
            {imageThumb.map(
              (imgName, index) =>
                index > 0 && (
                  <div key={index}
                    className="xl:h-[155px] max-sm:h-[150px] w-full upload_image_left flex justify-center items-center relative overflow-hidden"
                  >
                    <label htmlFor={imgName} className="absolute">
                      <input
                        type="file"
                        name={imgName}
                        id={imgName}
                        onChange={(e) => {
                          handleImageChange(e, index);
                        }}
                        accept="image/*"
                        className="hidden"
                      />
                      {previewImage[index] ? (
                        <div>
                          <Image
                            src={previewImage[index]}
                            alt="property"
                            className="w-full h-full object-fill"
                            width={40}
                            height={40}
                          />
                        </div>
                      ) : (
                        <Image
                          src="/camera.png"
                          alt=""
                          className=""
                          width={40}
                          height={40}
                        />
                      )}
                    </label>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="property_section lg:flex-row flex gap-3 w-full md:flex-col max-sm:flex-col" >
          <div className="property_section_left w-[70%] max-sm:w-full">
            <div className="property_section_header flex gap-2">
              <Image
                src="/description_symbol.png"
                alt="property"
                width={20}
                height={20}
              />
              <h2 className="text-xl font-medium">Add New Property</h2>
            </div>
            <div
              className="more_property_description grid max-sm:flex-col 
                                max-sm:w-full my-4"
            >
              <div className="mb-3">
                <label className="text-bold">Title</label>
                <input
                  type="textarea"
                  onChange={(e) => {
                    setHPTitle(e.target.value);
                  }}
                  placeholder="Eg. 1 Self-contain apartment, 4 Bedroom apartment"
                  required
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
              <div className="mb-3">
                <label className="text-bold">Category</label>
                <select
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                  onChange={(e) => {
                    setHPCategory(e.target.value);
                  }}
                >
                  <option>Luxury</option>
                  <option>Flats</option>
                  <option>Single</option>
                  <option>Others</option>
                  <option value={"Self-Contain"}>Self Contain</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="text-bold">Landmark / Street</label>
                <input
                  type="textarea"
                  onChange={(e) => {
                    setHPCity(e.target.value);
                  }}
                  placeholder="Eg. KM-4 Ikot-Ekpene Rd, Plot 4 Johnson Avenue."
                  required
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
              <div className="mb-3">
                <label className="text-bold">Geo Location / State</label>
                <input
                  type="textarea"
                  placeholder="Eg. Port Harcourt, Abuja, Lagos"
                  onChange={(e) => {
                    setHPState(e.target.value);
                  }}
                  required
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
            </div>
            <hr />
            <div
              className="more_property_description flex max-sm:flex-col 
                                max-sm:w-full my-4"
            >
              <div className="mb-3 mx-2">
                <label className="text-bold">Bedrooms</label>
                <input
                  type="number"
                  onChange={(e) => {
                    setHPBedrooms(e.target.value);
                  }}
                  placeholder="Total number. eg. 4"
                  required
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>

              <div className="mb-3 mx-2">
                <label className="text-bold">Toilets</label>
                <input
                  type="number"
                  required
                  placeholder="Total number. eg. 5"
                  onChange={(e) => {
                    setHPToilets(e.target.value);
                  }}
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>

              <div className="mb-3 mx-2">
                <label className="text-bold">Bathrooms</label>
                <input
                  type="number"
                  required
                  placeholder="Total number. eg. 3"
                  onChange={(e) => {
                    setHPBathrooms(e.target.value);
                  }}
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
            </div>
            <hr />
            <div className="tell_us my-4">
              <h1 className="text-bold">TELL US ABOUT THIS PLACE</h1>
              <textarea
                required
                placeholder="Write some short description about this place..."
                onChange={(e) => {
                  setHPDescription(e.target.value);
                }}
                className="outline-none p-3 mt-2 h-[300px] resize-none w-full border-[1px] border-sky-200 focus:border-sky-500"
              ></textarea>
            </div>
            <hr />

            <div className="what_theplace_offers my-4">
              <h2 className="text-bold mb-3">SELECT PROPERTY AMENITIES</h2>

              <div className="grid lg:grid-cols-2 gap-1 md:grid-cols-2">
                {Features.map((feature, index) => (
                  <div key={index} className={`flex gap-2 w-[50%] cursor-pointer md:w-[90%] max-sm:w-[100%] m-1 p-1 px-2 border-[1px] 
                    items-center
                    ${
                      selectedFeature[index]
                        ? "border-sky-500"
                        : "hover:border-sky-200"
                    }`}
                    onClick={() => handleSFeature(index)} >
                    <Image
                      src="/house_offers.png"
                      alt="offers"
                      width={15}
                      height={15}
                    />
                    <p className="mb-[-2px]">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr />
            {/* ADD MULTIPLE AGENTS       ADD MULTIPLE AGENTS       ADD MULTIPLE AGENTS */}
            <div className="what_theplace_offers mt-4">
              <h1 className="text-bold mb-1 font-bold">ADD MULTIPLE AGENTS</h1>
              <p>Include agents you work with on this accomodation, determine sharing percentage on agency fee, keep your clients informed.</p>
              {
                AddAgents.length > 0 ?
                  <div className="mt-3 grid lg:grid-cols-2 gap-3 md:grid-cols-2">
                    {
                      AddAgents.map((agent, index) => (
                        <div key={index} className="border-[1px] p-2 max-w-[content] rounded flex flex-col">
                          <Image src="/circle-cancel.png" alt="image" width={25} height={25} className="self-end" 
                            onClick={() => {
                              setAddAgents((prevAgents) => prevAgents.filter((removeAgent) => removeAgent.AgentId !== agent.AgentId))
                            }} />
                          <h1 className="font-bold capitalize">{agent.AgentFullName}</h1>
                          <div className="flex gap-2 mt-2">
                            <h1>Sharing % <input type="number" value={ Math.floor(100 / (AddAgents.length + 1)) }
                              onChange={(e) => {Number(e.target.value) > 100 ? (e.target.value = '100' , agent.AgentShare = 100) : (e.target.value = e.target.value, agent.AgentShare = Number(e.target.value))}}
                              className="outline-none p-2 border-[1px] w-[70px] border-sky-200 focus:border-sky-500" /></h1>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                :
                  <h1 className="border-[1px] p-3 text-center font-bold">None selected</h1>
              }

              <div className="mt-3 flex flex-col">
                <label htmlFor="tagAgent">Add an agent</label>
                <div className="flex gap-2 mt-2">
                  <input type="text" id="tagAgent" list="agentList" placeholder="Type to search an agent"
                    className="outline-none p-3 border-[1px] border-sky-200 focus:border-sky-500 w-full" value={captureValue} onChange={(e) => {
                      setcaptureValue(e.target.value)
                    }} />
                    <h1 className="px-6 bg-green font-bold text-white cursor-pointer items-center justify-center flex"
                      onClick={() => {
                        TagAgents.forEach((agent) => {
                          if(agent.AgentFullName == captureValue){
                            AddAgents.every((checkagent) => checkagent.AgentFullName !== captureValue) ?
                            setAddAgents((prevAgents) => [...prevAgents, agent]) : ''
                            setcaptureValue('')
                          }
                        })
                      }}
                    >ADD</h1>
                </div>
                <datalist id="agentList">
                  {
                    TagAgents?.map((agent, index) => (
                      <option key={index} value={agent.AgentFullName} ></option>
                    ))
                  }
                </datalist>
              </div>
            </div>
          </div>

          <div className="property_section_right w-[22%] mx-3 shadow-md rounded-md p-6 h-[35%] md:w-[55%] max-sm:w-full max-sm:m-auto">
            <div className="property_section_header flex justify-between items-center mb-6">
              <h2 className="text-gray-500 text-xl font-medium">
                Add Property Price
              </h2>
            </div>

            <p className="text-center my-3 text-sm">
              <i>How much is this property?</i>
            </p>

            <div className="legal_fees my-3">
              <div className="legal_fees_upper">
                <h3 className="text-gray-500 font-medium mb-1">Property Price</h3>
                <input
                  type="number"
                  required
                  value={HPPrice > 0 ? HPPrice : ""}
                  placeholder="N250,000.00"
                  onChange={(e) => {
                    setHPPrice(Number(e.target.value)),
                      setminTotalamount(MinAgencyFee + HPCautionFee + HPSecurityFee + legalFee + Number(e.target.value)),
                      setmaxTotalamount(MaxAgencyFee + HPCautionFee + HPSecurityFee + legalFee + Number(e.target.value));
                  }}
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
            </div>

            <div className="max_agency_fee my-3">
              <div className="agency_fee_upper flex justify-between">
                <h3 className="text-gray-500 font-medium">
                  Maximum Agency Fee
                </h3>
              </div>
              <div className="agency_fee_lower">
                <input
                  type="number"
                  placeholder="N15,000.00"
                  value={MaxAgencyFee > 0 ? MaxAgencyFee : ""}
                  onChange={(e) => {
                    setmaxAgencyFee(Number(e.target.value)),
                    setmaxTotalamount(Number(e.target.value) + HPPrice )
                  }}
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
            </div>

            <div className="max_agency_fee my-3">
              <div className="agency_fee_upper flex justify-between">
                <h3 className="text-gray-500 font-medium">
                  Minimum Agency Fee
                </h3>
              </div>
              <div className="agency_fee_lower">
                <input
                  type="number"
                  value={MinAgencyFee > 0 ? MinAgencyFee : ""}
                  placeholder="N5,000.00"
                  onChange={(e) => {
                    setminAgencyFee(
                      Number(e.target.value) > MaxAgencyFee
                        ? MaxAgencyFee > 0
                          ? MaxAgencyFee - 1
                          : 0
                        : Number(e.target.value)
                    ),
                      setminTotalamount(
                        MaxAgencyFee > 0
                          ? Number(e.target.value) > MaxAgencyFee
                            ? HPPrice + MaxAgencyFee - 1
                            : Number(e.target.value) + HPPrice
                          : 0
                      );
                  }}
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
            </div>

            <div className="max_agency_fee my-3">
              <div className="agency_fee_upper flex justify-between">
                <h3 className="text-gray-500 font-medium">
                  Caution Fee
                </h3>
              </div>
              <div className="agency_fee_lower">
                <input
                  type="number"
                  value={HPCautionFee > 0 ? HPCautionFee : ""}
                  placeholder="N5,000.00"
                  onChange={(e) => {
                    setHPCautionFee( Number(e.target.value) ),
                      setminTotalamount(MinAgencyFee + HPPrice + HPSecurityFee + legalFee + Number(e.target.value)),
                      setmaxTotalamount(MaxAgencyFee + HPPrice + HPSecurityFee + legalFee + Number(e.target.value));
                    
                  }}
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
            </div>

            <div className="max_agency_fee my-3">
              <div className="agency_fee_upper flex justify-between">
                <h3 className="text-gray-500 font-medium">
                  Security Fee
                </h3>
              </div>
              <div className="agency_fee_lower">
                <input
                  type="number"
                  value={HPSecurityFee > 0 ? HPSecurityFee : ""}
                  placeholder="N5,000.00"
                  onChange={(e) => {
                    setHPSecurityFee( Number(e.target.value) ),
                      setminTotalamount(MinAgencyFee + HPCautionFee + HPPrice + legalFee + Number(e.target.value)),
                      setmaxTotalamount(MaxAgencyFee + HPCautionFee + HPPrice + legalFee + Number(e.target.value));
                  
                  }}
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
            </div>

            <div className="max_agency_fee my-3">
              <div className="agency_fee_upper flex justify-between">
                <h3 className="text-gray-500 font-medium">
                  Legal Fee
                </h3>
              </div>
              <div className="agency_fee_lower">
                <input
                  type="number"
                  placeholder="N5,000.00"
                  value={legalFee > 0 ? legalFee : ""}
                  onChange={(e) => {
                    setlegalFee( Number(e.target.value) ),
                      setminTotalamount(MinAgencyFee + HPCautionFee + HPSecurityFee + HPPrice + Number(e.target.value)),
                      setmaxTotalamount(MaxAgencyFee + HPCautionFee + HPSecurityFee + HPPrice + Number(e.target.value));
                  
                  }}
                  className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
                />
              </div>
            </div>

            <hr />

            <div className="total_amount flex justify-between">
              <p>Total amount:</p>
              <p className="text-gray-300 font-semibold">
                N{MintotalAmount.toLocaleString()}-N
                {MaxtotalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col justify-center items-center my-6">
          <h1 className="text-green text-2xl max-sm:text-lg font-extrabold text-center h-[30px] mb-3">
            {message}
          </h1>
          <button disabled={loading} type="submit" className={`${loading ? 'submit_button py-3 shadow-lg opacity-70 rounded-full w-1/3 text-white text-center max-sm:w-[60%] max-sm:px-6' : 'submit_button py-3 shadow-lg hover:opacity-90 rounded-full w-1/3 text-white text-center max-sm:w-[60%] max-sm:px-6'}`} >
            {!loading ? "UPLOAD PROPERTY" : "LOADING..."}
          </button>
        </div>
      </form>
    </div>
   : (
    <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl">
        Error 401:
        <br /> Unauthorized!
      </h1>
    </div>
  );
};

export default Page;
