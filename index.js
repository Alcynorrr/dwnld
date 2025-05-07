
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [platform, setPlatform] = useState('tiktok');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) return alert('Masukkan URL terlebih dahulu');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/${platform}?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data.result || data);
    } catch {
      alert('Gagal menghubungi server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Downloader Modern</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <div style={{
        fontFamily: 'Outfit, sans-serif',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh',
        background: 'radial-gradient(circle at 20% 20%, #1f1f1f, #0d0d0d)', color: 'white',
        padding: 20, textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Downloader</h1>
        <p>Tempel link lalu pilih platform:</p>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." style={{
          padding: 10, width: '100%', maxWidth: 400, borderRadius: 10, border: 'none', margin: '10px 0'
        }} />
        <select value={platform} onChange={e => setPlatform(e.target.value)} style={{
          padding: 10, borderRadius: 10, marginBottom: 10
        }}>
          <option value="tiktok">TikTok</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="ytmp3">YouTube MP3</option>
          <option value="ytmp4">YouTube MP4</option>
        </select>
        <button onClick={handleDownload} disabled={loading} style={{
          background: '#00C2FF', padding: '10px 20px', borderRadius: 20, border: 'none',
          color: 'black', fontWeight: 600, cursor: 'pointer'
        }}>
          {loading ? 'Loading...' : 'Download'}
        </button>

        {result && (
          <div style={{ marginTop: 20 }}>
            <h3>Hasil:</h3>
            {result.nowm && <a href={result.nowm} target="_blank">Download Tanpa WM</a>}
            {result.url && <a href={result.url} target="_blank">Download</a>}
            {result.audio && <a href={result.audio} target="_blank">MP3</a>}
            {result.video && <a href={result.video} target="_blank">MP4</a>}
          </div>
        )}
      </div>
    </>
  );
}
