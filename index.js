/** @jsxImportSource frog/jsx */
import { Frog, Button } from 'frog'
import { serve } from '@hono/node-server'

export const app = new Frog({
  title: 'Base Predict Final',
})

// Root route for health check
app.get('/', (c) => c.text('OK'))

app.frame('/frame', (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', flexDirection: 'column', fontSize: 60, background: '#0052ff', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <p>Will ETH hit 000?</p>
      </div>
    ),
    intents: [
      <Button.Transaction target="/vote/yes">Bet YES</Button.Transaction>,
      <Button.Transaction target="/vote/no">Bet NO</Button.Transaction>,
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
      value: 1000000000000000n, 
    },
  })
})

const port = process.env.PORT || 3000
console.log(`Server starting on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port),
  hostname: '0.0.0.0'
})
