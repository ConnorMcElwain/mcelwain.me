export default function handler(req, res) {
    res.json({ formbeeKey: process.env.FORMBEE_API_KEY });
  }
  