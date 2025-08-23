"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Upload,
  X,
  Menu,
  Search,
  Bell,
  User,
  CloudUpload,
  FileVideo,
  Eye,
  EyeOff,
} from "lucide-react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: "public",
    thumbnail: null as File | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      // Auto-generate title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setVideoData((prev) => ({ ...prev, title: fileName }));
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setVideoData((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // TODO: Implement actual upload logic
    console.log("Uploading video:", { selectedFile, videoData });
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Video</h1>
          <p className="text-muted-foreground">
            Share your content with the world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Select Video File</CardTitle>
                <CardDescription>
                  Choose a video file to upload to your channel
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedFile ? (
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}>
                    <CloudUpload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      Drag and drop video files to upload
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Or click to browse your files
                    </p>
                    <Button>Select Files</Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <FileVideo className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={removeFile}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Video Details Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Video Details</CardTitle>
                <CardDescription>
                  Add information about your video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter video title"
                    value={videoData.title}
                    onChange={(e) =>
                      setVideoData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell viewers about your video"
                    rows={4}
                    value={videoData.description}
                    onChange={(e) =>
                      setVideoData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={videoData.category}
                    onValueChange={(value) =>
                      setVideoData((prev) => ({ ...prev, category: value }))
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="news">News & Politics</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="travel">Travel & Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={videoData.visibility}
                    onValueChange={(value) =>
                      setVideoData((prev) => ({ ...prev, visibility: value }))
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value="unlisted">
                        <div className="flex items-center gap-2">
                          <EyeOff className="h-4 w-4" />
                          Unlisted
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <EyeOff className="h-4 w-4" />
                          Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Custom Thumbnail</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="flex-1">
                      {videoData.thumbnail
                        ? videoData.thumbnail.name
                        : "Choose thumbnail"}
                    </Button>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="flex-1">
                {isUploading ? "Uploading..." : "Upload Video"}
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
