import { type NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
});

export async function GET(request: NextRequest, context: any) {
  const videoId = context.params.id;

  try {
    // Get video details
    const videoResponse = await youtube.videos.list({
      part: ["snippet", "statistics", "contentDetails"],
      id: [videoId],
    });

    // Get channel details
    const video = videoResponse.data.items?.[0];
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [video.snippet?.channelId || ""],
    });

    // Get comments
    const commentsResponse = await youtube.commentThreads.list({
      part: ["snippet", "replies"],
      videoId: videoId,
      maxResults: 20,
      order: "relevance",
    });

    const videoData = {
      id: video.id,
      title: video.snippet?.title,
      description: video.snippet?.description,
      channelTitle: video.snippet?.channelTitle,
      channelId: video.snippet?.channelId,
      publishedAt: video.snippet?.publishedAt,
      viewCount: video.statistics?.viewCount,
      likeCount: video.statistics?.likeCount,
      duration: video.contentDetails?.duration,
      tags: video.snippet?.tags || [],
      channel: {
        id: channelResponse.data.items?.[0]?.id,
        title: channelResponse.data.items?.[0]?.snippet?.title,
        description: channelResponse.data.items?.[0]?.snippet?.description,
        subscriberCount:
          channelResponse.data.items?.[0]?.statistics?.subscriberCount,
        thumbnail:
          channelResponse.data.items?.[0]?.snippet?.thumbnails?.high?.url,
      },
      comments:
        commentsResponse.data.items?.map((item) => ({
          id: item.id,
          text: item.snippet?.topLevelComment?.snippet?.textDisplay,
          author: item.snippet?.topLevelComment?.snippet?.authorDisplayName,
          authorThumbnail:
            item.snippet?.topLevelComment?.snippet?.authorProfileImageUrl,
          likeCount: item.snippet?.topLevelComment?.snippet?.likeCount,
          publishedAt: item.snippet?.topLevelComment?.snippet?.publishedAt,
          replies:
            item.replies?.comments?.map((reply) => ({
              id: reply.id,
              text: reply.snippet?.textDisplay,
              author: reply.snippet?.authorDisplayName,
              authorThumbnail: reply.snippet?.authorProfileImageUrl,
              likeCount: reply.snippet?.likeCount,
              publishedAt: reply.snippet?.publishedAt,
            })) || [],
        })) || [],
    };

    return NextResponse.json(videoData);
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch video data" },
      { status: 500 },
    );
  }
}
