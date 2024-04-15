"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { getToken, getUser, pages } from "@/app/shared";
import { switchFormsAction } from "@/app/redux/form/index";
import { modalAction } from "@/app/redux/modal";
import { useRouter } from "next/navigation";
import { userInterface } from "@/app/shared/definedTypes";

function Navbar({
  isLoggedIn,
  setLoggedIn,
}: {
  isLoggedIn: any;
  setLoggedIn: any;
}) {
  const router = useRouter();
  const currentUser: userInterface = getUser();

  if (currentUser) {
    setLoggedIn(true);
  }

  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("hidden");
    }
  };

  const swtchToLogin = () => {
    dispatch(switchFormsAction("login"));
    dispatch(modalAction(true));
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.clear();
    router.push("/");
  };

  const swtchToRegister = () => {
    dispatch(switchFormsAction("register"));
    dispatch(modalAction(true));
  };

  const navigate = () => {
    if (getUser()?.HMType == "A" || getUser()?.HMType == "RE") {
      router.push(`/agent/profile/${getUser().HMId}`);
    } else if (getUser()?.HMType == "RO") {
      router.push(`/roommate/profile/${getUser().HMId}`);
    }
  };

  const navUpload = () => {
    if (getUser()?.HMType == "A" || getUser()?.HMType == "RE") {
      router.push("/agent/property/upload");
    } else if (getUser()?.HMType == "RO") {
      router.push(`/roommate/upload/new_post`);
    }
  };

  return (
    <header className="w-screen px-4 py-4 sticky top-0 shadow-md bg-white z-[1000] text-sm capitalize lg:px-8">
      <nav className="container relative mx-auto flex items-center justify-between z-[1000]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            className="w-[100px] h-[30px]"
            width={100}
            height={30}
          />
        </Link>

        <div ref={menuRef} className="hidden lg:block">
          <div
            className="w-full absolute left-0 top-11 flex flex-col py-8 bg-white shadow 
          items-center gap-6 lg:relative lg:top-0 lg:flex-row lg:bg-transparent lg:shadow-none lg:w-auto lg:py-0"
          >
            {pages.map((page, index) => (
              <Link
                key={index}
                href={{
                  pathname: page.href == "/" ? "/" : `/${page.href}`,
                }}
                className="hover:text-deep-green hover:font-bold active:text-green duration-300 delay-75"
                onClick={toggleMobileMenu}
              >
                {page.title}
              </Link>
            ))}
            {isLoggedIn && getUser()?.HMType !== "RE" && (
              <button className="font-bold bg-deep-green text-white rounded px-5 py-3" onClick={navUpload}>
                UPLOAD
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-8 max-sm:gap-2">
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center">
                <button
                  onClick={navigate}
                  className="max-sm:mr-2 mr-4 text-deep-green font-bold"
                >
                  PROFILE
                </button>

                <button
                  className="p-2 rounded font-bold text-deep-green"
                  onClick={logOut}
                >
                  LOG OUT
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="p-2 hover:text-deep-green hover:font-bold"
                  onClick={swtchToLogin}
                >
                  LOG IN
                </button>
                <button
                  className="hidden p-2 lg:block hover:text-deep-green hover:font-bold"
                  onClick={swtchToRegister}
                >
                  REGISTER
                </button>
              </div>
            )}
          </div>

          <FaBars
            size={30}
            className="lg:hidden font-light"
            onClick={toggleMobileMenu}
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
