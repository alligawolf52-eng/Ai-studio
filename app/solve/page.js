'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Solve() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function solve() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: `Solve this step by step, showing your work clearly, then give a final answer at the end: ${question}` },
          ],
        }),
      });
      const data = await res.json();
      setAnswer(data.reply);
    } catch (err) {
      setAnswer('Error: could not get a response.');
    }
    setLoading(false);
  }

  return (
    <main style={{ padding: '24px 20px', maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#0f0f0f', color: '#fff' }}>
      <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>← Home</Link>
      <h1 style={{ fontSize: 24, marginTop: 16, marginBottom: 16 }}>Problem Solver</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter a math, science, logic, or coding problem..."
        rows={4}
        style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #333', background: '#1a1a1a', color: '#fff', boxSizing: 'border-box', marginBottom: 12 }}
      />

      <button onClick={solve} style={{ width: '100%', padding: 14, borderRadius: 10, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600 }}>
        {loading ? 'Solving...' : 'Solve'}
      </button>

      {answer && (
        <div style={{ marginTop: 20, padding: 16, background: '#1a1a1a', borderRadius: 12, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {answer}
        </div>
      )}
    </main>
  );
}
