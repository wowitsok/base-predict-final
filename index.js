import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

// Root route for health check
app.get('/', (c) => c.text('Predict Market is LIVE and STABLE!'))

// Frame route - serving raw HTML for maximum stability
app.get('/frame', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://emerald-glaring-marlin-155.mythic.be/api/og?title=Base%20Predict&description=Will%20ETH%20hit%20000?" />
        <meta property="fc:frame:button:1" content="Bet YES (0.001 ETH)" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta property="fc:frame:button:1:target" content="${process.env.RAILWAY_PUBLIC_DOMAIN ? 'https://' + process.env.RAILWAY_PUBLIC_DOMAIN : ''}/api/vote/yes" />
        <meta property="fc:frame:button:2" content="Bet NO (0.001 ETH)" />
        <meta property="fc:frame:button:2:action" content="tx" />
        <meta property="fc:frame:button:2:target" content="${process.env.RAILWAY_PUBLIC_DOMAIN ? 'https://' + process.env.RAILWAY_PUBLIC_DOMAIN : ''}/api/vote/no" />
      </head>
      <body>
        <h1>Base Prediction Frame</h1>
      </body>
    </html>
  `)
})

// Transaction routes
app.post('/api/vote/:side', (c) => {
  return c.json({
    chainId: 'eip155:8453',
    method: 'eth_sendTransaction',
    params: {
      abi: [
        {
          "inputs": [
            { "internalType": "uint256", "name": "_marketId", "type": "uint256" },
            { "internalType": "bool", "name": "_vote", "type": "bool" }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ],
      to: '0xB4085493f432B86DfE830Fed7CD94F05008671Db',
      value: '1000000000000000', 
      data: '0x',
    },
  })
})

const port = Number(process.env.PORT) || 3000
console.log(`Server starting on port ${port}`)

serve({
  fetch: app.fetch,
  port: port,
  hostname: '0.0.0.0'
})
