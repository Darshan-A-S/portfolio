const REST_URL = process.env.KV_REST_API_URL
const REST_TOKEN = process.env.KV_REST_API_TOKEN
const TTL_SECONDS = 3600 // ponytail: 1h cache, lower if streak feels stale

async function kv(commands) {
  const res = await fetch(`${REST_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  })
  if (!res.ok) throw new Error(`kv ${res.status}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.map((r) => r.result ?? null)
}

async function fetchLeetcode(body) {
  const leetcodeRes = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com/Darshan_as/",
      Origin: "https://leetcode.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    },
    body,
  });
  return leetcodeRes.json();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const body = JSON.stringify(req.body)

    if (REST_URL && REST_TOKEN && req.method === "POST") {
      const key = "leetcode:" + Buffer.from(body).toString("base64url").slice(0, 200)
      const [cached] = await kv([["GET", key]])
      if (cached) {
        return res.status(200).json(JSON.parse(cached))
      }
      const data = await fetchLeetcode(body);
      await kv([["SET", key, JSON.stringify(data), "EX", String(TTL_SECONDS)]])
      return res.status(200).json(data);
    }

    const data = await fetchLeetcode(body);
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }
}
