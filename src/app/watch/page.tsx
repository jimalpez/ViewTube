"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  Flag,
  Menu,
  Search,
  Bell,
  User,
  Upload,
  MessageSquare,
  Heart,
  Reply,
  MoreVertical,
  SortAsc,
  Pin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const commentsData = [
  {
    id: 1,
    author: "DevMaster2024",
    avatar: "/user-avatar.png",
    content:
      "This is hands down the best tutorial I've ever watched! The way you explain complex concepts so simply is incredible. I've been struggling with this for weeks and you made it click in 15 minutes. Subscribed and notifications on! 🔔",
    likes: 1847,
    dislikes: 12,
    timeAgo: "3 hours ago",
    isLiked: false,
    isDisliked: false,
    isPinned: true,
    replies: [
      {
        id: 101,
        author: "TechGuru Pro",
        avatar: "/channel-avatar.png",
        content:
          "Thank you so much! Comments like this make all the hard work worth it. I'm planning a follow-up series on advanced techniques - stay tuned! 🚀",
        likes: 234,
        dislikes: 2,
        timeAgo: "2 hours ago",
        isLiked: false,
        isDisliked: false,
        isCreator: true,
      },
      {
        id: 102,
        author: "CodeNewbie2024",
        avatar: "/user-avatar.png",
        content:
          "Same here! This channel has literally changed my career path. Going from zero to landing my first dev job thanks to these tutorials!",
        likes: 89,
        dislikes: 0,
        timeAgo: "1 hour ago",
        isLiked: false,
        isDisliked: false,
      },
      {
        id: 103,
        author: "WebDevExpert",
        avatar: "/channel-avatar.png",
        content:
          "@CodeNewbie2024 That's amazing! Stories like yours inspire me to keep creating content. Congratulations on the job! 🎉",
        likes: 45,
        dislikes: 0,
        timeAgo: "45 minutes ago",
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
  {
    id: 2,
    author: "ReactNinja",
    avatar: "/channel-avatar.png",
    content:
      "The production quality keeps getting better! Love the new editing style and the code examples are so clean. One small suggestion: could you add timestamps in the description for different topics covered?",
    likes: 567,
    dislikes: 8,
    timeAgo: "6 hours ago",
    isLiked: true,
    isDisliked: false,
    isPinned: false,
    replies: [
      {
        id: 104,
        author: "TechGuru Pro",
        avatar: "/channel-avatar.png",
        content:
          "Great suggestion! I'll start adding timestamps to all future videos. Thanks for the feedback! 👍",
        likes: 78,
        dislikes: 0,
        timeAgo: "5 hours ago",
        isLiked: false,
        isDisliked: false,
        isCreator: true,
      },
    ],
  },
  {
    id: 3,
    author: "StudentDeveloper",
    avatar: "/user-avatar.png",
    content:
      "Currently using this for my final year project and it's working perfectly! My professor was impressed with the implementation. Thank you for making computer science education accessible to everyone! 📚",
    likes: 892,
    dislikes: 3,
    timeAgo: "1 day ago",
    isLiked: false,
    isDisliked: false,
    isPinned: false,
    replies: [
      {
        id: 105,
        author: "CS_Professor",
        avatar: "/user-avatar.png",
        content:
          "As an educator myself, I appreciate creators like this who make learning engaging. I often recommend this channel to my students!",
        likes: 156,
        dislikes: 1,
        timeAgo: "18 hours ago",
        isLiked: false,
        isDisliked: false,
      },
      {
        id: 106,
        author: "TechGuru Pro",
        avatar: "/channel-avatar.png",
        content:
          "@CS_Professor Thank you for the kind words! It means a lot coming from an educator. Feel free to reach out if you'd like to collaborate on educational content!",
        likes: 67,
        dislikes: 0,
        timeAgo: "16 hours ago",
        isLiked: false,
        isDisliked: false,
        isCreator: true,
      },
    ],
  },
  {
    id: 4,
    author: "FullStackDev",
    avatar: "/user-avatar.png",
    content:
      "Been following your channel for 2 years now and the growth in content quality is insane! This video helped me optimize my app's performance by 40%. Keep up the amazing work! 🚀",
    likes: 445,
    dislikes: 2,
    timeAgo: "2 days ago",
    isLiked: false,
    isDisliked: false,
    isPinned: false,
    replies: [],
  },
  {
    id: 5,
    author: "JuniorDev2024",
    avatar: "/channel-avatar.png",
    content:
      "This is exactly what I needed for my job interview prep! The way you explain the concepts with real-world examples is perfect. Wish me luck for my interview tomorrow! 🤞",
    likes: 234,
    dislikes: 0,
    timeAgo: "3 days ago",
    isLiked: false,
    isDisliked: false,
    isPinned: false,
    replies: [
      {
        id: 107,
        author: "TechGuru Pro",
        avatar: "/channel-avatar.png",
        content:
          "Best of luck with your interview! You've got this! Let us know how it goes! 💪",
        likes: 89,
        dislikes: 0,
        timeAgo: "2 days ago",
        isLiked: false,
        isDisliked: false,
        isCreator: true,
      },
      {
        id: 108,
        author: "JuniorDev2024",
        avatar: "/user-avatar.png",
        content:
          "UPDATE: I got the job! Thank you so much for this content. It definitely helped during the technical round! 🎉",
        likes: 312,
        dislikes: 0,
        timeAgo: "1 day ago",
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
];

const relatedVideos = [
  {
    id: 1,
    title: "Advanced React Hooks You Should Know in 2024",
    channel: "TechGuru Pro",
    views: "456K",
    timeAgo: "1 week ago",
    duration: "18:42",
    thumbnail: "/video-poster.png",
  },
  {
    id: 2,
    title: "Building a Full-Stack App with Next.js 14",
    channel: "WebDev Academy",
    views: "892K",
    timeAgo: "3 days ago",
    duration: "45:23",
    thumbnail: "/video-thumbnail-concept.png",
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization Tips",
    channel: "CodeMaster Pro",
    views: "234K",
    timeAgo: "5 days ago",
    duration: "12:15",
    thumbnail: "/video-poster.png",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use What",
    channel: "DesignDev",
    views: "678K",
    timeAgo: "1 week ago",
    duration: "22:30",
    thumbnail: "/video-thumbnail-concept.png",
  },
  {
    id: 5,
    title: "TypeScript for Beginners - Complete Guide",
    channel: "LearnCode",
    views: "1.2M",
    timeAgo: "2 weeks ago",
    duration: "1:15:45",
    thumbnail: "/video-poster.png",
  },
  {
    id: 6,
    title: "React State Management in 2024",
    channel: "ReactMaster",
    views: "345K",
    timeAgo: "4 days ago",
    duration: "28:17",
    thumbnail: "/video-thumbnail-concept.png",
  },
  {
    id: 7,
    title: "Database Design Best Practices",
    channel: "DataExpert",
    views: "567K",
    timeAgo: "6 days ago",
    duration: "35:42",
    thumbnail: "/video-poster.png",
  },
  {
    id: 8,
    title: "API Security: Protecting Your Backend",
    channel: "SecurityFirst",
    views: "789K",
    timeAgo: "1 week ago",
    duration: "19:33",
    thumbnail: "/video-thumbnail-concept.png",
  },
];

export default function WatchPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        avatar: "/user-avatar.png",
        content: newComment,
        likes: 0,
        dislikes: 0,
        timeAgo: "Just now",
        isLiked: false,
        isDisliked: false,
        isPinned: false,
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleReplySubmit = (commentId: number) => {
    if (replyText.trim()) {
      const reply = {
        id: Date.now(),
        author: "You",
        avatar: "/user-avatar.png",
        content: replyText,
        likes: 0,
        dislikes: 0,
        timeAgo: "Just now",
        isLiked: false,
        isDisliked: false,
      };

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment,
        ),
      );
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const toggleCommentLike = (
    commentId: number,
    isReply = false,
    parentId?: number,
  ) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        isLiked: !reply.isLiked,
                        isDisliked: reply.isLiked ? reply.isDisliked : false,
                        likes: reply.isLiked
                          ? reply.likes - 1
                          : reply.likes + 1,
                      }
                    : reply,
                ),
              }
            : comment,
        ),
      );
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                isDisliked: comment.isLiked ? comment.isDisliked : false,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment,
        ),
      );
    }
  };

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
            <Button variant="ghost" size="icon">
              <Upload className="h-5 w-5" />
            </Button>
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
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Player Section */}
              <div className="lg:col-span-2">
                <div
                  className="relative bg-black rounded-lg overflow-hidden group"
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}>
                  <video
                    ref={videoRef}
                    className="w-full aspect-video"
                    poster="/video-poster.png?height=480&width=854&query=video poster"
                    onClick={togglePlay}>
                    <source src="/sample-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                      showControls ? "opacity-100" : "opacity-0"
                    }`}>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={togglePlay}
                          className="text-white hover:bg-white/20">
                          {isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMute}
                            className="text-white hover:bg-white/20">
                            {isMuted ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <span className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleFullscreen}
                          className="text-white hover:bg-white/20">
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="mt-4">
                  <h1 className="text-2xl font-bold mb-2">
                    Master React Hooks in 2024 - Complete Guide with Real
                    Projects
                  </h1>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-muted-foreground">
                      2,847,392 views • 4 days ago
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={isLiked ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setIsLiked(!isLiked);
                          if (isDisliked) setIsDisliked(false);
                        }}>
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {isLiked ? "187K" : "186K"}
                      </Button>
                      <Button
                        variant={isDisliked ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setIsDisliked(!isDisliked);
                          if (isLiked) setIsLiked(false);
                        }}>
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        {isDisliked ? "3.2K" : "3.1K"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="h-4 w-4 mr-2" />
                        Report
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Channel Info */}
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/channel-avatar.png?height=40&width=40&query=channel avatar" />
                        <AvatarFallback>TG</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">TechGuru Pro</h3>
                        <p className="text-sm text-muted-foreground">
                          2.4M subscribers
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={isSubscribed ? "outline" : "default"}
                      onClick={() => setIsSubscribed(!isSubscribed)}>
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </Button>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm">
                      🚀 In this comprehensive tutorial, we'll dive deep into
                      React Hooks and build 3 real-world projects from scratch!
                      Perfect for developers looking to master modern React
                      development.
                      <br />
                      <br />
                      📚 What you'll learn:
                      <br />• useState, useEffect, useContext, and custom hooks
                      <br />• Performance optimization with useMemo and
                      useCallback
                      <br />• Building a todo app, weather dashboard, and
                      e-commerce cart
                      <br />• Best practices and common pitfalls to avoid
                      <br />
                      <br />
                      🔗 Resources mentioned:
                      <br />• GitHub repo: github.com/techguru/react-hooks-guide
                      <br />• React docs: react.dev
                      <br />• My React course (50% off): techguru.dev/react
                      <br />
                      <br />⏰ Timestamps:
                      <br />
                      0:00 Introduction
                      <br />
                      2:15 useState Deep Dive
                      <br />
                      8:30 useEffect Mastery
                      <br />
                      15:45 Project 1: Todo App
                      <br />
                      28:20 Custom Hooks
                      <br />
                      35:10 Project 2: Weather Dashboard
                      <br />
                      52:30 Performance Hooks
                      <br />
                      1:05:15 Project 3: Shopping Cart
                      <br />
                      <br />
                      👍 If this helped you, please like and subscribe for more
                      React content!
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          {comments.length} Comments
                        </h2>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <SortAsc className="h-4 w-4 mr-2" />
                              Sort by {sortBy}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSortBy("top")}>
                              Top comments
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setSortBy("newest")}>
                              Newest first
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Add Comment */}
                    <div className="flex gap-3 mb-6">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/user-avatar.png" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[80px] resize-none"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setNewComment("")}>
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleCommentSubmit}
                            disabled={!newComment.trim()}>
                            Comment
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                      {comments
                        .slice(0, showAllComments ? comments.length : 3)
                        .map((comment) => (
                          <div key={comment.id} className="space-y-4">
                            <div className="flex gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={comment.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                  {comment.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm">
                                    {comment.author}
                                  </span>
                                  {comment.isPinned && (
                                    <Pin className="h-3 w-3 text-muted-foreground" />
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {comment.timeAgo}
                                  </span>
                                </div>
                                <p className="text-sm mb-2">
                                  {comment.content}
                                </p>
                                <div className="flex items-center gap-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      toggleCommentLike(comment.id)
                                    }
                                    className={`h-8 px-2 ${
                                      comment.isLiked ? "text-primary" : ""
                                    }`}>
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {comment.likes > 0 && comment.likes}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2">
                                    <ThumbsDown className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setReplyingTo(comment.id)}
                                    className="h-8 px-2">
                                    <Reply className="h-3 w-3 mr-1" />
                                    Reply
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0">
                                        <MoreVertical className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem>
                                        <Flag className="h-4 w-4 mr-2" />
                                        Report
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                {/* Reply Form */}
                                {replyingTo === comment.id && (
                                  <div className="flex gap-3 mt-4">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src="/user-avatar.png" />
                                      <AvatarFallback>You</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <Textarea
                                        placeholder={`Reply to ${comment.author}...`}
                                        value={replyText}
                                        onChange={(e) =>
                                          setReplyText(e.target.value)
                                        }
                                        className="min-h-[60px] resize-none text-sm"
                                      />
                                      <div className="flex justify-end gap-2 mt-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            setReplyingTo(null);
                                            setReplyText("");
                                          }}>
                                          Cancel
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleReplySubmit(comment.id)
                                          }
                                          disabled={!replyText.trim()}>
                                          Reply
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Replies */}
                                {comment.replies.length > 0 && (
                                  <div className="mt-4 space-y-3">
                                    {comment.replies.map((reply) => (
                                      <div
                                        key={reply.id}
                                        className="flex gap-3">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage
                                            src={
                                              reply.avatar || "/placeholder.svg"
                                            }
                                          />
                                          <AvatarFallback>
                                            {reply.author[0]}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-sm">
                                              {reply.author}
                                            </span>
                                            {reply.isCreator && (
                                              <Badge
                                                variant="secondary"
                                                className="text-xs">
                                                Creator
                                              </Badge>
                                            )}
                                            <span className="text-xs text-muted-foreground">
                                              {reply.timeAgo}
                                            </span>
                                          </div>
                                          <p className="text-sm mb-2">
                                            {reply.content}
                                          </p>
                                          <div className="flex items-center gap-4">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                toggleCommentLike(
                                                  reply.id,
                                                  true,
                                                  comment.id,
                                                )
                                              }
                                              className={`h-6 px-2 text-xs ${
                                                reply.isLiked
                                                  ? "text-primary"
                                                  : ""
                                              }`}>
                                              <ThumbsUp className="h-3 w-3 mr-1" />
                                              {reply.likes > 0 && reply.likes}
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 px-2 text-xs">
                                              <ThumbsDown className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 px-2 text-xs">
                                              <Heart className="h-3 w-3 mr-1" />
                                              Heart
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Show More Comments */}
                    {comments.length > 3 && (
                      <div className="text-center mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setShowAllComments(!showAllComments)}>
                          {showAllComments
                            ? "Show Less"
                            : `Show ${comments.length - 3} More Comments`}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar - Related Videos */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Up next</h2>
                <div className="space-y-5">
                  {relatedVideos.map((video, i) => (
                    <Link key={video.id} href={`/watch?v=${video.id}`} className="block">
                      <Card className="cursor-pointer !p-0 border-none shadow-none">
                        <CardContent className="p-0">
                          <div className="flex gap-3">
                            <div className="w-40 aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0 relative">
                              <img
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="flex-1 p-3">
                              <h3 className="font-medium text-sm line-clamp-2 mb-1">
                                {video.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mb-1">
                                {video.channel}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {video.views} views • {video.timeAgo}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
