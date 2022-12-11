import 'reflect-metadata'
import MyExpressApp from './class/express-app'
import { DEFAULT_API } from './constants/api.constant'
import authRouter from './routes/auth.route'
import postRoute from './routes/post.route'
import refreshTokenRoute from './routes/refresh-token.route'
import userRoute from './routes/user.route'

MyExpressApp.init()

const app = MyExpressApp.getExpressApp()

const PORT = process.env.PORT || 8000

app.use(`${DEFAULT_API}/auth`, authRouter)
app.use(`${DEFAULT_API}`, refreshTokenRoute)
app.use(`${DEFAULT_API}/user`, userRoute)
app.use(`${DEFAULT_API}/posts`, postRoute)

app.listen(PORT, () => {
  console.log(`NOTI: TCloud server is running on http://localhost:${PORT}`)
})
