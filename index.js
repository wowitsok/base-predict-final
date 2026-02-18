import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

// Root route - This MUST return HTML for Farcaster
app.get('/', (c) => {
  const host = c.req.header('host')
  const domain = `https://${host}`
  
  // High-reliability Base logo
  const imageUrl = "https://images.mirror-media.xyz/publication-images/cg9Y89I_W7tx7787GIsS0.png"

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Base Predict</title>
      
      <!-- Farcaster Frame Tags -->
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${imageUrl}" />
      <meta property="fc:frame:post_url" content="${domain}/api/callback" />
      
      <meta property="fc:frame:button:1" content="Bet YES" />
      <meta property="fc:frame:button:1:action" content="tx" />
      <meta property="fc:frame:button:1:target" content="${domain}/api/vote/yes" />
      
      <meta property="fc:frame:button:2" content="Bet NO" />
      <meta property="fc:frame:button:2:action" content="tx" />
      <meta property="fc:frame:button:2:target" content="${domain}/api/vote/no" />

      <!-- OpenGraph Tags -->
      <meta property="og:title" content="Base Predict Market" />
      <meta property="og:image" content="${imageUrl}" />
    </head>
    <body>
      <h1>Base Predict is LIVE!</h1>
      <p>Use a Farcaster client like Warpcast to interact with this frame.</p>
    </body>
    </html>
  `)
})

// Transaction endpoint
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

// Callback to handle after-transaction state
app.post('/api/callback', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://images.mirror-media.xyz/publication-images/cg9Y89I_W7tx7787GIsS0.png" />
        <meta property="fc:frame:button:1" content="Transaction Sent! ✅" />
      </head>
    </html>
  `)
})

const port = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port, hostname: '0.0.0.0' })
