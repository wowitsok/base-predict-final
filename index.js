import { Frog } from 'frog'
import { serve } from '@hono/node-server'

export const app = new Frog({
  title: 'Base Predict Final',
})

// Root route for health check - PURE TEXT
app.get('/', (c) => c.text('Predict Market is LIVE and STABLE!'))

// Frame route using external image to avoid JSX complexity
app.frame('/frame', (c) => {
  return c.res({
    image: 'https://emerald-glaring-marlin-155.mythic.be/api/og?title=Base%20Predict&description=Will%20ETH%20hit%20000?',
    intents: [
      { label: 'Bet YES', action: 'tx', target: '/vote/yes' },
      { label: 'Bet NO', action: 'tx', target: '/vote/no' }
    ],
  })
})

app.transaction('/vote/:side', (c) => {
  return c.res({
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
