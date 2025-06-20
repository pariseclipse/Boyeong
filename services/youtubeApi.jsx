import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyCSXuMlkGcs7MzRZ5U9ov_7XJR0GK6kjFk";
export async function fetchSubtitles(videoId) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/captions`,
      {
        params: {
          part: "snippet",
          videoId: videoId,
          key: YOUTUBE_API_KEY,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching subtitles:", error);
    return [];
  }
}
