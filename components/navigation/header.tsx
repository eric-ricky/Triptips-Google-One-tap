import Image from "next/image";
import React, { useState } from "react";
import { LogoutIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [showTip, setShowTip] = useState(false);

  return (
    <div className="pt-14 bg-slate-50">
      <div className="container mx-auto md:px-24 px-4 py-8 flex justify-between items-center">
        <div
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 cursor-pointer hover:underline"
        >
          <div className="p-2 bg-green-500 rounded-full">
            <OfficeBuildingIcon className="h-6" />
          </div>
          <h2 className="text-2xl font-black text-black">Triptips</h2>
        </div>

        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <p className="text-lg hidden md:flex font-bold underline">
                {user?.displayName}
              </p>
              <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md">
                <Image
                  src={`${
                    !user.photoURL ? "/images/trip-2.jpg" : user.photoURL
                  }`}
                  layout="fill"
                  objectFit="cover"
                  alt="user"
                />
              </div>

              <div
                onClick={async () => {
                  try {
                    console.log("singing out...");
                    await signOut(auth);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="cursor-pointer font-medium flex items-center space-x-2"
              >
                <LogoutIcon className="h-6" /> <span>Logout</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShowTip((initial) => !initial)}
              className="bg-black text-white py-2 px-6 rounded-full text-sm font-bold cursor-pointer hover:bg-slate-800 transition duration-200 relative"
            >
              Sign in
              {showTip && (
                <span className="bg-white text-black w-36 absolute top-10 md:left-4 right-8 z-50 shadow-md rounded-lg p-4">
                  tip: wait for the google one tap or refresh the page if it
                  doesn't appear
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
