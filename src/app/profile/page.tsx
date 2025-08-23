"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Search,
  Menu,
  Bell,
  Upload,
  Settings,
  Edit,
  MapPin,
  Calendar,
  LinkIcon,
  Video,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share,
  MoreHorizontal,
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

const userVideos = [
  {
    id: 1,
    title: "My Latest Project - Full Stack App",
    thumbnail: "/video-poster.png",
    views: "45.2K",
    uploadDate: "3 days ago",
    duration: "18:42",
    likes: 1234,
    comments: 89,
  },
  {
    id: 2,
    title: "React Tips and Tricks",
    thumbnail: "/video-thumbnail-concept.png",
    views: "23.1K",
    uploadDate: "1 week ago",
    duration: "12:15",
    likes: 892,
    comments: 156,
  },
  {
    id: 3,
    title: "CSS Grid Tutorial",
    thumbnail: "/video-poster.png",
    views: "67.8K",
    uploadDate: "2 weeks ago",
    duration: "25:33",
    likes: 2341,
    comments: 234,
  },
  {
    id: 4,
    title: "JavaScript Advanced Concepts",
    thumbnail: "/video-thumbnail-concept.png",
    views: "89.4K",
    uploadDate: "3 weeks ago",
    duration: "32:18",
    likes: 3456,
    comments: 445,
  },
];

const playlists = [
  {
    id: 1,
    title: "Web Development Tutorials",
    videoCount: 12,
    thumbnail: "/video-poster.png",
    lastUpdated: "2 days ago",
    isPublic: true,
  },
  {
    id: 2,
    title: "React Projects",
    videoCount: 8,
    thumbnail: "/video-thumbnail-concept.png",
    lastUpdated: "1 week ago",
    isPublic: true,
  },
  {
    id: 3,
    title: "Watch Later",
    videoCount: 23,
    thumbnail: "/video-poster.png",
    lastUpdated: "5 hours ago",
    isPublic: false,
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(
    "Passionate web developer sharing knowledge through tutorials and projects. Love creating modern, responsive applications with React and Next.js.",
  );
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
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg mb-6 relative overflow-hidden">
            <img
              src="/channel-cover.jpg?height=192&width=1152&query=channel cover banner"
              alt="Channel cover"
              className="w-full h-full object-cover"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src="/user-avatar.png?height=128&width=128&query=user profile avatar" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-0 right-0">
                <Edit className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">John Developer</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-2">
                    <span>@johndeveloper</span>
                    <span>•</span>
                    <span>125K subscribers</span>
                    <span>•</span>
                    <span>42 videos</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined March 2020</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <a href="#" className="text-primary hover:underline">
                        johndeveloper.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell viewers about your channel..."
                      className="min-h-[100px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setIsEditing(false)}>
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed max-w-2xl">{bio}</p>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>2.3M total views</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>89K total likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>12K comments</span>
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
              <h2 className="text-xl font-bold">Uploads</h2>
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
                {userVideos.map((video) => (
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
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{video.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{video.comments}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {userVideos.map((video) => (
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
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span>{video.views} views</span>
                              <span>{video.uploadDate}</span>
                              <span>{video.duration}</span>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{video.likes} likes</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{video.comments} comments</span>
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Analytics
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="playlists" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Created playlists</h2>
              <Button>
                <Video className="h-4 w-4 mr-2" />
                New playlist
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                      <img
                        src={playlist.thumbnail || "/placeholder.svg"}
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Video className="h-8 w-8 mx-auto mb-2" />
                          <span className="text-sm font-medium">
                            {playlist.videoCount} videos
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={playlist.isPublic ? "default" : "secondary"}
                        className="absolute top-2 right-2">
                        {playlist.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {playlist.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Updated {playlist.lastUpdated}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                No community posts yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Share updates, polls, and engage with your audience
              </p>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Create post
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">{bio}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      San Francisco, CA
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-1">Joined</h4>
                    <p className="text-sm text-muted-foreground">
                      March 15, 2020
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-1">Links</h4>
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline block">
                        johndeveloper.com
                      </a>
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline block">
                        github.com/johndeveloper
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total views</span>
                    <span className="font-medium">2,345,678</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subscribers</span>
                    <span className="font-medium">125,432</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Videos</span>
                    <span className="font-medium">42</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total likes</span>
                    <span className="font-medium">89,234</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Comments</span>
                    <span className="font-medium">12,456</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
