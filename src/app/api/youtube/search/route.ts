import { type NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "trending";
  const maxResults = Number.parseInt(searchParams.get("maxResults") || "12");
  const order = searchParams.get("order") || "relevance";

  try {
    const response = await youtube.search.list({
      part: ["snippet"],
      q: query,
      type: ["video"],
      maxResults,
      order: order as any,
      regionCode: "US",
      relevanceLanguage: "en",
    });

    const videoIds = response.data.items
      ?.map((item) => item.id?.videoId)
      .filter(Boolean) as string[];

    // Get additional video details
    const videoDetails = await youtube.videos.list({
      part: ["statistics", "contentDetails"],
      id: videoIds,
    });

    const videos = response.data.items?.map((item, index) => {
      const stats = videoDetails.data.items?.[index]?.statistics;
      const contentDetails = videoDetails.data.items?.[index]?.contentDetails;

      return {
        id: item.id?.videoId,
        title: item.snippet?.title,
        description: item.snippet?.description,
        thumbnail:
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.medium?.url,
        channelTitle: item.snippet?.channelTitle,
        channelId: item.snippet?.channelId,
        publishedAt: item.snippet?.publishedAt,
        viewCount: stats?.viewCount || "0",
        likeCount: stats?.likeCount || "0",
        duration: contentDetails?.duration,
      };
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube data" },
      { status: 500 },
    );
  }
}
