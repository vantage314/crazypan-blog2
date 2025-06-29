"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LikeButtonProps {
  initialLikes: number
}

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className="h-8 px-2 text-white/80 hover:text-red-500 transition-colors"
    >
      <Heart className={`h-4 w-4 mr-1 transition-all ${isLiked ? "fill-red-500 text-red-500 scale-110" : ""}`} />
      <span className="text-xs">{likes}</span>
    </Button>
  )
}
