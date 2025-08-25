"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Search,
  Menu,
  Bell,
  User,
  Upload,
  Home,
  TrendingUp as Trending,
  SubscriptIcon as Subscriptions,
  Library,
  Music,
  Gamepad2,
  Film,
  Newspaper,
  Lightbulb,
  Dumbbell,
  ChefHat,
  Code,
  Palette,
  Loader2,
} from "lucide-react";

const categories = [
  { name: "All", icon: null },
  { name: "Music", icon: Music },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Movies", icon: Film },
  { name: "News", icon: Newspaper },
  { name: "Learning", icon: Lightbulb },
  { name: "Sports", icon: Dumbbell },
  { name: "Cooking", icon: ChefHat },
  { name: "Tech", icon: Code },
  { name: "Art", icon: Palette },
];

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  duration: string;
}

function formatViewCount(count: string): string {
  const num = Number.parseInt(count);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return count;
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";

  const hours = Number.parseInt(match[1]?.replace("H", "") || "0");
  const minutes = Number.parseInt(match[2]?.replace("M", "") || "0");
  const seconds = Number.parseInt(match[3]?.replace("S", "") || "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatTimeAgo(publishedAt: string): string {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffInSeconds = Math.floor(
    (now.getTime() - published.getTime()) / 1000,
  );

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }
}

