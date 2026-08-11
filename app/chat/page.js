'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Error: could not get a response.' }]);
    }
    setLoading(false);
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 480, margin: '0 auto', background: '#0f0f0f' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>← Home</Link>
        <button onClick={() => setMessages([])} style={{ background: 'none', border: 'none', color: '#999' }}>New Chat</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {messages.length === 0 && <p style={{ color: '#666' }}>Say hello to start chatting.</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 16, textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 14px',
              borderRadius: 12,
              background: m.role === 'user' ? '#2563eb' : '#1a1a1a',
              color: '#fff',
              maxWidth: '80%',
              whiteSpace: 'pre-wrap',
            }}>{m.content}</span>
          </div>
        ))}
        {loading && <p style={{ color: '#666' }}>Thinking...</p>}
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #222', display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Message AI Studio..."
          style={{ flex: 1, padding: 12, borderRadius: 10, border: '1px solid #333', background: '#1a1a1a', color: '#fff' }}
        />
        <button onClick={sendMessage} style={{ padding: '0 18px', borderRadius: 10, background: '#2563eb', color: '#fff', border: 'none' }}>Send</button>
      </div>
    </main>
  );
}
