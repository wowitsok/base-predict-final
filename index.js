import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

// Standard 1.91:1 Image URL
const imageUrl = "https://images.mirror-media.xyz/publication-images/cg9Y89I_W7tx7787GIsS0.png"

app.get('/', (c) => {
  const host = c.req.header('host')
  const domain = `https://${host}`
  
  return c.html(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Base Predict</title>
  <meta property="og:title" content="Base Predict" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${imageUrl}" />
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  <meta property="fc:frame:button:1" content="Bet YES" />
  <meta property="fc:frame:button:1:action" content="tx" />
  <meta property="fc:frame:button:1:target" content="${domain}/api/vote/yes" />
  <meta property="fc:frame:button:2" content="Bet NO" />
  <meta property="fc:frame:button:2:action" content="tx" />
  <meta property="fc:frame:button:2:target" content="${domain}/api/vote/no" />
  <meta property="fc:frame:post_url" content="${domain}/api/nothing" />
</head>
<body>
  <h1>Base Predict is Live</h1>
</body>
</html>`)
})

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

app.post('/api/nothing', (c) => c.json({ message: 'ok' }))

const port = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port, hostname: '0.0.0.0' })
