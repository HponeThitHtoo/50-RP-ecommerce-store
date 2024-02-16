import React from 'react';
import { MdDeliveryDining, MdPayment } from 'react-icons/md';
import { IoIosPricetag } from 'react-icons/io';
import { HiReceiptRefund } from 'react-icons/hi';

function AboutSection() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-y-3 md:gap-x-4 :gap-x-5 px-8 2xl:px-48 py-11 bg-darkBackGround text-white">
      <div className="flex items-center gap-x-3 md:w-1/4">
        <MdDeliveryDining className="text-3xl" />
        <div>
          <h4 className="font-oswald text-base font-semibold">
            Quick Delivery
          </h4>
          <p className="font-sourceSansPro text-sm text-gray-300">
            deliver within a week
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-3 md:w-1/4">
        <MdPayment className="text-3xl" />
        <div>
          <h4 className="font-oswald text-base font-semibold">
            Online Payment
          </h4>
          <p className="font-sourceSansPro text-sm text-gray-300">
            accept online payment
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-3 md:w-1/4">
        <IoIosPricetag className="text-3xl" />
        <div>
          <h4 className="font-oswald text-base font-semibold">Right Price</h4>
          <p className="font-sourceSansPro text-sm text-gray-300">
            grantee for price
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-3 md:w-1/4">
        <HiReceiptRefund className="text-3xl" />
        <div>
          <h4 className="font-oswald text-base font-semibold">Refund</h4>
          <p className="font-sourceSansPro text-sm text-gray-300">
            refund within a week
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
