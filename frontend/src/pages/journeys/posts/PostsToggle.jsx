import { useState } from "react";
import { motion } from "framer-motion";
import PostsIcon from "../../../assets/icons/posts.svg?react";
import ArrowIcon from "../../../assets/icons/arrow-right.svg?react";
import "./posts.css";

const MotionArrow = motion.create(ArrowIcon);
export default function PostsToggle() {
  const [showPosts, setShowPosts] = useState(false);
  return (
    <button className="toggle-posts" onClick={() => setShowPosts(!showPosts)}>
      <MotionArrow
        className="w-3.5 h-3.5 mr-2"
        animate={{ rotate: showPosts ? 90 : 0 }}
      />
      <p className="text-[1.3rem]">Posts</p>
      <PostsIcon className="w-6 h-6 ml-auto" />
    </button>
  );
}
