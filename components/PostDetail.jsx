import React from "react";
import moment from "moment";
import { type } from "os";
import {
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const PostDetail = ({ article }) => {
  const sharedUrl = `https://izzetfurkancakmak.xyz/article/${article.slug}`;

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 -mx-4 ">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={article.featuredImage.url}
          alt={article.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg-px-0 mt-10">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto ">
            <img
              alt={article.author.name}
              height="40px"
              width="40px"
              className="align-middle rounded-full -mt-2"
              src={article.author.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 mb-1 text-sm lg:text-lg md:text-lg sm:text-lg">
              {article.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700  -mt-5 -ml-18 lg:-mt-1 lg:ml-2 text-sm lg:text-lg sm:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-6 inline mr-2 text-teal-600 -mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(article.createdAt).format("MMM DD , YYYY")}</span>
          </div>
        </div>

        <div className="-mt-8 -ml-5">
           
          <LinkedinShareButton
            url={sharedUrl}
            quote={"Dummy text!"}
            hashtag="#muo"
          >
                    
            <LinkedinIcon size={26} round className="ml-4" />
                  
          </LinkedinShareButton>
          <WhatsappShareButton
            url={sharedUrl}
            quote={"Dummy text!"}
            hashtag="#muo"
          >
                    
            <WhatsappIcon size={26} round className="-ml-3" />
                  
          </WhatsappShareButton>
          <TelegramShareButton
            url={sharedUrl}
            quote={"Dummy text!"}
            hashtag="#muo"
          >
                    
            <TelegramIcon size={26} round className="-ml-10" />
                  
          </TelegramShareButton>
          <EmailShareButton
            className="-ml-1"
            url={sharedUrl}
            quote={"Dummy text!"}
            hashtag="#muo"
          >
                    
            <EmailIcon size={26} round className="-ml-16" />
                  
          </EmailShareButton>
        </div>

        <h1 className="mb-6 mt-2 text-3xl font-semibold">{article.title}</h1>
        {console.log(article.content.raw)}
        {article.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;

/* getContentFragment function is to decide which type of item we call text img etc.
in line 71 edited responsive view for date 
*/
