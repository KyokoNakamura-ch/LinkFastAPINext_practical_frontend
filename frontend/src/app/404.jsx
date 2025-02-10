export default function Custom404() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - ページが見つかりません</h1>
      <p>お探しのページは存在しないか、削除されました。</p>
      <a href="/" style={{ textDecoration: "none", color: "blue" }}>
        ホームに戻る
      </a>
    </div>
  );
}
