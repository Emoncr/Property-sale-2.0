import React from 'react';

const VideoPlayer = ({ videoUrl, title }) => {
    // Function to check if URL is YouTube
    const isYouTubeUrl = (url) => {
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    // Function to convert YouTube URL to embed URL
    const getYouTubeEmbedUrl = (url) => {
        let videoId;

        if (url.includes('youtube.com')) {
            videoId = url.split('v=')[1];
        } else if (url.includes('youtu.be')) {
            videoId = url.split('youtu.be/')[1];
        }

        // Remove any additional parameters
        if (videoId?.includes('?')) {
            videoId = videoId.split('?')[0];
        }
        if (videoId?.includes('&')) {
            videoId = videoId.split('&')[0];
        }

        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div className="w-full">
            {isYouTubeUrl(videoUrl) ? (
                <div className='bg-gray-200'>
                    <iframe
                        src={getYouTubeEmbedUrl(videoUrl)}
                        className="w-full rounded-lg shadow-lg aspect-video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <video
                    controls
                    className="w-full rounded-lg shadow-lg object-cover max-h-[500px]"
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default VideoPlayer;