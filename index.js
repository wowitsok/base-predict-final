import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

// Health check
app.get('/', (c) => c.text('Predict Market is LIVE and STABLE!'))

// Frame route with standard meta tags
app.get('/frame', (c) => {
  const host = c.req.header('host')
  const imageUrl = "https://emerald-glaring-marlin-155.mythic.be/api/og?title=Base%20Predict&description=Will%20ETH%20hit%20$4000?"
  const txUrl = `https://${host}/api/vote`

  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="Bet YES (0.001 ETH)" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta property="fc:frame:button:1:target" content="${txUrl}/yes" />
        <meta property="fc:frame:button:2" content="Bet NO (0.001 ETH)" />
        <meta property="fc:frame:button:2:action" content="tx" />
        <meta property="fc:frame:button:2:target" content="${txUrl}/no" />
      </head>
      <body>
        <h1>Base Predict Frame</h1>
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

const port = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port, hostname: '0.0.0.0' })
