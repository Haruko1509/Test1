import VideoFeed from "@/components/VideoFeed/VideoFeed";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <section className={styles.page} aria-label="Video Feed">
      <VideoFeed />
    </section>
  );
}
