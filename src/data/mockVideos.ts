import { VideoItem } from "@/types";

export const mockVideos: VideoItem[] = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "@big_buck_bunny",
    authorAvatar: "B",
    description:
      "🐰 Big Buck Bunny - Chú thỏ dễ thương nhất thế giới! Hành trình phiêu lưu kỳ thú trong rừng xanh 🌿✨ #BigBuckBunny #Animation #Cute",
    likesCount: 125400,
    commentsCount: 3200,
    sharesCount: 8900,
    song: "♪ Nhạc nền vui nhộn - Big Buck Bunny OST",
  },
  {
    id: "2",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "@friday_vibes",
    authorAvatar: "F",
    description:
      "🎉 Friday feeling is real! Cuối tuần đã đến rồi, hãy cùng nhảy múa và tận hưởng! 💃🕺 #Friday #Weekend #Vibes #Dance",
    likesCount: 89200,
    commentsCount: 1500,
    sharesCount: 5600,
    song: "♪ Friday Night - Electronic Mix",
  },
  {
    id: "3",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "@sintel_official",
    authorAvatar: "S",
    description:
      "🐉 Sintel - Cuộc hành trình tìm kiếm người bạn nhỏ của cô gái trẻ dũng cảm. Bộ phim ngắn hoạt hình 3D đẹp nhất từ Blender Foundation 🎬🔥",
    likesCount: 342000,
    commentsCount: 12800,
    sharesCount: 45000,
    song: "♪ Epic Dragon Theme - Sintel Soundtrack",
  },
  {
    id: "4",
    // Fixed: was duplicate of id "1" (mov_bbb.mp4) — now uses a distinct URL
    videoUrl: "https://media.w3.org/2010/05/video/movie_300.mp4",
    authorName: "@nature_lover",
    authorAvatar: "N",
    description:
      "🌸 Thiên nhiên tươi đẹp mỗi ngày! Những khoảnh khắc bình yên giữa cuộc sống bận rộn 🍃🌺 Hãy trân trọng từng phút giây! #Nature #Peaceful #Life",
    likesCount: 67800,
    commentsCount: 890,
    sharesCount: 3200,
    song: "♪ Nature Sounds - Relaxing Music",
  },
  {
    id: "5",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "@creative_studio",
    authorAvatar: "C",
    description:
      "✨ Sáng tạo không có giới hạn! Xem thử clip đặc biệt này nhé 🎨🎭 Đừng quên follow để xem thêm nhiều nội dung hay ho! #Creative #Art #Studio",
    likesCount: 198500,
    commentsCount: 5600,
    sharesCount: 22000,
    song: "♪ Creative Flow - Lo-fi Beats",
  },
];
