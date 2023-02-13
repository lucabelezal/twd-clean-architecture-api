import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

const isDebug = true
const url = isDebug ? 'mongodb://127.0.0.1' : process.env.MONGO_URL

MongoHelper.connect(url)
  .then(async () => {
    const app = (await import('./config/app')).default
    const port = process.env.PORT || 5001
    app.listen(port, () => {
      console.log('Server running at port: ' + port)
    })
  })
  .catch(console.error)
