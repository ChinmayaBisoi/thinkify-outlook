import React, { useEffect, useState } from "react";
import FullEmailBody from "./full-email-body";
import ShortEmail from "./short-email";

const MainContent = ({
  currentFilter,
  pageNo,
  loading,
  setLoading,
}: {
  currentFilter: string;
  pageNo: number;
  loading: boolean;
  setLoading: (x: boolean) => void;
}) => {
  const [mailsWithSelectedFilter, setMailsWithSelectedFilter] = useState<any>(
    []
  );
  const [emailData, setEmailData] = useState<any>();
  const [selectedMailId, setSelectedMailId] = useState<any>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const fetchUrl =
        pageNo > 1
          ? `https://flipkart-email-mock.now.sh/?page=${pageNo}`
          : "https://flipkart-email-mock.now.sh/";
      setSelectedMailId(false);
      fetch(fetchUrl)
        .then((res) => {
          //   console.log(res);
          return res.json();
        })
        .then((data) => {
          data = data.list.map((listItem: any) => {
            return {
              ...listItem,
              isRead: false,
              isFavorite: false,
              isSelected: false,
            };
          });
          console.log(data);
          setEmailData(data);
          setLoading(false);
        })
        .catch((err) => {
          setEmailData([]);
          console.log(err);
          setLoading(false);
        });
    }, 2000);
    // fetch("https://flipkart-email-mock.now.sh/")
    //   .then((res) => {
    //     console.log(res);
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setEmailData(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //   });
  }, [pageNo]);

  const filterMails = () => {
    if (currentFilter === "unread" && !!emailData) {
      const unreadMailsPlusSelectedMail = emailData?.filter((item: any) => {
        return !item.isRead || item.id === selectedMailId;
      });
      //   const otherMails = emailData?.filter((item: any) => {
      //     return item.isRead;
      //   });

      setMailsWithSelectedFilter([...unreadMailsPlusSelectedMail]);
    } else if (currentFilter === "read") {
      const readMails = emailData?.filter((item: any) => {
        return item.isRead;
      });
      const otherMails = emailData?.filter((item: any) => {
        return !item.isRead;
      });
      setMailsWithSelectedFilter([...readMails]);
    } else if (currentFilter === "favorites") {
      const favoriteMails = emailData?.filter((item: any) => {
        return item.isFavorite;
      });
      const otherMails = emailData?.filter((item: any) => {
        return !item.isFavorite;
      });
      setMailsWithSelectedFilter([...favoriteMails]);
    }
  };
  useEffect(() => {
    filterMails();
  }, [currentFilter, emailData]);

  return (
    <div className="grid grid-cols-12 gap-x-20 text-thinkify-text font-400">
      {/* <div
        onClick={() => {
          console.log(mailsWithSelectedFilter, emailData);
        }}
        className="col-span-full"
      >
        click me
      </div> */}
      <div
        className={`${
          loading
            ? "col-span-full"
            : `${selectedMailId ? "col-span-5" : "col-span-full"}`
        }`}
      >
        <div className="flex flex-col space-y-16">
          {loading ? (
            <>
              <div className="flex border border-thinkify-border rounded-8 flex-grow comment br animate h-100" />
              <div className="flex border border-thinkify-border rounded-8 flex-grow comment br animate h-100" />
              <div className="flex border border-thinkify-border rounded-8 flex-grow comment br animate h-100" />
              <div className="flex border border-thinkify-border rounded-8 flex-grow comment br animate h-100" />
              <div className="flex border border-thinkify-border rounded-8 flex-grow comment br animate h-100" />
            </>
          ) : mailsWithSelectedFilter.length > 0 ? (
            mailsWithSelectedFilter?.map((mail: any) => {
              return (
                <ShortEmail
                  allEmailData={emailData}
                  setAllEmailData={setEmailData}
                  selectedMailId={selectedMailId}
                  setSelectedMailId={setSelectedMailId}
                  mail={mail}
                  key={mail.id}
                />
              );
            })
          ) : (
            <div>No Emails To Show</div>
          )}
        </div>
      </div>
      {!!selectedMailId && !loading && (
        <div className="col-span-7">
          <FullEmailBody
            mailId={selectedMailId}
            setAllEmailData={setEmailData}
            allEmailData={emailData}
          />
        </div>
      )}
    </div>
  );
};

export default MainContent;
