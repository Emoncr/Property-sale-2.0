"use client";
import React, { useState, memo, lazy, Suspense } from "react";
import Modal from "../ui/Modal";
import PageHeading from "../common/PageHeading";
const VideoPlayer = lazy(() => import("../Tutorials/VideoPlayer"));
import Image from "next/image";
const videos = [
  {
    id: 1,
    title:
      "How to create new Donation Campaign on SquareDonations? (Plugin for Squarespace)",
    videoUrl: "https://youtu.be/akAKMahrXVw?si=V-bjo_6RUVEVuelW",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/property-sell-401819.appspot.com/o/new%20app%2FHow%20to%20create%20new%20Donation%20Campaign%20on%20SquareDonations%20(Plugin%20for%20Squarespace).png?alt=media&token=8cd9aeed-fc64-4144-bcdc-72b7e95366f5",
  },
  {
    id: 2,
    title: "How to connect Squarespace website to SquareDonations",
    videoUrl: "https://youtu.be/wpGP2HLf6BE?si=lv5yKgyIvOtdt_D4",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/property-sell-401819.appspot.com/o/new%20app%2FHow%20to%20connect%20Squarespace%20website%20to%20SquareDonations.png?alt=media&token=343c0e13-b4d0-4017-99ab-f61bc4b560e9",
  },
  {
    id: 3,
    title: "How to add Recent Donations Widget to the Squarespace Website",
    videoUrl: "https://youtu.be/QaaklLrGqyw?si=T4knbLNCeyCnwwgt",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/property-sell-401819.appspot.com/o/new%20app%2FHow%20to%20add%20Recent%20Donations%20Widget%20to%20the%20Squarespace%20Website.png?alt=media&token=408b8a09-3d11-4829-b45b-42febe8ea65f",
  },
  {
    id: 4,
    title:
      "How to add Donation form to your Squarespace website using SquareDonations",
    videoUrl: "https://youtu.be/ih16GFDmn64?si=Z-ZXDq5d6RCkZYTo",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/property-sell-401819.appspot.com/o/test%20page%2FHow%20to%20add%20Donation%20form%20to%20your%20Squarespace%20website%20using%20SquareDonations-min.png?alt=media&token=419568fe-c786-411a-9a6b-2c35bd86e951",
  },
  {
    id: 5,
    title: "How to link Stripe to SquareDonations?",
    videoUrl: "https://youtu.be/Gsju8nwT-FQ?si=6qLMeqX3B9beIA79",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/property-sell-401819.appspot.com/o/new%20app%2FHow%20to%20link%20Stripe%20toSquareDonations.png?alt=media&token=2b7928ae-19c4-4c1c-968b-9e35522b3381",
  },
];

const VideoCard = memo(({ video, onVideoClick }) => (
  <>
    <Modal
      title={video.title}
      maxWidth="3xl"
      element={<VideoPlayer videoUrl={video.videoUrl} title={video.title} />}
    >
      <div
        key={video.id}
        className="border border-gray-200 rounded-lg shadow-lg bg-white max-w-[400px] cursor-pointer hover:shadow-xl w-full transition-shadow duration-300"
        onClick={() => onVideoClick(video)}
      >
        <Image
          width={400}
          height={200}
          src={video.thumbnail}
          alt={`${video.title} thumbnail`}
          className="w-full h-[200px] object-cover rounded-t-lg"
          loading="lazy"
        />
        <h3 className="text-sm lg:text-lg font-semibold text-gray-800 p-4 truncate">
          {video.title}
        </h3>
      </div>
    </Modal>
  </>
));

VideoCard.displayName = "VideoCard";

const Tutorials = () => {
  const [showModal, setShowModal] = useState(false);

  const handleVideoClick = (video) => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="pt-0 flex flex-col overflow-y-auto">
        <PageHeading pageName="Tutorials" />

        <div className="flex items-start justify-start gap-6 flex-wrap mt-10">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onVideoClick={handleVideoClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
