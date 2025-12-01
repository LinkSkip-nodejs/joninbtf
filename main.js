const API_KEY = "AIzaSyCdxgKRcomqWPYruFgHOvyTUxODG-rC-fU";
const USERNAME = "10FTBNINOJ";

async function fetchLatestVideo() {
  try {
    // Get channel ID from username
    const channelRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=${USERNAME}&part=id`);
    const channelData = await channelRes.json();
    const channelId = channelData.items[0].id;

    // Get latest video
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`);
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      document.getElementById("latest-video").innerHTML = `
        <a href="${videoUrl}" target="_blank" class="btn btn-primary">Watch Latest Video</a>
      `;
    }
  } catch (error) {
    console.error("Error fetching latest video:", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchLatestVideo);
