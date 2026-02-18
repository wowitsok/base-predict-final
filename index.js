import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

app.onError((err, c) => {
  console.error(err)
  return c.text(`Error: ${err.message}`, 500)
})

app.get('/', (c) => c.text('Predict Market is LIVE and STABLE!'))

app.get('/frame', (c) => {
  return c.html('<!DOCTYPE html><html><head><meta property="fc:frame" content="vNext"/><meta property="fc:frame:image" content="https://emerald-glaring-marlin-155.mythic.be/api/og?title=Base%20Predict"/><meta property="fc:frame:button:1" content="BET YES"/><meta property="fc:frame:button:1:action" content="tx"/><meta property="fc:frame:button:1:target" content="https://' + c.req.header('host') + '/api/vote/yes"/></head><body><h1>Frame</h1></body></html>')
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

const port = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port, hostname: '0.0.0.0' })
