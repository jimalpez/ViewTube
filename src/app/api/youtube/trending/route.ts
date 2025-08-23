import { type NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const maxResults = Number.parseInt(searchParams.get("maxResults") || "24");
  const regionCode = searchParams.get("regionCode") || "US";

  try {
    const response = await youtube.videos.list({
      part: ["snippet", "statistics", "contentDetails"],
      chart: "mostPopular",
      regionCode,
      maxResults,
      videoCategoryId: "0", // All categories
    });

    const videos = response.data.items?.map((item) => ({
      id: item.id,
      title: item.snippet?.title,
      description: item.snippet?.description,
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url,
      channelTitle: item.snippet?.channelTitle,
      channelId: item.snippet?.channelId,
      publishedAt: item.snippet?.publishedAt,
      viewCount: item.statistics?.viewCount || "0",
      likeCount: item.statistics?.likeCount || "0",
      duration: item.contentDetails?.duration,
      categoryId: item.snippet?.categoryId,
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending videos" },
      { status: 500 },
    );
  }
}
