"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { EditableUserComponent } from "@/components/RoommateComponents/EditableUserComponent/index";
import Textarea from "@/components/RoommateComponents/EditableUserComponent/textarea";
import { updateFieldsFromPayload } from "@/app/redux/room_mate";
import { FieldType, RoommateType } from "@/app/types";
import { api, getToken, getUser } from "@/app/shared";
import { useRouter } from "next/navigation";
import EditButton from "@/components/RoommateComponents/EditButton";
import {
  BiSolidGraduation,
  BiBriefcase,
  BiLike,
  BiDislike,
  BiCheckShield,
  BiCamera,
} from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { switchFormsAction } from "@/app/redux/form";
import { modalAction } from "@/app/redux/modal";
import Warning from "@/components/Message/Warning";
import MessageText from "@/components/Message/MessageText";

const ProfilePage = ({ params }: { params: { roommateId: string } }) => {
  const { roommateId } = params;
  const userId = decodeURIComponent(roommateId);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChat, setisChat] = useState(false);

  const currentUser = getUser();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<RoommateType>();
  const [editBio, setEditBio] = useState(false);
  const [editDetails, setEditDetails] = useState(false);

  const [HMBiography, setBio] = useState<string>();
  const [HMEducation, setEducation] = useState<string>();
  const [HMProfession, setProfession] = useState<string>();
  const [HMLike, setLike] = useState<string>();
  const [HMDisLike, setDisLike] = useState<string>();
  const [image, setImage] = useState<any>();
  const [imagePreview, setImagePreview] = useState<string | "">(
    profile?.HMImage || ""
  );

  const updateBio = () => (!editBio ? setEditBio(true) : setEditBio(false));
  const { data } = useSelector((action: RootState) => action.room_mate);

  const updateDetails = () =>
    !editDetails ? setEditDetails(true) : setEditDetails(false);

  interface RootState {
    room_mate: {
      data: FieldType[];
    };
  }

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setEditBio(false);
    setEditDetails(false);

    var formdata = new FormData();
    formdata.append("file", image);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow" as RequestRedirect,
    };
    const UPDATEROOMMATE = async (profileImage: any) => {
      const response = await axios.post(
        `${api}users/update/roommate`,
        {
          HMImage: profileImage || "",
          HMEthinicity: data[0].value,
          HMNationality: data[1].value,
          HMReligion: data[2].value,
          HMRelationshipStatus: data[3].value,
          HMAge: data[4].value,
          HMGender: data[5].value,
          HMOccupation: data[6].value,
          HMSchool_workplace: data[7].value,
          HMPets: data[8].value,
          HMSocialHandle: data[9].value,
          HMPhone: data[10].value,
          HMAccountNo: data[11].value,
          HMAccountName: data[12].value,
          HMBankName: data[13].value,
          HMBio: HMBiography || profile?.HMBio,
          HMEducation: HMEducation || profile?.HMEducation,
          HMProfession: HMProfession || profile?.HMProfession,
          HMLikes: HMLike || profile?.HMLikes,
          HMDislike: HMDisLike || profile?.HMDislikes,
        },
        {
          headers: {
            Authorization: getToken() ? getToken() : "",
          },
        }
      );
      setLoading(false);
      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 3000);
    };
    if (image) {
      fetch("https://imageupload.eaxyget.com/upload", requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status == 200) {
            UPDATEROOMMATE(result.image_link);
          }
        })
        .catch((error) => {
          setLoading(false);
          alert("Something went wrong please try again");
        });
    } else {
      UPDATEROOMMATE(profile?.HMImage);
    }
  };

  const viewPost = () => {
    axios.get(`${api}roommate/singleRoom/${profile?.HMId}`).then((result) => {
      if (result.data.result.roommate_id) {
        return router.push(
          `/roommate/single/${result.data.result.roommate_id}`
        );
      }
      router.push("/roommate/upload/new_post");
    });
  };

  const verifyAccount = async () => {
    if (userId) {
      setLoading(true);
      await axios.post(`${api}users/resendMail/${userId}`);
      router.push(`/verification/${userId}`);
    }
  };
  useEffect(() => {
    const headers = { headers: { Authorization: getToken() } };

    axios
      .get(`${api}users/getRoomMateById/${userId}`, headers)
      .then((result) => {
        if (result.data && result.data.user.HMType == "RO") {
          setProfile(result.data.user);
          dispatch(updateFieldsFromPayload(result.data.user));
        } else {
          return router.push("/");
        }
      });
  }, [dispatch, router, userId]);

  const communicateAgent = () => {
    if (getUser() == null) {
      setisChat(false);
      dispatch(switchFormsAction("login"));
      dispatch(modalAction(true));
    } else {
      const message = MessageText(
        profile?.HMFirstname || "",
        "Posted property",
        profile?.HMPhone || ""
      );
      router.push(message);
    }
  };
  return (
    <>
      <div className="py-5 md:py-0">
        <div className="flex flex-wrap gap-5 px-2 lg:px-10 lg:py-10 md:flex-nowrap">
          <form className="w-full md:w-1/2 px-3">
            <div className="upload_images_container1 flex flex-col items-center justify-center">
              <b className="mb-6 capitalize text-xl">My Profile Details</b>

              <div className="w-[200px] h-[200px] relative">
                <div className="w-full h-full absolute top-0 left-0 rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview || profile?.HMImage || ""}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full object-fill rounded-full"
                  />
                </div>
                <div className="w-[88%] h-[88%] absolute top-0 left-0 rounded-full flex justify-end items-end">
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={(e) => handleImage(e)}
                    className="hidden"
                  />
                  {currentUser?.HMId == userId && (
                    <label
                      htmlFor="profileImage"
                      className="-m-[10px] bg-neutral-600 rounded-full p-2 text-white cursor-pointer"
                    >
                      <BiCamera size={24} />
                    </label>
                  )}
                </div>
              </div>
              <div className="text-center my-5">
                <h2 className="capitalize text-xl font-bold">
                  {profile && profile?.HMFirstname}{" "}
                  {profile && profile?.HMLastname}
                </h2>
                <p>{profile && profile?.HMEmail}</p>
                {currentUser?.HMId == userId && (
                  <button
                    type="button"
                    onClick={viewPost}
                    className="font-bold text-green bg-light-green rounded py-1 px-2 mt-3 hover:opacity-65"
                  >
                    View Post
                  </button>
                )}
              </div>
            </div>

            <div className="border-b border-neutral-200 mx-auto mt-1 mb-10"></div>
            {profile && profile?.HMIsverified !== "Y" ? (
              <div
                className={
                  currentUser?.HMId == userId
                    ? "flex justify-between items-center"
                    : "hidden"
                }
              >
                <div className="w-[150px] flex gap-2 items-center px-2 text-red-500 bg-light-green rounded">
                  <FaTimes size={20} color="red" />
                  <p>Not verified</p>
                </div>
                <button
                  type="button"
                  className="border-b pb-2 text-green font-bold hover:opacity-65"
                  onClick={verifyAccount}
                >
                  Verify Account
                </button>
              </div>
            ) : (
              <div
                className={
                  currentUser?.HMId == userId
                    ? "w-[120px] flex gap-2 items-center px-2 bg-light-green text-green rounded"
                    : "hidden"
                }
              >
                <BiCheckShield size={20} />
                <p>Verified</p>
              </div>
            )}

            {/* -----------------Input Fields-----------------*/}
            <EditableUserComponent
              user_type={profile && profile?.HMType}
              ownerId={userId}
            />
          </form>

          <div className="w-full md:w-2/2 bg-green text-white px-3 pt-10 md:px-10">
            {/*------------------------Biography------------------------*/}
            <div>
              {currentUser?.HMId == userId && (
                <div className="flex justify-end">
                  <EditButton onclick={updateBio} />
                </div>
              )}
              <div className="flex flex-col gap-3 border-b pb-8">
                <Textarea
                  setEdit={editBio}
                  title="My Biography"
                  body={HMBiography || profile?.HMBio}
                  onchange={(e: any) => setBio(e.target.value)}
                />
              </div>
            </div>

            {/*------------------------Presonal Details------------------------*/}
            <div className="mt-10">
              {currentUser.HMId == userId && (
                <div className="flex justify-end mb-2">
                  <EditButton onclick={updateDetails} />
                </div>
              )}

              <div className="flex flex-col gap-5">
                <Textarea
                  setEdit={editDetails}
                  title="Educational Background"
                  body={HMEducation || profile?.HMEducation}
                  onchange={(e: any) => setEducation(e.target.value)}
                  icon={<BiSolidGraduation size={50} className="text-white" />}
                />
                <Textarea
                  setEdit={editDetails}
                  title="Profession Achievment"
                  body={HMProfession || profile?.HMProfession}
                  onchange={(e: any) => setProfession(e.target.value)}
                  icon={<BiBriefcase size={50} className="text-white" />}
                />
                <Textarea
                  setEdit={editDetails}
                  title="Likes"
                  body={HMLike || profile?.HMLikes}
                  onchange={(e: any) => setLike(e.target.value)}
                  icon={<BiLike size={50} className="text-white" />}
                />
                <Textarea
                  setEdit={editDetails}
                  title="Dislike"
                  body={HMDisLike || profile?.HMDislikes}
                  onchange={(e: any) => setDisLike(e.target.value)}
                  icon={<BiDislike size={50} className="text-white" />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-5 px-5 pb-5 md:px-10">
          {currentUser?.HMId != userId ? (
            <button
              onClick={() => setisChat(true)}
              className="md:w-[200px] py-2 px-5 bg-green rounded text-white"
            >
              Chat
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              onClick={(e: any) => handleUpdate(e)}
              className={
                !loading
                  ? "bg-green w-full py-5 shadow-lg hover:opacity-90 rounded font-bold border  text-white text-center md:py-3 md:w-[200px]"
                  : "bg-green w-full opacity-30 py-5 shadow-lg hover:opacity-90 rounded font-bold border  text-white text-center md:py-3 md:w-[200px]"
              }
            >
              {!loading ? "Update Profile" : "Loading..."}
            </button>
          )}

          <h2 className="text-green uppercase max-sm:text-sm font-extrabold max-sm:text-center">
            {message}
          </h2>
        </div>
      </div>
      {/*---------------------Warning message---------------------*/}
      {isChat && (
        <Warning
          closeWarning={() => setisChat(false)}
          chatFunction={communicateAgent}
          paymentFunction={() => alert("coming soon")}
        />
      )}
    </>
  );
};

export default ProfilePage;
