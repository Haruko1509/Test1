"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { mockVideos } from "@/data/mockVideos";
import { LikeState } from "@/types";
import VideoCard from "@/components/VideoCard/VideoCard";
import styles from "./VideoFeed.module.css";

export default function VideoFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likeStates, setLikeStates] = useState<LikeState>(() => {
    const init: LikeState = {};
    mockVideos.forEach((v) => {
      init[v.id] = { liked: false, count: v.likesCount };
    });
    return init;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingRef = useRef(false);

  // ── Single shared IntersectionObserver for auto-play ────────────────────
  // Using one observer instead of N observers to reduce memory overhead.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            const idx = itemRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.7 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ── Snap Scroll: wheel / touch ───────────────────────────────────────────
  const scrollToIndex = useCallback((idx: number) => {
    const el = itemRefs.current[idx];
    if (!el || isScrollingRef.current) return;
    isScrollingRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      if (e.deltaY > 0 && activeIndex < mockVideos.length - 1) {
        scrollToIndex(activeIndex + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        scrollToIndex(activeIndex - 1);
      }
    },
    [activeIndex, scrollToIndex]
  );

  // ── Like Toggle ──────────────────────────────────────────────────────────
  const handleLike = useCallback((videoId: string) => {
    setLikeStates((prev) => {
      const current = prev[videoId];
      return {
        ...prev,
        [videoId]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1,
        },
      };
    });
  }, []);

  return (
    <div className={styles.feedWrapper}>
      <div
        ref={containerRef}
        className={styles.feedContainer}
        onWheel={handleWheel}
      >
        {mockVideos.map((video, idx) => (
          <div
            key={video.id}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className={styles.feedItem}
            id={`video-item-${video.id}`}
          >
            <VideoCard
              video={video}
              isActive={activeIndex === idx}
              onLike={handleLike}
              likedState={likeStates[video.id]}
            />
          </div>
        ))}

        {/* Dot Indicators */}
        <div className={styles.dotNav}>
          {mockVideos.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${activeIndex === idx ? styles.dotActive : ""}`}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to video ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
