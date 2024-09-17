import { env } from './env'
import app from '@/app'

const PORT = env.PORT
const errar = 123

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
