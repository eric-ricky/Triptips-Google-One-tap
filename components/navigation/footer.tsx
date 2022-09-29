import { OfficeBuildingIcon } from "@heroicons/react/outline";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-10 bg-slate-50">
      <div className="container mx-auto px-16">
        <div className="flex items-center space-x-2 cursor-pointer hover:underline">
          {/* <GlobeIcon className="h-6" /> */}
          <div className="p-2 bg-green-500 rounded-full">
            <OfficeBuildingIcon className="h-6" />
          </div>
          <h2 className="text-2xl font-black text-black">Triptips</h2>
        </div>
        <div>
          &copy; {new Date().getFullYear()} Triptips LLC All rights reserved.{" "}
          <span className="underline font-medium cursor-pointer">
            Terms of Use
          </span>
        </div>
        {/* © 2022 Tripadvisor Privacy and Cookies StatementCookie */}
        {/* consentSite MapHow the site worksContact us */}
      </div>
    </footer>
  );
};

export default Footer;
