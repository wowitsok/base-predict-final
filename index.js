import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

const imageUrl = "https://raw.githubusercontent.com/base-org/brand-kit/main/logo/symbol/Base_Symbol_Blue.png"

// 1. Landing Page (Warpcast ise turant pakad lega)
app.get('/', (c) => {
  const host = c.req.header('host')
  return c.html(`<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${imageUrl}" />
  <meta property="fc:frame:button:1" content="Enter Prediction Market" />
  <meta property="fc:frame:post_url" content="https://${host}/api/market" />
  <meta property="og:image" content="${imageUrl}" />
</head>
<body><h1>Base Predict</h1></body>
</html>`)
})

// 2. Bet Page (Start dabane ke baad aayega)
app.post('/api/market', (c) => {
  const host = c.req.header('host')
  return c.html(`<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${imageUrl}" />
  <meta property="fc:frame:button:1" content="Bet YES (0.001 ETH)" />
  <meta property="fc:frame:button:1:action" content="tx" />
  <meta property="fc:frame:button:1:target" content="https://${host}/api/vote/yes" />
  <meta property="fc:frame:button:2" content="Bet NO (0.001 ETH)" />
  <meta property="fc:frame:button:2:action" content="tx" />
  <meta property="fc:frame:button:2:target" content="https://${host}/api/vote/no" />
</head>
</html>`)
})

// 3. Transaction Logic
app.post('/api/vote/:side', (c) => {
  return c.json({
    chainId: 'eip155:8453',
    method: 'eth_sendTransaction',
    params: {
      abi: [{ "inputs": [{ "name": "_marketId", "type": "uint256" }, { "name": "_vote", "type": "bool" }], "name": "vote", "outputs": [], "stateMutability": "payable", "type": "function" }],
      to: '0xB4085493f432B86DfE830Fed7CD94F05008671Db',
      value: '1000000000000000', 
      data: '0x',
    },
  })
})

const port = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port, hostname: '0.0.0.0' })
