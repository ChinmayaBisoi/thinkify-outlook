import React, { useState } from "react";
import Image from "next/image";

const filterBtnClass = "px-14 pt-1 pb-2 rounded-12";

const FilterStrip = ({
  currentFilter,
  setCurrentFilter,
  pageNo,
  setPageNo,
  loading,
}: {
  currentFilter: string;
  setCurrentFilter: (x: string) => void;
  pageNo: number;
  setPageNo: (x: number) => void;
  loading: boolean;
}) => {
  return (
    <div className="flex items-center justify-between text-14 font-600 pb-10 sticky pt-10 top-0 bg-thinkify-background md:px-0 px-16">
      <div className="flex items-center space-x-8 ">
        <div className={`pt-1 pb-2`}>Filter By:</div>
        <div
          onClick={() => {
            if (!loading) {
              setCurrentFilter("unread");
            }
          }}
          className={`${filterBtnClass}  ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } ${currentFilter === "unread" ? "bg-thinkify-filter" : ""}`}
        >
          Unread
        </div>
        <div
          onClick={() => {
            if (!loading) {
              setCurrentFilter("read");
            }
          }}
          className={`${filterBtnClass}  ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } ${currentFilter === "read" ? "bg-thinkify-filter" : ""}`}
        >
          Read
        </div>
        <div
          onClick={() => {
            if (!loading) {
              setCurrentFilter("favorites");
            }
          }}
          className={`${filterBtnClass}  ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } ${currentFilter === "favorites" ? "bg-thinkify-filter" : ""}`}
        >
          Favorites
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <div
          onClick={() => {
            if (pageNo > 1 && !loading) {
              setPageNo(pageNo - 1);
            }
          }}
          className={`min-w-16 w-16 h-16 ${
            pageNo <= 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <Image
            src="/thinkify-outlook/chevron-left.png"
            width={16}
            height={16}
            alt={"left arrow"}
          />
        </div>
        <div className="py-2 px-4 min-w-16">{pageNo}</div>
        <div
          onClick={() => {
            if (!loading) {
              setPageNo(pageNo + 1);
            }
          }}
          className={`min-w-16 w-16 h-16 cursor-pointer`}
        >
          <Image
            src="/thinkify-outlook/chevron-right.png"
            width={16}
            height={16}
            alt={"right arrow"}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterStrip;
