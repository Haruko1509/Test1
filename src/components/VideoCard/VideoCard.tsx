"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { VideoItem } from "@/types";
import { formatCount } from "@/utils/format";
import styles from "./VideoCard.module.css";

interface VideoCardProps {
  video: VideoItem;
  isActive: boolean;
  onLike: (videoId: string) => void;
  likedState: { liked: boolean; count: number };
}

export interface VideoCardHandle {
  pause: () => void;
  play: () => void;
}

const VideoCard = forwardRef<VideoCardHandle, VideoCardProps>(
  ({ video, isActive, onLike, likedState }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPlayIcon, setShowPlayIcon] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const playIconTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useImperativeHandle(ref, () => ({
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      play: () => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      },
    }));

    useEffect(() => {
      const videoEl = videoRef.current;
      if (!videoEl) return;

      if (isActive) {
        videoEl.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoEl.pause();
        setIsPlaying(false);
      }
    }, [isActive]);

    const handleVideoClick = useCallback(() => {
      const videoEl = videoRef.current;
      if (!videoEl) return;

      if (isPlaying) {
        videoEl.pause();
        setIsPlaying(false);
      } else {
        videoEl.play().catch(() => {});
        setIsPlaying(true);
      }

      setShowPlayIcon(true);
      if (playIconTimerRef.current) clearTimeout(playIconTimerRef.current);
      playIconTimerRef.current = setTimeout(() => setShowPlayIcon(false), 800);
    }, [isPlaying]);

    const handleTimeUpdate = useCallback(() => {
      const videoEl = videoRef.current;
      if (!videoEl || !videoEl.duration) return;
      setProgress((videoEl.currentTime / videoEl.duration) * 100);
    }, []);

    const handleProgressClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const videoEl = videoRef.current;
        if (!videoEl) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;
        videoEl.currentTime = ratio * videoEl.duration;
      },
      []
    );

    useEffect(() => {
      return () => {
        if (playIconTimerRef.current) clearTimeout(playIconTimerRef.current);
      };
    }, []);

    return (
      <div className={styles.card}>
        {/* Video Layer */}
        <div className={styles.videoWrapper} onClick={handleVideoClick}>
          <video
            ref={videoRef}
            src={video.videoUrl}
            className={styles.video}
            loop
            muted
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onCanPlayThrough={() => setIsLoaded(true)}
          />

          {/* Loading Skeleton */}
          {!isLoaded && (
            <div className={styles.skeleton}>
              <div className={styles.skeletonPulse} />
            </div>
          )}

          {/* Play/Pause Overlay Icon */}
          <div
            className={`${styles.playOverlay} ${showPlayIcon ? styles.playOverlayVisible : ""}`}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </div>

          {/* Gradient Overlay */}
          <div className={styles.gradientOverlay} />
        </div>

        {/* Info Overlay */}
        <div className={styles.infoOverlay}>
          {/* Author */}
          <div className={styles.authorRow}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>{video.authorAvatar}</div>
              <div className={styles.followBadge}>+</div>
            </div>
            <span className={styles.authorName}>{video.authorName}</span>
          </div>

          {/* Description */}
          <p className={styles.description}>{video.description}</p>

          {/* Song */}
          {video.song && (
            <div className={styles.songRow}>
              <span className={styles.musicNote}>🎵</span>
              <div className={styles.songTicker}>
                <span>{video.song}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Action Bar */}
        <div className={styles.actionBar}>
          {/* Like */}
          <button
            className={`${styles.actionBtn} ${likedState.liked ? styles.liked : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onLike(video.id);
            }}
            aria-label="Like video"
          >
            <div className={styles.actionIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={likedState.liked ? "#ff2d55" : "none"}
                  stroke={likedState.liked ? "#ff2d55" : "white"}
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className={styles.actionCount}>
              {formatCount(likedState.count)}
            </span>
          </button>

          {/* Comment */}
          <button
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(true);
            }}
            aria-label="Comments"
          >
            <div className={styles.actionIcon}>
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path
                  d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.actionCount}>
              {formatCount(video.commentsCount)}
            </span>
          </button>

          {/* Share */}
          <button
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              setShowShare(true);
            }}
            aria-label="Share"
          >
            <div className={styles.actionIcon}>
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path
                  d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.actionCount}>
              {formatCount(video.sharesCount)}
            </span>
          </button>

          {/* Vinyl Record */}
          <div className={styles.vinylWrap}>
            <div className={`${styles.vinyl} ${isPlaying ? styles.vinylSpin : ""}`}>
              <span className={styles.vinylChar}>{video.authorAvatar}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar} onClick={handleProgressClick}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Comment Modal */}
        {showComments && (
          <div
            className={styles.modal}
            onClick={() => setShowComments(false)}
          >
            <div
              className={styles.modalSheet}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHandle} />
              <h3 className={styles.modalTitle}>
                {formatCount(video.commentsCount)} Bình luận
              </h3>
              <div className={styles.commentList}>
                {["user_abc", "tran_thi_b", "nguyen_van_c", "pham_d"].map(
                  (u, i) => (
                    <div key={i} className={styles.commentItem}>
                      <div className={styles.commentAvatar}>
                        {u[0].toUpperCase()}
                      </div>
                      <div>
                        <span className={styles.commentUser}>{u}</span>
                        <p className={styles.commentText}>
                          {
                            [
                              "Video hay quá! 🔥🔥🔥",
                              "Đẹp lắm bạn ơi! 💕",
                              "Follow ngay thôi 😍",
                              "Tuyệt vời! Làm tiếp đi bạn 👏",
                            ][i]
                          }
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className={styles.commentInput}>
                <input
                  type="text"
                  placeholder="Thêm bình luận..."
                  className={styles.commentField}
                />
                <button className={styles.commentSend}>Gửi</button>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShare && (
          <div className={styles.modal} onClick={() => setShowShare(false)}>
            <div
              className={styles.modalSheet}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHandle} />
              <h3 className={styles.modalTitle}>Chia sẻ với</h3>
              <div className={styles.shareGrid}>
                {[
                  { icon: "💬", label: "Tin nhắn" },
                  { icon: "👥", label: "Bạn bè" },
                  { icon: "📘", label: "Facebook" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "🔗", label: "Copy link" },
                ].map((s, i) => (
                  <button key={i} className={styles.shareItem}>
                    <span className={styles.shareIcon}>{s.icon}</span>
                    <span className={styles.shareLabel}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoCard.displayName = "VideoCard";
export default VideoCard;
