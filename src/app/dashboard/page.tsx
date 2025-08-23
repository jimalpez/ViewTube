"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Search,
  Menu,
  Bell,
  Upload,
  BarChart3,
  Video,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Calendar,
  Settings,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const analyticsData = {
    totalViews: 1234567,
    totalSubscribers: 45678,
    totalVideos: 89,
    totalLikes: 98765,
    recentViews: [
      { date: "Mon", views: 1200 },
      { date: "Tue", views: 1800 },
      { date: "Wed", views: 1600 },
      { date: "Thu", views: 2200 },
      { date: "Fri", views: 2800 },
      { date: "Sat", views: 3200 },
      { date: "Sun", views: 2900 },
    ],
  };

  const recentVideos = [
    {
      id: 1,
      title: "How to Build a Modern Web App",
      thumbnail:
        "/dashboard-video-1.jpg?height=120&width=200&query=web development tutorial",
      views: 15420,
      likes: 892,
      comments: 156,
      uploadDate: "2 days ago",
      status: "published",
      duration: "12:34",
    },
    {
      id: 2,
      title: "React Best Practices 2024",
      thumbnail:
        "/dashboard-video-2.jpg?height=120&width=200&query=react tutorial",
      views: 8765,
      likes: 543,
      comments: 89,
      uploadDate: "5 days ago",
      status: "published",
      duration: "18:22",
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox Explained",
      thumbnail:
        "/dashboard-video-3.jpg?height=120&width=200&query=css tutorial",
      views: 12340,
      likes: 721,
      comments: 234,
      uploadDate: "1 week ago",
      status: "published",
      duration: "15:45",
    },
    {
      id: 4,
      title: "JavaScript Advanced Concepts",
      thumbnail:
        "/dashboard-video-4.jpg?height=120&width=200&query=javascript tutorial",
      views: 0,
      likes: 0,
      comments: 0,
      uploadDate: "Processing...",
      status: "processing",
      duration: "22:18",
    },
  ];

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
            <Avatar className="h-8 w-8">
              <AvatarImage src="/user-avatar.jpg?height=32&width=32&query=user avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Channel Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/channel-avatar.png?height=80&width=80&query=channel avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Your Channel</h1>
              <p className="text-muted-foreground mb-2">
                @yourchannel • {analyticsData.totalSubscribers.toLocaleString()}{" "}
                subscribers
              </p>
              <div className="flex items-center gap-4">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Customize Channel
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Channel
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Views
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.totalViews.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscribers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.totalSubscribers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.2%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Videos
                  </CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.totalVideos}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+3</span> this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Likes
                  </CardTitle>
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.totalLikes.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15.3%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                  <CardDescription>Views over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.recentViews.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between">
                        <span className="text-sm font-medium">{day.date}</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(day.views / 3500) * 100}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {day.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Manage your channel efficiently
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/upload">
                    <Button className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Video
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Channel Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Playlist
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Videos</h2>
              <Link href="/upload">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentVideos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-48 aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                        {video.status === "processing" && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="secondary">Processing</Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg line-clamp-2">
                            {video.title}
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge
                            variant={
                              video.status === "published"
                                ? "default"
                                : "secondary"
                            }>
                            {video.status}
                          </Badge>
                          <span>Uploaded {video.uploadDate}</span>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{video.views.toLocaleString()} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{video.likes.toLocaleString()} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{video.comments} comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Analytics</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={selectedPeriod === "7d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("7d")}>
                  7 days
                </Button>
                <Button
                  variant={selectedPeriod === "30d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("30d")}>
                  30 days
                </Button>
                <Button
                  variant={selectedPeriod === "90d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("90d")}>
                  90 days
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Performing Video
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">
                      How to Build a Modern Web App
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      15,420 views in the last 7 days
                    </p>
                    <Progress value={85} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Subscriber Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">+1,234</div>
                    <p className="text-sm text-muted-foreground">
                      New subscribers this week
                    </p>
                    <div className="text-sm text-green-600">
                      +18.5% from last week
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upload Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Most active day: <strong>Friday</strong>
                    </p>
                    <p className="text-sm">
                      Best time: <strong>2:00 PM</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based on your audience activity
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Your earnings from monetization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      $2,456
                    </div>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">$18,234</div>
                    <p className="text-sm text-muted-foreground">
                      Total earnings
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      $0.12
                    </div>
                    <p className="text-sm text-muted-foreground">
                      RPM (Revenue per mille)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Channel Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Information</CardTitle>
                  <CardDescription>Update your channel details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Channel Name</label>
                    <input
                      type="text"
                      defaultValue="Your Channel"
                      className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      rows={4}
                      defaultValue="Welcome to my channel! I create content about web development, programming tutorials, and tech reviews."
                      className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Permissions</CardTitle>
                  <CardDescription>
                    Control who can interact with your content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow comments</p>
                      <p className="text-sm text-muted-foreground">
                        Let viewers comment on your videos
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show subscriber count</p>
                      <p className="text-sm text-muted-foreground">
                        Display your subscriber count publicly
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow video downloads</p>
                      <p className="text-sm text-muted-foreground">
                        Let viewers download your videos
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
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
