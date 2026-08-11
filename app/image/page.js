'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('photorealistic');
  const [ratio, setRatio] = useState('1024x1024');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl('');

    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${prompt}, ${style} style`, size: ratio }),
      });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
      else setImageUrl('');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <main style={{ padding: '24px 20px', maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#0f0f0f', color: '#fff' }}>
      <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>← Home</Link>
      <h1 style={{ fontSize: 24, marginTop: 16, marginBottom: 16 }}>Image Generator</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image you want..."
        rows={3}
        style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #333', background: '#1a1a1a', color: '#fff', boxSizing: 'border-box', marginBottom: 12 }}
      />

      <label style={{ fontSize: 13, color: '#999' }}>Style</label>
      <select value={style} onChange={(e) => setStyle(e.target.value)} style={selectStyle}>
        <option value="photorealistic">Photorealistic</option>
        <option value="cinematic">Cinematic</option>
        <option value="3D render">3D Render</option>
        <option value="anime">Anime</option>
        <option value="illustration">Illustration</option>
      </select>

      <label style={{ fontSize: 13, color: '#999' }}>Aspect Ratio</label>
      <select value={ratio} onChange={(e) => setRatio(e.target.value)} style={selectStyle}>
        <option value="1024x1024">Square (1:1)</option>
        <option value="1024x1792">Portrait (9:16)</option>
        <option value="1792x1024">Landscape (16:9)</option>
      </select>

      <button onClick={generate} style={{ width: '100%', padding: 14, borderRadius: 10, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600, marginTop: 8 }}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {loading && <p style={{ color: '#666', marginTop: 16 }}>Creating your image, this can take up to 30 seconds...</p>}

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <img src={imageUrl} alt="Generated" style={{ width: '100%', borderRadius: 12 }} />
          <a href={imageUrl} download style={{ display: 'block', textAlign: 'center', marginTop: 12, padding: 12, background: '#1a1a1a', borderRadius: 10, color: '#fff', textDecoration: 'none' }}>
            Save Image
          </a>
        </div>
      )}
    </main>
  );
}

const selectStyle = {
  display: 'block',
  width: '100%',
  padding: 12,
  borderRadius: 10,
  border: '1px solid #333',
  background: '#1a1a1a',
  color: '#fff',
  marginTop: 6,
  marginBottom: 16,
};
