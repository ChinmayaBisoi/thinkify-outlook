import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";

const FullEmailBody = ({
  mailId,
  allEmailData,
  setAllEmailData,
}: {
  mailId: any;
  setAllEmailData: (x: any) => void;
  allEmailData: any;
}) => {
  const [mail] = allEmailData.filter((item: any) => {
    return item.id === mailId;
  });

  const logo = mail.from?.name[0]?.toUpperCase();
  const subject = mail.subject;

  const [isFavorite, setIsFavorite] = useState(false);
  const mailDate = dateFormat(mail.date, "dd/mm/yy");
  const mailTime = dateFormat(mail.date, "h:MM TT");

  const [loading, setLoading] = useState(false);
  const [emailBody, setEmailBody] = useState<any>("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(` https://flipkart-email-mock.now.sh/?id=${mailId}`)
        .then((res) => {
          //   console.log(res);
          return res.json();
        })
        .then((data) => {
          //   console.log(data);
          setEmailBody(data.body);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, 2000);

    setIsFavorite(mail.isFavorite);
  }, [mailId]);

  const extractedTextArr = (text: string) => {
    let temp = [];
    text = text.replace("<div>", "");
    text = text.replace("</div>", "");
    temp = text.split("</p>");
    return temp.map((x: string) => {
      return x.slice(3);
    });
  };
  return (
    <div className="py-16 px-16 flex  space-x-16 bg-[#ffffff] border border-thinkify-border rounded-8 flex-grow">
      <div className="rounded-full mt-3 bg-thinkify-accent min-w-36 w-36 h-36 text-text-white flex items-center justify-center text-22">
        {logo}
      </div>
      <div className="text-12 flex flex-col space-y-8 flex-grow">
        <div className="flex justify-between">
          <div className="font-700 text-22">{subject}</div>
          <div
            onClick={() => {
              if (!isFavorite) {
                setAllEmailData(
                  allEmailData.map((item: any) => {
                    if (item.id === mail.id) {
                      return { ...item, isFavorite: true };
                    } else {
                      return item;
                    }
                  })
                );

                setIsFavorite(true);
              } else {
                setAllEmailData(
                  allEmailData.map((item: any) => {
                    if (item.id === mail.id) {
                      return { ...item, isFavorite: false };
                    } else {
                      return item;
                    }
                  })
                );
                setIsFavorite(false);
              }
            }}
            className="cursor-pointer text-11 px-14 py-3 flex items-center self-start justify-center rounded-12 bg-thinkify-accent text-thinkify-read"
          >
            {isFavorite ? "Unmark Favorite" : "Mark as Favorite"}
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <span>{mailDate}</span>
          <span>{mailTime}</span>
        </div>
        {loading ? (
          <div className="w-[100%] h-400 comment br animate"></div>
        ) : (
          <div className="flex flex-col space-y-16">
            {extractedTextArr(emailBody).map((content: string) => {
              return <p key={content}>{content}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullEmailBody;
