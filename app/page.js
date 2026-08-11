'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '24px 20px', maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>AI Studio</h1>
      <p style={{ color: '#999', marginBottom: 32 }}>Your all-in-one AI assistant</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Link href="/chat" style={btnStyle}>💬 Start Chat</Link>
        <Link href="/solve" style={btnStyle}>🧠 Solve Problem</Link>
        <Link href="/image" style={btnStyle}>🎨 Generate Image</Link>
      </div>
    </main>
  );
}

const btnStyle = {
  display: 'block',
  padding: '18px 20px',
  background: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: 14,
  color: '#fff',
  textDecoration: 'none',
  fontSize: 17,
  fontWeight: 600,
};
