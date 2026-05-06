import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaYoutube,
  FaPlay,
  FaClock,
  FaUser,
  FaEye,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/videos");
      setVideos(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Get YouTube embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";

    let videoId = "";

    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    }
    // Format: https://youtu.be/VIDEO_ID
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }
    // Format: https://www.youtube.com/embed/VIDEO_ID
    else if (url.includes("/embed/")) {
      videoId = url.split("/embed/")[1]?.split("?")[0];
    }
    // Format: Just VIDEO_ID (11 characters)
    else if (url.length === 11 && !url.includes("/")) {
      videoId = url;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : "";
  };

  // ✅ FIXED: Get thumbnail URL
  const getThumbnail = (video) => {
    if (video.thumbnail) return video.thumbnail;
    
    // Auto-generate thumbnail from YouTube
    const url = video.videoUrl || "";
    let videoId = "";
    
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("/embed/")) {
      videoId = url.split("/embed/")[1]?.split("?")[0];
    }
    
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  // Filter videos
  const filteredVideos = videos.filter((v) => {
    const matchesSearch = v.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || v.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    "strength",
    "cardio",
    "yoga",
    "hiit",
    "stretching",
  ];

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Workout <span className="text-orange-500">Videos</span>
          </h1>
          <p className="text-gray-400">
            Watch and follow professional workout videos
          </p>
        </div>

        {/* Selected Video Player */}
        {selectedVideo && (
          <div className="mb-10">
            <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
              {/* Close Button */}
              <div className="flex justify-end p-3">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-all"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                {getEmbedUrl(selectedVideo.videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(selectedVideo.videoUrl)}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={selectedVideo.title}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <FaYoutube className="text-6xl mb-4" />
                    <p>Invalid video URL</p>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedVideo.title}
                </h2>
                {selectedVideo.description && (
                  <p className="text-gray-400 mt-2">
                    {selectedVideo.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm flex-wrap">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-orange-500" />{" "}
                    {selectedVideo.trainer || "FitHer Trainer"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-orange-500" />{" "}
                    {selectedVideo.duration || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye className="text-orange-500" />{" "}
                    {selectedVideo.views || 0} views
                  </span>
                  <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-xs capitalize">
                    {selectedVideo.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3.5 pl-12 bg-[#111] border border-gray-800 rounded-lg text-white focus:border-orange-500 outline-none"
              placeholder="Search videos..."
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize ${
                  category === cat
                    ? "bg-orange-500 text-white"
                    : "bg-[#111] text-gray-400 border border-gray-800 hover:border-orange-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FaYoutube className="text-6xl mx-auto mb-3 opacity-30" />
            <p>No videos found</p>
            {search && (
              <p className="text-sm mt-2">Try different search terms</p>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                onClick={() => setSelectedVideo(video)}
                className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-orange-500 transition-all group shadow-lg hover:shadow-orange-500/10"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={getThumbnail(video)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML =
                        '<div class="flex items-center justify-center h-full"><svg class="w-16 h-16 text-red-500" viewBox="0 0 24 24"><path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"/></svg></div>';
                    }}
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <FaPlay className="text-white text-lg ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-white font-bold truncate group-hover:text-orange-500 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-gray-400 text-xs">
                    <span className="flex items-center gap-1">
                      <FaUser /> {video.trainer || "FitHer"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye /> {video.views || 0}
                    </span>
                  </div>
                  <span className="inline-block mt-3 bg-orange-500/10 text-orange-500 text-xs px-2 py-1 rounded-full capitalize">
                    {video.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}