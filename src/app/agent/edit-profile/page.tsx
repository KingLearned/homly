"use client";
import { api, getToken, getUser } from "@/app/shared";
import { agentInterface, userInterface } from "@/app/shared/definedTypes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const Features = [
  "Fitted Kitchen with accessories",
  "Secure Estate",
  "Modern Day POP Ceiling",
  "Green Area",
  "Detailed finishing",
  "Pendant lighting & Chandeliers",
  "Wardrobes",
  "TV Console",
  "Water heater",
  "Swimming pool",
  "Heat extractor",
  "CCtv Camera",
  "Close proximity to road",
  "Internet access",
  "Conducive Environment",
  "Close to central market",
  "Adequate Security",
  "Quiet Surrounding",
];

const Page = () => {
  const router = useRouter();
  const currentUser: userInterface = getUser();

  const [agentData, setAgentData] = useState<agentInterface | undefined>(undefined);

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [passMessage, setpassMessage] = useState("");
  const [HMFirstname, setHMFirstname] = useState("");
  const [HMLastname, setHMLastname] = useState("");
  const [HMEmail, setHMEmail] = useState("");
  const [HMUsername, setHMUsername] = useState("");
  const [HMImage, setHMImage] = useState("");
  const [uploadImage, setUploadImage] = useState<any>();
  const [HMPhone, setHMPhone] = useState("");
  const [HMPhone2, setHMPhone2] = useState("");
  const [HMAccountNo, setHMAccountNo] = useState('')
  const [HMAccountName, setHMAccountName] = useState('')
  const [HMBankName, setHMBankName] = useState('')
  const [HMState, setHMState] = useState("");
  const [HMCity, setHMCity] = useState("");
  const [HMProfession, setHMProfession] = useState("");
  const [HMEducation, setHMEducation] = useState("");
  const [HMLikes, setHMLikes] = useState("");

  const [HMAge, setHMAge] = useState('')
  const [HMBiography, setHMBio] = useState('')
  const [HMEthinicity, setHMEthinicity] = useState('')
  const [HMGender, setHMGender] = useState('')
  const [HMNationality, setHMNationality] = useState('')
  const [HMOccupation, setHMOccupation] = useState('')
  const [HMPets, setHMPets] = useState('')
  const [HMRelationshipStatus, setHMRelationshipStatus] = useState('')
  const [HMReligion, setHMReligion] = useState('')
  const [HMSchool, setHMSchool] = useState('')

  const [HMPass, setHMPass] = useState("");
  const [CHMPass, setCHMPass] = useState("");

  const [selectedFeature, setSelectFeature] = useState(
    new Array(Features.length).fill(false)
  );

  const [previewImage, setPreviewImage] = useState<any>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      setUploadImage(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSFeature = (index: number) => {
    const newSelectedFeatures = [...selectedFeature];
    newSelectedFeatures[index] = !newSelectedFeatures[index];
    setSelectFeature(newSelectedFeatures);
  };

  useEffect(() => {
    !currentUser?.HMFirstname ? router.push("/") : "";
    const fetchData = async () => {
      try {
        const headers = { Authorization: getToken() ? getToken() : "" };
        const response = await axios.get(`${api}users/agent`, { headers });
        const data = response.data;

        setHMFirstname(data.agent.HMFirstname);
        setHMLastname(data.agent.HMLastname);
        setHMEmail(data.agent.HMEmail);
        setHMUsername(data.agent.HMUsername);
        setHMImage(data.agent.HMImage);
        setHMPhone(data.agent.HMPhone);
        setHMPhone2(data.agent.HMPhone2);
        setHMAccountNo(data.agent.HMAccountNo)
        setHMAccountName(data.agent.HMAccountName)
        setHMBankName(data.agent.HMBankName)
        setHMState(data.agent.HMState);
        setHMCity(data.agent.HMCity);
        setHMProfession(data.agent.HMProfession);
        setHMEducation(data.agent.HMEducation);
        setHMLikes(data.agent.HMLikes);
        setHMAge(data.agent.HMAge)
        setHMBio(data.agent.HMBiography)
        setHMEthinicity(data.agent.HMEthinicity)
        setHMGender(data.agent.HMGender)
        setHMNationality(data.agent.HMNationality)
        setHMOccupation(data.agent.HMOccupation)
        setHMPets(data.agent.HMPets)
        setHMRelationshipStatus(data.agent.HMRelationshipStatus)
        setHMReligion(data.agent.HMReligion)
        setHMSchool(data.agent.HMSchool)

        setStatus(data.success);

      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    fetchData();
  }, [])

  const submitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const uploadUpdate = async (profileImage: string) => {
        profileImage = !profileImage ? HMImage : profileImage  
        const headers = { Authorization: getToken() ? getToken() : "" };
        const response = await axios.post(
          `${api}users/agent/update-profile`,
          {
            HMAge,
            HMBiography,
            HMEthinicity,
            HMGender,
            HMNationality,
            HMOccupation,
            HMPets,
            HMRelationshipStatus,
            HMReligion,
            HMSchool,
            HMFirstname,
            HMLastname,
            profileImage,
            HMPhone,
            HMPhone2,
            HMAccountNo,
            HMAccountName,
            HMBankName,
            HMState,
            HMCity,
            HMProfession,
            HMEducation,
            HMLikes,
          },
          { headers }
        );
        if (response.data.success) {
          setMessage(response.data.message);
          // alert(response.data.message)
          setTimeout(() => {
           setMessage(""); router.push(`/agent/profile/${currentUser.HMId}`)
          }, 1000);
          
        } else {
          setMessage(response.data.message);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      };

      const formData = new FormData();
      formData.append(`file`, uploadImage);
      const requestOptions: any = {
        method: "POST",
        body: formData,
        redirect: "follow",
      }

      if(uploadImage){
        fetch("https://imageupload.eaxyget.com/upload", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            uploadUpdate(result.image_link);
          })
          .catch((error) => console.log(error));
      }else{
        uploadUpdate('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (HMPass == CHMPass) {
      try {
        const headers = { Authorization: getToken() ? getToken() : "" };
        const response = await axios.post(
          `${api}users/agent/update-password`,
          { HMPass },
          { headers }
        );
        if (response.data.status) {
          setpassMessage(response.data.message);
          setTimeout(() => {
            setpassMessage("");
          }, 3000);
        } else {
          setpassMessage(response.data.message);
          setTimeout(() => {
            setpassMessage("");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setpassMessage("Inputed password do not match");
      setTimeout(() => {
        setpassMessage("");
      }, 3000);
    }
  };

  return status == null ? (
    <div className="p-12 max-sm:px-4 h-[90vh] flex flex-col items-center justify-center">
      {status == null ? (
        <Image src="/Spin-1s-200px.svg" alt="" width={40} height={40} className="max-sm:w-1/2" />
      ) : (
        <h1 className="text-center text-3xl">
          Error 401:
          <br /> Unauthorized, Invalid authentication token!
        </h1>
      )}
    </div>
  ) : status == true && (
    <div className="px-14 max-sm:px-6 w-full my-5">
      <div className="property_section_header flex gap-2">
        <Image
          src="/description_symbol.png"
          alt="property"
          width={20}
          height={20}
        />
        <h2 className="text-xl font-medium">Edit your profile details</h2>
      </div>
      <form className="mt-5" onSubmit={submitUpdate}>
        <div className="upload_images_container flex flex-col items-center justify-center">
          <div className="upload_image_left relative overflow-hidden w-[300px] h-[300px] max-sm:h-[200px] max-sm:w-[200px] flex items-center rounded-full justify-center">
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={(e) => {
                handleImageChange(e);
              }}
              className="hidden"
            />
            <label
              htmlFor="profileImage"
              className="upload_image absolute w-[max-content]"
            >
              <Image src="/camera.png" alt="" width={40} height={40} />
            </label>
            {previewImage && (
              <Image
                src={previewImage}
                alt="property"
                className="w-full h-full object-fill"
                width={40}
                height={40}
              />
            )}
          </div>
          <h2 className="text-xl font-[900]">Change profile picture</h2>
        </div>

        <div className="w-full">
          <div className="flex max-md:flex-col my-4">
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">First name</label>
              <input
                type="textarea"
                placeholder="First name"
                value={HMFirstname}
                onChange={(e) => {setHMFirstname(e.target.value)}}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Last name</label>
              <input
                type="textarea"
                placeholder="Last name"
                value={HMLastname}
                onChange={(e) => {
                  setHMLastname(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Username</label>
              <h1 className="mt-1 w-full h-[3rem] px-2 py-3 bg-sky-200 border-[1px]">
                @{HMUsername}
              </h1>
            </div>
          </div>
          <div className="flex max-md:flex-col my-4">
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Location / Area</label>
              <input
                type="textarea"
                placeholder="Eg. Port Harcourt, Abuja, Lagos"
                value={HMState}
                onChange={(e) => {
                  setHMState(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Road / Stree</label>
              <input
                type="textarea"
                placeholder="Eg. KM-4 Ikot-Ekpene Rd, Plot 4 Johnson Avenue."
                value={HMCity}
                onChange={(e) => {
                  setHMCity(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
          </div>
          <div className="flex max-md:flex-col my-4">
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Mobile 1 (WhatsApp)</label>
              <input
                type="textarea"
                placeholder="Eg. +23400000000000"
                value={HMPhone}
                onChange={(e) => {
                  setHMPhone(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Mobile 2</label>
              <input
                type="textarea"
                placeholder="Eg. +23400000000000"
                value={HMPhone2}
                onChange={(e) => {
                  setHMPhone2(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Email</label>
              <h1 className="mt-1 w-full h-[3rem] px-2 py-3 bg-sky-200 border-[1px]">
                {HMEmail}
              </h1>
            </div>
          </div>
          <div className="flex max-md:flex-col my-4">
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Bank Account No</label>
              <input
                type="textarea"
                placeholder="Eg. 0087796518"
                value={HMAccountNo}
                onChange={(e) => {
                  setHMAccountNo(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Bank Account Name</label>
              <input
                type="textarea"
                placeholder="Eg. George Andrew"
                value={HMAccountName}
                onChange={(e) => {
                  setHMAccountName(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Bank Name</label>
              <input
                type="textarea"
                placeholder="Eg. UBA"
                value={HMBankName}
                onChange={(e) => {
                  setHMBankName(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
          </div>

          <hr />

          <div className="flex max-md:flex-col my-4">
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Age</label>
              <input
                type="textarea"
                placeholder="55, 33"
                value={HMAge}
                onChange={(e) => {setHMAge(e.target.value)}}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Gender</label>
              <input
                type="textarea"
                placeholder="male, female"
                value={HMGender}
                onChange={(e) => {
                  setHMGender(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Relationship status</label>
              <input
                type="textarea"
                placeholder="single, married"
                value={HMRelationshipStatus}
                onChange={(e) => {
                  setHMRelationshipStatus(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Ethnicity</label>
              <input
                type="textarea"
                placeholder="single, married"
                value={HMEthinicity}
                onChange={(e) => {
                  setHMEthinicity(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
          </div>
          <div className="flex max-md:flex-col my-4">
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Nationality</label>
              <input
                type="textarea"
                placeholder="Nigerian, American"
                value={HMNationality}
                onChange={(e) => {setHMNationality(e.target.value)}}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Religion</label>
              <input
                type="textarea"
                placeholder="Christian, Budahhism"
                value={HMReligion}
                onChange={(e) => {
                  setHMReligion(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Pet</label>
              <input
                type="textarea"
                placeholder="dog, cat"
                value={HMPets}
                onChange={(e) => {
                  setHMPets(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
          </div>
          <div className="flex max-md:flex-col my-4">
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">Occupation</label>
              <input
                type="textarea"
                placeholder="Engineer, Doctor"
                value={HMOccupation}
                onChange={(e) => {setHMOccupation(e.target.value)}}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
            <div className="mb-3 w-full mr-3">
              <label className="text-bold">School / Work</label>
              <input
                type="textarea"
                placeholder="Bank, Futo"
                value={HMSchool}
                onChange={(e) => {
                  setHMSchool(e.target.value);
                }}
                className="mt-1 w-full h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
              />
            </div>
          </div>

          <hr />

          <div className="tell_us my-4">
            <h1 className="text-bold">My Biograph:</h1>
            <textarea
              placeholder="Write some short description about your eduacational history..."
              value={HMBiography}
              onChange={(e) => {
                setHMBio(e.target.value);
              }}
              className="outline-none p-3 mt-2 h-[300px] resize-none w-full border-[1px] border-sky-200 focus:border-sky-500"
            >
              
            </textarea>
          </div>
          <div className="tell_us my-4">
            <h1 className="text-bold">Educational Background:</h1>
            <textarea
              placeholder="Write some short description about your eduacational history..."
              value={HMEducation}
              onChange={(e) => {
                setHMEducation(e.target.value);
              }}
              className="outline-none p-3 mt-2 h-[300px] resize-none w-full border-[1px] border-sky-200 focus:border-sky-500"
            >
              
            </textarea>
          </div>
          <div className="tell_us my-4">
            <h1 className="text-bold">Professional Achievements:</h1>
            <textarea
              placeholder="Write some short description about your professional history..."
              onChange={(e) => {
                setHMProfession(e.target.value);
              }}
              value={HMProfession}
              className="outline-none p-3 mt-2 h-[300px] resize-none w-full border-[1px] border-sky-200 focus:border-sky-500"
            >
            </textarea>
          </div>
          <div className="tell_us my-4">
            <h1 className="text-bold">Likes & Dislikes:</h1>
            <textarea
              placeholder="What do you like and dislike..."
              value={HMLikes}
              onChange={(e) => {
                setHMLikes(e.target.value);
              }}
              className="outline-none p-3 mt-2 h-[300px] resize-none w-full border-[1px] border-sky-200 focus:border-sky-500"
            >
            </textarea>
          </div>

          <hr />
        </div>

        <div className="flex justify-center max-sm:w-full w-1/4">
          <button
            type="submit"
            className="submit_button my-6 mx-3 py-3 shadow-lg hover:opacity-90 rounded-md w-full text-white text-center"
          >
            Update Profile
          </button>
        </div>
        <h1 className="ml-3 text-green text-2xl max-sm:text-sm font-extrabold max-sm:text-center">
          {message}
        </h1>
      </form>
      {/* CHANCGE PASSWORD */}
      <form className="mt-5 border-[1px] p-4" onSubmit={updatePassword}>
        <h2 className="text-xl font-medium">CHANGE YOUR PASSWORD:</h2>
        <div className="flex max-md:flex-col my-4">

          <div className="mb-3 w-full mr-3">
            <label className="text-bold">New password</label>
            <input
              type="password"
              required
              onChange={(e) => {
                setHMPass(e.target.value);
              }}
              className="mt-1 w-full text-xl h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
            />
          </div>
          <div className="mb-3 w-full mr-3">
            <label className="text-bold">Comfirm password</label>
            <input
              type="password"
              required
              onChange={(e) => {
                setCHMPass(e.target.value);
              }}
              className="mt-1 w-full text-xl h-[3rem] px-2 py-3 border-sky-200 focus:border-sky-500 outline-none border-[1px]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="submit_button my-6 w-1/4 py-3 shadow-lg hover:opacity-90 rounded-md max-sm:w-full text-white text-center"
        >
          Update password
        </button>
        <h1 className="text-green text-2xl font-extrabold max-sm:text-sm max-sm:text-center">
          {passMessage}
        </h1>
      </form>
    </div>
  );
};

export default Page;