const mockVideos: YouTubeVideo[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Video)",
    description:
      "The official video for Rick Astley's 'Never Gonna Give You Up'",
    thumbnail: "/vibrant-music-video.png",
    channelTitle: "Rick Astley",
    channelId: "UCuAXFkgsw1L7xaCfnd5JJOw",
    publishedAt: "2009-10-25T06:57:33Z",
    viewCount: "1400000000",
    likeCount: "15000000",
    duration: "PT3M33S",
  },
  {
    id: "9bZkp7q19f0",
    title: "PSY - GANGNAM STYLE(강남스타일) M/V",
    description:
      "PSY - GANGNAM STYLE(강남스타일) M/V @ https://youtu.be/9bZkp7q19f0",
    thumbnail: "/generic-dance-scene.png",
    channelTitle: "officialpsy",
    channelId: "UCrDkAvF9ZLzWz6n4frXFbNw",
    publishedAt: "2012-07-15T08:34:21Z",
    viewCount: "4800000000",
    likeCount: "25000000",
    duration: "PT4M13S",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    description: "Luis Fonsi's 'Despacito' ft. Daddy Yankee",
    thumbnail: "/abstract-geometric-pattern.png",
    channelTitle: "LuisFonsiVEVO",
    channelId: "UCxlCKbPOhXCzWHHvz8Qn6Gg",
    publishedAt: "2017-01-12T21:30:00Z",
    viewCount: "8200000000",
    likeCount: "50000000",
    duration: "PT4M42S",
  },
  {
    id: "fJ9rUzIMcZQ",
    title: "Queen – Bohemian Rhapsody (Official Video Remastered)",
    description: "Bohemian Rhapsody by Queen",
    thumbnail: "/abstract-rhapsody.png",
    channelTitle: "Queen Official",
    channelId: "UCiMhD4jzUqG-IgPzUmmytRQ",
    publishedAt: "2008-08-01T15:53:28Z",
    viewCount: "1900000000",
    likeCount: "18000000",
    duration: "PT5M55S",
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [trendingVideos, setTrendingVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchTrendingVideos();
    fetchVideos();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else if (selectedCategory === "All") {
      fetchVideos();
    } else {
      fetchCategoryVideos(selectedCategory);
    }
  }, [searchQuery, selectedCategory]);

  const fetchTrendingVideos = async () => {
    try {
      console.log("[v0] Fetching trending videos...");
      const response = await fetch("/api/youtube/trending?maxResults=8");
      console.log("[v0] Trending API response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[v0] Trending API data:", data);

      if (data.videos && data.videos.length > 0) {
        setTrendingVideos(data.videos);
        console.log("[v0] Set trending videos:", data.videos.length);
      } else {
        console.log("[v0] No trending videos from API, using mock data");
        setTrendingVideos(mockVideos.slice(0, 4));
      }
    } catch (error) {
      console.error("[v0] Failed to fetch trending videos:", error);
      setTrendingVideos(mockVideos.slice(0, 4));
    }
  };

  const fetchVideos = async () => {
    try {
      setLoading(true);
      console.log("[v0] Fetching videos...");
      const response = await fetch(
        "/api/youtube/search?q=popular&maxResults=24&order=relevance",
      );
      console.log("[v0] Search API response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[v0] Search API data:", data);

      if (data.videos && data.videos.length > 0) {
        setVideos(data.videos);
        console.log("[v0] Set videos:", data.videos.length);
      } else {
        console.log("[v0] No videos from API, using mock data");
        setVideos(mockVideos);
      }
    } catch (error) {
      console.error("[v0] Failed to fetch videos:", error);
      setVideos(mockVideos);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryVideos = async (category: string) => {
    try {
      setLoading(true);
      console.log("[v0] Fetching category videos for:", category);
      const searchQuery = category.toLowerCase();
      const response = await fetch(
        `/api/youtube/search?q=${searchQuery}&maxResults=24&order=relevance`,
      );
      console.log("[v0] Category API response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[v0] Category API data:", data);

      if (data.videos && data.videos.length > 0) {
        setVideos(data.videos);
        console.log("[v0] Set category videos:", data.videos.length);
      } else {
        console.log("[v0] No category videos from API, using mock data");
        setVideos(mockVideos);
      }
    } catch (error) {
      console.error("[v0] Failed to fetch category videos:", error);
      setVideos(mockVideos);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setSearchLoading(true);
      console.log("[v0] Searching for:", searchQuery);
      const response = await fetch(
        `/api/youtube/search?q=${encodeURIComponent(
          searchQuery,
        )}&maxResults=24&order=relevance`,
      );
      console.log("[v0] Search API response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[v0] Search results:", data);

      if (data.videos && data.videos.length > 0) {
        setVideos(data.videos);
        console.log("[v0] Set search results:", data.videos.length);
      } else {
        console.log("[v0] No search results from API, using mock data");
        setVideos(mockVideos);
      }
    } catch (error) {
      console.error("[v0] Failed to search videos:", error);
      setVideos(mockVideos);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    if (category === "All") {
      fetchVideos();
    } else {
      fetchCategoryVideos(category);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold">ViewTube</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-l-full focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {searchLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
              </div>
              <Button
                className="rounded-r-full rounded-l-none px-6"
                onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/upload">
              <Button variant="ghost" size="icon">
                <Upload className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-sidebar border-r border-sidebar-border h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
          <nav className="p-3 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/trending"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
              <Trending className="h-5 w-5" />
              <span>Trending</span>
            </Link>
            <Link
              href="/subscriptions"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
              <Subscriptions className="h-5 w-5" />
              <span>Subscriptions</span>
            </Link>
            <Link
              href="/library"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
              <Library className="h-5 w-5" />
              <span>Library</span>
            </Link>

            <div className="border-t border-sidebar-border my-3"></div>

            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-sidebar-foreground mb-2">
                Explore
              </h3>
              <div className="space-y-1">
                {categories.slice(1, 6).map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground w-full text-left">
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={
                    selectedCategory === category.name ? "default" : "secondary"
                  }
                  size="sm"
                  onClick={() => handleCategorySelect(category.name)}
                  className="whitespace-nowrap">
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {selectedCategory === "All" && trendingVideos.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Trending className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Trending Now</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {trendingVideos.slice(0, 4).map((video) => (
                  <Link key={video.id} href={`/watch?v=${video.id}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-shadow !pt-0 h-full">
                      <CardContent className="p-0">
                        <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                            {formatDuration(video.duration)}
                          </div>
                          <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
                            TRENDING
                          </Badge>
                        </div>
                        <div className="p-3">
                          <div className="flex gap-3">
                            <Avatar className="h-9 w-9 flex-shrink-0">
                              <AvatarFallback>
                                {video.channelTitle[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                                {video.title}
                              </h3>
                              <p className="text-muted-foreground text-xs mb-1">
                                {video.channelTitle}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {formatViewCount(video.viewCount)} views •{" "}
                                {formatTimeAgo(video.publishedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">
              {selectedCategory === "All" ? "Recommended" : selectedCategory}{" "}
              Videos
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading videos...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <Link key={video.id} href={`/watch?v=${video.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-shadow !pt-0 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                          {formatDuration(video.duration)}
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9 flex-shrink-0">
                            <AvatarFallback>
                              {video.channelTitle[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                              {video.title}
                            </h3>
                            <p className="text-muted-foreground text-xs mb-1">
                              {video.channelTitle}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {formatViewCount(video.viewCount)} views •{" "}
                              {formatTimeAgo(video.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!loading && videos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">No videos found</div>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
