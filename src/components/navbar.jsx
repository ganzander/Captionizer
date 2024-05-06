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
    <div className="flex bg-gradient-to-b from-[#a764ff] to-[#5e2fd5] justify-around border-b-2 border-white w-full py-4">
      <Link href="/" className="flex gap-1 justify-center items-center">
        <SparkleIcon />
        <span>EpicCaptions</span>
      </Link>
      <nav className="flex gap-6 text-white/80 justify-center items-center">
        <Link href="/">Home</Link>
        <Link href="/pricing">Pricing</Link>
        {status == "authenticated" ? (
          <div className="relative inline-block text-left">
            <img
              className=" rounded-full cursor-pointer"
              src={session.user.image}
              width={40}
              alt="image"
              onClick={toggleDropdown}
            />
            {isDropdownOpen ? (
              <div className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <Link
                  // href="/profile"
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
            {/* </div> */}
          </div>
        ) : (
          <button onClick={async () => router.push("/api/auth/signin")}>
            Signin
          </button>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
