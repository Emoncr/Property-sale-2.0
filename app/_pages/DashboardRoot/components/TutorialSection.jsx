"use client";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";

const isYouTubeUrl = (url) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

// Function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url) => {
  let videoId;

  if (url.includes("youtube.com")) {
    videoId = url.split("v=")[1];
  } else if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1];
  }

  // Remove any additional parameters
  if (videoId?.includes("?")) {
    videoId = videoId.split("?")[0];
  }
  if (videoId?.includes("&")) {
    videoId = videoId.split("&")[0];
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

const TutorialSection = ({ user }) => {
  const [videoUrl, setVideoUrl] = useState(
    "https://youtu.be/wpGP2HLf6BE?si=lv5yKgyIvOtdt_D4"
  );
  const [showVideoSection, setShowVideoSection] = useState(true);
  const [lunchBooks, setLunchBooks] = useState(0);

  // Calculate completed books
  useEffect(() => {
    let books = 0;

    if (user?.isWebsiteConnected) {
      books += 1;
    }

    if (user?.isStripeAccountConnected) {
      books += 1;
    }

    if (user?.hasCampaign) {
      books += 2;
    }

    setLunchBooks(books);
  }, [
    user?.isWebsiteConnected,
    user?.isStripeAccountConnected,
    user?.hasCampaign,
  ]);


  return (
    <div className="p-6 pb-12 relative bg-white shadow-[0px_2px_12px_0px_#00000014] pt-8 rounded-[14px] z-0">
      <div>
        <h1 className="text-2xl lg:text-[32px] text-[#333333] font-bold ">
          Ready to launch your{" "}
          <span className="text-[#008C8B]">Fundraising?</span>
        </h1>
      </div>
      <div>
        <p className="text-[#333333] mt-3 text-base sm:text-lg">
          {"Enter everything in place before going live."}
        </p>
      </div>

      {
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showVideoSection ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-8">
            <p className="text-[#787878] text-base sm:text-lg mb-3">
              <span>{lunchBooks}</span>/4 Launch Books Done.
            </p>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8 lg:gap-4 xl:gap-8">
              <div className="">
                <div className="grid grid-cols-1 gap-6">
                  {/* Connect Your Website */}
                  <div
                    onClick={() =>
                      setVideoUrl(
                        "https://youtu.be/wpGP2HLf6BE?si=lv5yKgyIvOtdt_D4"
                      )
                    }
                    className={`p-4 border-[#DFDFDF] rounded-[14px] border flex items-center justify-between gap-4 cursor-pointer ${
                      videoUrl ===
                      "https://youtu.be/wpGP2HLf6BE?si=lv5yKgyIvOtdt_D4"
                        ? "bg-[#F0F9FF]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-start gap-2">
                      {user?.user?.isWebsiteConnected ? (
                        <>
                          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                            <FaCheck className="text-white w-3 h-3" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 rounded-md bg-[#DFDFDF] border border-[#DFDFDF] flex items-center justify-center"></div>
                        </>
                      )}
                      <div>
                        <p className="text-[#333333] text-base sm:text-lg">
                          {"Connect Your Website"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <IoIosArrowForward className="text-[#A3A3A3] text-2xl" />
                    </div>
                  </div>

                  {/* Link Your stripe Account */}
                  <div
                    onClick={() =>
                      setVideoUrl(
                        "https://youtu.be/Gsju8nwT-FQ?si=6qLMeqX3B9beIA79"
                      )
                    }
                    className={`p-4 border-[#DFDFDF] rounded-[14px] border flex items-center justify-between gap-4 cursor-pointer ${
                      videoUrl ===
                      "https://youtu.be/Gsju8nwT-FQ?si=6qLMeqX3B9beIA79"
                        ? "bg-[#F0F9FF]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-start gap-2">
                      {user?.user?.stripeAccountId ? (
                        <>
                          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                            <FaCheck className="text-white w-3 h-3" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 rounded-md bg-[#DFDFDF] border border-[#DFDFDF] flex items-center justify-center"></div>
                        </>
                      )}
                      <div>
                        <p className="text-[#333333] text-base sm:text-lg">
                          {"Link Your stripe Account"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <IoIosArrowForward className="text-[#A3A3A3] text-2xl" />
                    </div>
                  </div>

                  {/* Create / Import Your Campaigns */}
                  <div
                    onClick={() =>
                      setVideoUrl(
                        "https://youtu.be/akAKMahrXVw?si=V-bjo_6RUVEVuelW"
                      )
                    }
                    className={`p-4 border-[#DFDFDF] rounded-[14px] border flex items-center justify-between gap-4 cursor-pointer ${
                      videoUrl ===
                      "https://youtu.be/akAKMahrXVw?si=V-bjo_6RUVEVuelW"
                        ? "bg-[#F0F9FF]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-start gap-2">
                      {user?.user?.hasCampaign ? (
                        <>
                          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                            <FaCheck className="text-white w-3 h-3" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 rounded-md bg-[#DFDFDF] border border-[#DFDFDF] flex items-center justify-center"></div>
                        </>
                      )}
                      <div>
                        <p className="text-[#333333] text-base sm:text-lg">
                          {"Create / Import Your Campaigns"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <IoIosArrowForward className="text-[#A3A3A3] text-2xl" />
                    </div>
                  </div>

                  {/* Add Donation Form to Website */}
                  <div
                    onClick={() =>
                      setVideoUrl(
                        "https://youtu.be/ih16GFDmn64?si=Z-ZXDq5d6RCkZYTo"
                      )
                    }
                    className={`p-4 border-[#DFDFDF] rounded-[14px] border flex items-center justify-between gap-4 cursor-pointer 
                                        ${
                                          videoUrl ===
                                          "https://youtu.be/ih16GFDmn64?si=Z-ZXDq5d6RCkZYTo"
                                            ? "bg-[#F0F9FF]"
                                            : "bg-white"
                                        }`}
                  >
                    <div className="flex items-center justify-start gap-2">
                      {user?.user?.hasCampaign ? (
                        <>
                          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                            <FaCheck className="text-white w-3 h-3" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 rounded-md bg-[#DFDFDF] border border-[#DFDFDF] flex items-center justify-center"></div>
                        </>
                      )}
                      <div>
                        <p className="text-[#333333] text-base sm:text-lg">
                          {"Add Donation Form to Website"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <IoIosArrowForward className="text-[#A3A3A3] text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
              {/* ================ Video Player Section ================ */}
              <div>
                {isYouTubeUrl(videoUrl) ? (
                  <div className="bg-gray-200">
                    <iframe
                      src={getYouTubeEmbedUrl(videoUrl)}
                      className="w-full rounded-lg shadow-lg object-cover aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    controls
                    className="w-full rounded-lg shadow-lg object-cover max-h-[400px]"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      }
      <button
        onClick={() => setShowVideoSection(!showVideoSection)}
        className="bg-[#008C8B] text-white text-base sm:text-lg font-semibold rounded-full w-9 h-9 flex items-center justify-center absolute -bottom-4 left-1/2 -translate-x-1/2"
      >
        {showVideoSection ? (
          <IoIosArrowUp className="text-white text-lg font-bold" />
        ) : (
          <IoIosArrowDown className="text-white text-lg font-bold" />
        )}
      </button>
    </div>
  );
};

export default TutorialSection;
