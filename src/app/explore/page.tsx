import styles from "./page.module.css";

export const metadata = {
  title: "Khám phá – VibeReel",
  description: "Khám phá nội dung video thú vị từ khắp nơi trên VibeReel.",
};

const categories = [
  { emoji: "🔥", label: "Trending" },
  { emoji: "🎵", label: "Âm nhạc" },
  { emoji: "😂", label: "Hài hước" },
  { emoji: "🍳", label: "Ẩm thực" },
  { emoji: "⚽", label: "Thể thao" },
  { emoji: "💄", label: "Làm đẹp" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "🐾", label: "Thú cưng" },
  { emoji: "✈️", label: "Du lịch" },
  { emoji: "📚", label: "Học tập" },
];

export default function ExplorePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Khám phá</h1>

      <div className={styles.searchBar}>
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm video, người dùng..."
          className={styles.searchInput}
          id="explore-search"
        />
      </div>

      <div className={styles.categories}>
        {categories.map((cat) => (
          <button key={cat.label} className={styles.catChip}>
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={styles.gridItem}>
            <div className={styles.gridThumb}>
              <div
                className={styles.gridGradient}
                style={{
                  background: `hsl(${(i * 30) % 360}, 60%, 25%)`,
                }}
              />
              <span className={styles.gridPlay}>▶</span>
              <span className={styles.gridViews}>
                {(Math.random() * 500 + 10).toFixed(0)}K
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
