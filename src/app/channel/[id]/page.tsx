"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Search,
  Menu,
  Bell,
  User,
  Upload,
  Share,
  Flag,
  Users,
  Video,
  Eye,
  ThumbsUp,
  MessageSquare,
  Grid3X3,
  List,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const channelVideos = [
  {
    id: 1,
    title: "Advanced React Patterns You Should Know",
    thumbnail: "/video-poster.png",
    views: "156K",
    uploadDate: "2 days ago",
    duration: "22:15",
  },
  {
    id: 2,
    title: "Building a Full-Stack App with Next.js",
    thumbnail: "/video-thumbnail-concept.png",
    views: "89K",
    uploadDate: "1 week ago",
    duration: "35:42",
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox - Complete Guide",
    thumbnail: "/video-poster.png",
    views: "234K",
    uploadDate: "2 weeks ago",
    duration: "18:33",
  },
  {
    id: 4,
    title: "JavaScript ES2024 New Features",
    thumbnail: "/video-thumbnail-concept.png",
    views: "445K",
    uploadDate: "3 weeks ago",
    duration: "28:17",
  },
];

export default function ChannelPage({ params }: { params: { id: string } }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                  className="w-full px-4 py-2 bg-input border border-border rounded-l-full focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button className="rounded-r-full rounded-l-none px-6">
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Channel Header */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg mb-6 relative overflow-hidden">
            <img
              src="/channel-cover-tech.jpg?height=192&width=1152&query=tech channel cover banner"
              alt="Channel cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Channel Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="/channel-avatar.png?height=128&width=128&query=tech channel avatar" />
              <AvatarFallback className="text-2xl">TC</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">TechChannel Pro</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-2">
                    <span>@techchannelpro</span>
                    <span>•</span>
                    <span>2.4M subscribers</span>
                    <span>•</span>
                    <span>156 videos</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Joined January 2019</span>
                    <span>•</span>
                    <span>45M total views</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={isSubscribed ? "outline" : "default"}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className="min-w-[120px]">
                    <Users className="h-4 w-4 mr-2" />
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Share channel
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="h-4 w-4 mr-2" />
                        Report channel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm leading-relaxed max-w-2xl mb-4">
                Welcome to TechChannel Pro! We create in-depth tutorials on web
                development, programming, and the latest tech trends. New videos
                every Tuesday and Friday. Subscribe for quality content that
                helps you level up your coding skills!
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>45M total views</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>1.2M total likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>156 videos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="videos" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Latest videos</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Recently uploaded
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Recently uploaded</DropdownMenuItem>
                  <DropdownMenuItem>Most popular</DropdownMenuItem>
                  <DropdownMenuItem>Oldest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {channelVideos.map((video) => (
                  <Link key={video.id} href={`/watch?v=${video.id}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                            {video.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{video.views} views</span>
                            <span>{video.uploadDate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {channelVideos.map((video) => (
                  <Link key={video.id} href={`/watch?v=${video.id}`}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-48 aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">
                              {video.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{video.views} views</span>
                              <span>{video.uploadDate}</span>
                              <span>{video.duration}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="playlists" className="space-y-6">
            <div className="text-center py-12">
              <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                No public playlists
              </h3>
              <p className="text-muted-foreground">
                This channel hasn't created any public playlists yet.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No community posts</h3>
              <p className="text-muted-foreground">
                This channel hasn't posted to the community tab yet.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Welcome to TechChannel Pro! We create in-depth tutorials on
                    web development, programming, and the latest tech trends.
                    Our mission is to help developers of all levels improve
                    their skills and stay up-to-date with the rapidly evolving
                    tech landscape.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Links</h3>
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline block">
                      techchannelpro.com
                    </a>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline block">
                      github.com/techchannelpro
                    </a>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline block">
                      twitter.com/techchannelpro
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Joined</span>
                      <span className="text-sm font-medium">Jan 15, 2019</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total views</span>
                      <span className="text-sm font-medium">45,234,567</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Subscribers</span>
                      <span className="text-sm font-medium">2,456,789</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Videos</span>
                      <span className="text-sm font-medium">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
