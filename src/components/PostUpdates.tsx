"use client";

import { countryStates, getUser, api, getToken, } from "@/app/shared";
import { userInterface } from "@/app/shared/definedTypes";
import axios from "axios";
import { switchFormsAction } from "@/app/redux/form";
import { modalAction } from "@/app/redux/modal";
import { useDispatch } from "react-redux";
import { useState } from "react";


const PostUpdates = () => {


    const dispatch = useDispatch();

    const [HUContent, setHUContent] = useState('')
    const [HUCategory, setHUCategory] = useState('Luxury')
    const [HULocation, setHULocation] = useState('Abia')

    const postUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentUser: userInterface = getUser();
        
        if(!currentUser?.HMId){
            dispatch(switchFormsAction("login"));
            dispatch(modalAction(true));
        }else if (currentUser?.HMType == "RO") {
            try {
                
              const headers = { Authorization: getToken() ? getToken() : "" };
              const response = await axios.post(
                `${api}properties/post-updates`,
                { HUContent, HUCategory, HULocation },
                { headers }
              );
    
              const data = response.data
              alert(data.message)
              setHUContent('')

              window.location.reload();
              
            } catch (error) {
              console.error("Error Messgae:", error);
            }
        }else{
            alert("Agents can't make a request!")
        }
      };

    return (
        <form onSubmit={postUpdate} className="max-sm:flex-col flex w-1/2 max-sm:w-full mx-auto max-sm:px-3 max-sm:mt-10">
            <div className="flex max-sm:flex-col  p-2 w-full  border border-green bg-white max-sm:rounded-md rounded-full shadow-md">
                <input  type="text" className="w-full px-4 py-2 rounded-full focus:outline-none focus:border-green-700" required
                    placeholder="Make a post of the apartment you are looking for..." value={HUContent.length < 81 ? HUContent : HUContent.slice(0,80)} 
                    onChange={(e) => { setHUContent(e.target.value.length < 81 ? e.target.value : HUContent), e.target.value.length > 80 && alert("Only character length of 80 is allowed!") }}
                />

                <div className="max-sm:flex flex w-full">
                    <select 
                        onChange={(e) => setHUCategory(e.target.value)}
                        className="w-full  text-center max-sm:mx-0 mx-3 max-sm:text-sm max-sm:py-1.5  px-2 bg-emerald-200 border rounded-full focus:outline-none" >
                        <option value="luxury">Luxury</option>
                        <option value="flats">Flats</option>
                        <option value="single">Single</option>
                        <option value="others">Others</option>
                    </select>

                    <select 
                        onChange={(e) => setHULocation(e.target.value)}
                        className="w-full text-center max-sm:text-sm max-sm:py-1.5 px-2 bg-emerald-200 border rounded-full focus:outline-none">
                        {countryStates.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button 
                type="submit"
                className="w-1/5 max-sm:w-max max-sm:self-center max-sm:my-3 mx-3 max-sm:py-3 max-sm:px-5 border border-yellow-500 bg-green hover:opacity-80 text-white font-bold rounded-full shadow-md">
                Post
            </button>
        </form>
    )
}

export default PostUpdates;