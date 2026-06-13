import styles from "./page.module.css";

export const metadata = {
  title: "Hồ sơ – VibeReel",
  description: "Xem hồ sơ và video đã đăng của bạn trên VibeReel.",
};

const stats = [
  { value: "128", label: "Đang theo dõi" },
  { value: "4.2K", label: "Người theo dõi" },
  { value: "89.5K", label: "Lượt thích" },
];

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      {/* Cover */}
      <div className={styles.cover}>
        <div className={styles.coverGradient} />
      </div>

      {/* Profile Info */}
      <div className={styles.profileInfo}>
        <div className={styles.avatar}>U</div>
        <h1 className={styles.name}>User Demo</h1>
        <p className={styles.handle}>@vibereels</p>
        <p className={styles.bio}>
          🎬 Creator | 🎵 Music lover | 🌍 Traveler
          <br />
          Chia sẻ những khoảnh khắc đẹp nhất cuộc sống ✨
        </p>

        <div className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.actionRow}>
          <button className={styles.editBtn} id="profile-edit-btn">Chỉnh sửa hồ sơ</button>
          <button className={styles.shareBtn} id="profile-share-btn">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.tabActive}`} id="profile-tab-videos">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M8 9l8 3-8 3V9z" fill="currentColor" />
          </svg>
        </button>
        <button className={styles.tab} id="profile-tab-liked">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button className={styles.tab} id="profile-tab-saved">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.videoGrid}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className={styles.videoThumb}>
            <div
              className={styles.thumbBg}
              style={{ background: `hsl(${(i * 40 + 200) % 360}, 50%, 22%)` }}
            />
            <span className={styles.thumbPlay}>▶</span>
            <span className={styles.thumbViews}>{(i * 12 + 5)}K</span>
          </div>
        ))}
      </div>
    </div>
  );
}
