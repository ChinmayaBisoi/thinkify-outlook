import React, { useState } from "react";
import dateFormat, { masks } from "dateformat";

const ShortEmail = ({
  mail,
  selectedMailId,
  setSelectedMailId,
  allEmailData,
  setAllEmailData,
}: {
  mail: any;
  selectedMailId: any;
  setSelectedMailId: (x: boolean) => void;
  setAllEmailData: (x: any) => void;
  allEmailData: any;
}) => {
  const logo = mail.from?.name[0]?.toUpperCase();
  const name = mail.from.name;
  const fullEmail = "<" + mail.from.email + ">";
  const from = name + " " + fullEmail;
  const shortDesc = mail.short_description;
  const subject = mail.subject;

  const isFavorite =
    allEmailData.filter((item: any) => {
      return item.isFavorite && item.id === mail.id;
    }).length > 0;
  const mailDate = dateFormat(mail.date, "dd/mm/yy");
  const mailTime = dateFormat(mail.date, "h:MM TT");
  const isRead =
    allEmailData.filter((item: any) => {
      return item.isRead && item.id === mail.id;
    }).length > 0;
  return (
    <div
      onClick={() => {
        setAllEmailData(
          allEmailData.map((item: any) => {
            if (item.id === mail.id) {
              return { ...item, isRead: true };
            } else {
              return item;
            }
          })
        );
        setSelectedMailId(mail.id);
      }}
      className={`cursor-pointer py-8 ${
        isRead && !(selectedMailId === mail.id)
          ? "bg-thinkfiy-read"
          : "bg-[#ffffff]"
      } px-16 flex space-x-16 border ${
        selectedMailId === mail.id
          ? "border-thinkify-accent"
          : "border-thinkify-border"
      } rounded-8 flex-grow`}
    >
      <div className="rounded-full mt-3 bg-thinkify-accent min-w-36 w-36 h-36 text-text-white flex items-center justify-center text-22">
        {logo}
      </div>
      <div className="text-12 flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <span>From:</span>
          <span className="font-700">{from}</span>
        </div>

        <div className="flex items-center space-x-4">
          <span>Subject:</span>
          <span className="font-700">{subject}</span>
        </div>
        <div className="line-clamp-1">{shortDesc}</div>
        <div className="flex items-center space-x-4 text-11">
          <div>{mailDate}</div>
          <div>{mailTime}</div>
          {isFavorite && (
            <div className="pl-12 font-700 text-thinkify-accent">Favorite</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortEmail;
