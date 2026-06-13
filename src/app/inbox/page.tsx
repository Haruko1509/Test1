import styles from "./page.module.css";

export const metadata = {
  title: "Hộp thư – VibeReel",
  description: "Xem tin nhắn và thông báo của bạn trên VibeReel.",
};

const messages = [
  { id: "1", user: "big_buck_bunny", avatar: "B", text: "Cảm ơn bạn đã follow! 🐰", time: "2p", unread: true },
  { id: "2", user: "friday_vibes", avatar: "F", text: "Video của bạn thật tuyệt! 🔥", time: "15p", unread: true },
  { id: "3", user: "sintel_official", avatar: "S", text: "Hẹn gặp lại ở video sau nhé!", time: "1h", unread: false },
  { id: "4", user: "nature_lover", avatar: "N", text: "Bạn có muốn collab không?", time: "3h", unread: false },
  { id: "5", user: "creative_studio", avatar: "C", text: "Đẹp lắm! Like ngay thôi 💕", time: "1d", unread: false },
];

export default function InboxPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Hộp thư</h1>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.tabActive}`} id="inbox-tab-all">Tất cả</button>
        <button className={styles.tab} id="inbox-tab-unread">Chưa đọc</button>
        <button className={styles.tab} id="inbox-tab-requests">Yêu cầu</button>
      </div>

      <div className={styles.list}>
        {messages.map((msg) => (
          <div key={msg.id} className={`${styles.msgItem} ${msg.unread ? styles.unread : ""}`} id={`inbox-msg-${msg.id}`}>
            <div className={styles.msgAvatar}>
              {msg.avatar}
              {msg.unread && <div className={styles.unreadDot} />}
            </div>
            <div className={styles.msgBody}>
              <div className={styles.msgHeader}>
                <span className={styles.msgUser}>{msg.user}</span>
                <span className={styles.msgTime}>{msg.time}</span>
              </div>
              <p className={styles.msgText}>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
