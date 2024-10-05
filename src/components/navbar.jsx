"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SparkleIcon from "./sparkleIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { Auth } from "./auth";

function Navbar() {
  const { data: session, status, image } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex bg-black justify-evenly sm:justify-center border-white text-base sm:text-lg w-full py-4 h-[10vh]">
      <div className="flex justify-center items-center w-[40%] sm:w-[40%]">
        <Link
          href="/"
          className="flex gap-1 justify-center items-center text-white"
        >
          <SparkleIcon />
          <span>Captionizer</span>
        </Link>
      </div>

      <div className="flex items-center w-[60%] sm:w-[40%]">
        <div className="flex w-full text-white/80 justify-center gap-3 sm:gap-0 sm:justify-evenly items-center">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          {status == "authenticated" ? (
            <div className="relative inline-block text-left">
              <img
                className=" rounded-full cursor-pointer"
                src={session.user.image}
                width={30}
                alt="image"
                onClick={toggleDropdown}
              />
              {isDropdownOpen ? (
                <div className="z-[10] origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Your Videos
                  </Link>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={async () => await signOut()}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <button onClick={async () => router.push("/api/auth/signin")}>
              Signin
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
