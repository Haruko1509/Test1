import styles from "./page.module.css";

export const metadata = {
  title: "Đăng video – VibeReel",
  description: "Chia sẻ video của bạn với cộng đồng VibeReel.",
};

export default function UploadPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Đăng video</h1>

      <div className={styles.uploadArea} id="upload-dropzone">
        <div className={styles.uploadIcon}>📹</div>
        <p className={styles.uploadText}>Kéo thả video vào đây</p>
        <p className={styles.uploadSub}>hoặc</p>
        <label className={styles.uploadBtn} htmlFor="file-input">
          Chọn file
          <input id="file-input" type="file" accept="video/*" className={styles.hiddenInput} />
        </label>
        <p className={styles.uploadHint}>MP4, WebM, MOV tối đa 500MB</p>
      </div>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="upload-title">Tiêu đề</label>
          <input id="upload-title" type="text" className={styles.input} placeholder="Thêm tiêu đề cho video..." />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="upload-desc">Mô tả & Hashtag</label>
          <textarea id="upload-desc" className={styles.textarea} placeholder="#VibeReel #video #creator..." rows={3} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="upload-privacy">Quyền riêng tư</label>
          <select id="upload-privacy" className={styles.select}>
            <option value="public">Công khai</option>
            <option value="friends">Bạn bè</option>
            <option value="private">Riêng tư</option>
          </select>
        </div>
        <button className={styles.submitBtn} id="upload-submit-btn">
          Đăng ngay 🚀
        </button>
      </div>
    </div>
  );
}
