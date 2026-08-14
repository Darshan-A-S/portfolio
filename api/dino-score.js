const REST_URL = process.env.KV_REST_API_URL
const REST_TOKEN = process.env.KV_REST_API_TOKEN
const KEY = "dino:scores"
const TOP_N = 50

const MISSING = { error: "KV storage not configured" }

async function kvPipeline(commands) {
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

function sanitizeName(raw) {
  const s = String(raw ?? "Anonymous").replace(/[^\w\s.-]/g, "").trim().slice(0, 20)
  return s || "Anonymous"
}

function toTop(result) {
  const rows = []
  for (let i = 0; i < (result || []).length; i += 2) {
    rows.push({ name: result[i], score: Number(result[i + 1]) })
  }
  return rows
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  if (!REST_URL || !REST_TOKEN) return res.status(503).json(MISSING)

  try {
    if (req.method === "GET") {
      const [top] = await kvPipeline([["ZREVRANGE", KEY, 0, TOP_N - 1, "WITHSCORES"]])
      return res.status(200).json({ top: toTop(top) })
    }

    if (req.method === "POST") {
      const score = Number(req.body?.score)
      if (!Number.isFinite(score) || score < 0) {
        return res.status(400).json({ error: "invalid score" })
      }
      const name = sanitizeName(req.body?.name)
      const [, rankRaw, topRaw] = await kvPipeline([
        ["ZADD", KEY, Math.round(score), name],
        ["ZREVRANK", KEY, name],
        ["ZREVRANGE", KEY, 0, TOP_N - 1, "WITHSCORES"],
      ])
      // ponytail: ZADD overwrites by name, so a player's best score sticks
      await kvPipeline([["ZREMRANGEBYRANK", KEY, 0, -(TOP_N + 1)]])
      return res.status(200).json({
        rank: typeof rankRaw === "number" ? rankRaw + 1 : null,
        score: Math.round(score),
        top: toTop(topRaw),
      })
    }

    return res.status(405).json({ error: "method not allowed" })
  } catch {
    return res.status(500).json({ error: "leaderboard failed" })
  }
}