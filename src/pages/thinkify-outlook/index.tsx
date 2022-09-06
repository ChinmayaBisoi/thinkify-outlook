import React, { useState } from "react";
import FilterStrip from "../../components/thinkify/filter-strip";
import MainContent from "../../components/thinkify/main-content";

const ThinkifyOutlook = () => {
  const [currentFilter, setCurrentFilter] = useState("unread");
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-thinkify-background md:pb-20 md:pt-10 md:px-30">
      <FilterStrip
        loading={loading}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
      <MainContent
        setLoading={setLoading}
        loading={loading}
        currentFilter={currentFilter}
        pageNo={pageNo}
      />
    </div>
  );
};

export default ThinkifyOutlook;
