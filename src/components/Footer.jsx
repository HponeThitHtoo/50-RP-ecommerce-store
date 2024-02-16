import React from 'react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitter,
  FaPhone,
  FaMobile,
  FaEnvelope,
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="px-8 2xl:px-48 py-8 bg-darkBackGroundTwo font-sourceSansPro text-white">
      <div className="grid gap-y-4 md:grid-cols-3 md:gap-x-5">
        <address className="">
          <p>No(8), Shewdagon Pagoda Road</p>
          <p>(8) Ward, Bahan Township</p>
          <p>Yangon, Myanmar</p>
        </address>
        <div className="">
          <div className="flex items-center gap-x-3">
            <FaPhone className="text-primaryTwo" />
            <p>01 - 532876</p>
          </div>
          <div className="flex items-center gap-x-3">
            <FaMobile className="text-primaryTwo" />
            <p>09 - 726506053</p>
          </div>
          <div className="flex items-center gap-x-3">
            <FaEnvelope className="text-primaryTwo" />
            <p>agameshop@gmail.com</p>
          </div>
        </div>
        <div className="flex gap-x-3 md:justify-self-center">
          <FaFacebookSquare className="cursor-pointer hover:text-primaryOne" />
          <FaInstagramSquare className="cursor-pointer hover:text-primaryOne" />
          <FaTwitter className="cursor-pointer hover:text-primaryOne" />
        </div>
      </div>
      <div className="mt-5 overflow-hidden">
        <p className="animate-marqueeRightToLeft text-primaryTwo">
          AGameShop &copy;{new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
