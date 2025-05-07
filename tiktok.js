
export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL tidak ditemukan' });
  try {
    const apiUrl = `https://api.riicode.my.id/api/download/tiktokdl?url=${encodeURIComponent(url)}`;
    const result = await fetch(apiUrl);
    const data = await result.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghubungi API' });
  }
}
