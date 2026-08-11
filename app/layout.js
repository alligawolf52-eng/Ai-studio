export const metadata = {
  title: 'AI Studio',
  description: 'Your all-in-one AI assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0f0f0f', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
