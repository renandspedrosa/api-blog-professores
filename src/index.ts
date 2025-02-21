import { env } from './env'
import app from '@/app'

const PORT = env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
