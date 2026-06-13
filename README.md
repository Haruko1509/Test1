# VibeReel – Vertical Short Video Feed

> A TikTok-style vertical scroll video feed built with **Next.js 15 App Router** + **TypeScript** + **CSS Modules**.

---

## 🚀 Live Demo

- **Vercel**: [https://test-nguyenkhanhduong-998.vercel.app](https://test-nguyenkhanhduong-998.vercel.app)
- **Demo Video**: *(Google Drive link here)*

---

## ✨ Features

### Core (Bắt buộc)
- **Vertical Scroll Layout** – Mỗi video chiếm toàn màn hình (mobile) hoặc khung 9:16 cố định ở giữa (PC)
- **Video Player** – Click để Play/Pause có animation overlay icon
- **Author Info** – Tên tác giả, mô tả, nút tương tác bên phải (Tim, Bình luận, Chia sẻ)
- **Mock Data** – 5 video objects với `id`, `videoUrl`, `authorName`, `description`, `likesCount`

### Bonus (Điểm cộng)
- ✅ **Auto-play on scroll** – Intersection Observer API
- ✅ **Like State** – Nút Tim đổi màu đỏ và tăng/giảm count
- ✅ **Navigation** – Sidebar (PC) + Bottom Nav (Mobile)
- ✅ **Progress Bar** – Thanh tiến độ video có thể click
- ✅ **Vinyl animation** – Đĩa than quay khi video đang phát
- ✅ **Comment & Share Modals** – Bottom sheet UI
- ✅ **Dot Indicators** – Điều hướng nhanh giữa các video

---

## 🧠 Giải thích logic Play/Pause khi cuộn

### 1. Scroll Snap (CSS)
```css
.feedContainer {
  scroll-snap-type: y mandatory;
}
.feedItem {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```
CSS `scroll-snap` đảm bảo mỗi lần cuộn chỉ dừng đúng tại đầu một video, tạo hiệu ứng cuộn từng video một (snapping).

### 2. Intersection Observer API (Auto-play)
```ts
// VideoFeed.tsx – dùng 1 observer duy nhất cho tất cả video items
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) setActiveIndex(idx); // video vào tầm nhìn 70% → active
        }
      });
    },
    { threshold: 0.7 }
  );

  itemRefs.current.forEach((el) => el && observer.observe(el));
  return () => observer.disconnect(); // cleanup khi unmount
}, []);
```
Thay vì tạo N observer riêng lẻ (tốn bộ nhớ), chỉ dùng **1 `IntersectionObserver` chung** observe tất cả các `video-item`. Khi bất kỳ item nào vào viewport ≥ 70%, `activeIndex` được cập nhật → trigger play/pause tương ứng.

### 3. Video Play/Pause theo `activeIndex`
```ts
// VideoCard.tsx
useEffect(() => {
  if (isActive) {
    videoRef.current?.play();
    setIsPlaying(true);
  } else {
    videoRef.current?.pause();
    setIsPlaying(false);
  }
}, [isActive]);
```
Prop `isActive` (= `activeIndex === idx`) truyền từ `VideoFeed` xuống `VideoCard`. Mỗi khi `activeIndex` thay đổi, video đang active sẽ tự động `play()`, còn các video khác sẽ `pause()`.

### 4. Click để Toggle Play/Pause (thủ công)
```ts
const handleVideoClick = () => {
  if (isPlaying) {
    videoRef.current?.pause();
  } else {
    videoRef.current?.play();
  }
  setIsPlaying(!isPlaying);
  // Hiện icon overlay tạm thời 800ms
};
```

### 5. Wheel-based Snap Scroll
```ts
const handleWheel = (e) => {
  e.preventDefault();
  if (e.deltaY > 0) scrollToIndex(activeIndex + 1);
  else scrollToIndex(activeIndex - 1);
};
```
Bắt sự kiện `wheel` và gọi `scrollIntoView({ behavior: 'smooth' })` để cuộn mượt đến video tiếp theo/trước. Có `isScrollingRef` lock để tránh cuộn nhanh quá.

---

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── layout.tsx          # Root layout + Navigation
│   ├── globals.css         # Design system tokens & global styles
│   ├── page.tsx            # Home page
│   ├── explore/            # Trang Khám phá
│   ├── profile/            # Trang Hồ sơ
│   ├── inbox/              # Trang Hộp thư
│   └── upload/             # Trang Đăng video
├── components/
│   ├── VideoCard/          # Video player component + CSS Module
│   ├── VideoFeed/          # Scroll feed + IntersectionObserver
│   └── Navigation/         # Sidebar + Bottom Nav
├── data/
│   └── mockVideos.ts       # Mock data (5 videos)
├── types/
│   └── index.ts            # TypeScript interfaces
└── utils/
    └── format.ts           # Utility: formatCount (K, M)
```

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules (Vanilla CSS) |
| Font | Inter (Google Fonts) |
| Auto-play | Intersection Observer API |
| Deployment | Vercel |

---

## 🏃 Chạy local

```bash
npm install
npm run dev
# Mở http://localhost:3000
```
