import express, { Express } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import TCloudDatasource from './data-source'

class TCloudExpressApp {
  private app: Express

  constructor() {
    dotenv.config()
    this.app = express()
    this.app.use(
      cors({
        origin: ['https://t-cloud-fe.vercel.app', 'http://localhost:5173'],
        credentials: true,
      })
    )
    this.app.use(express.json())
    this.app.use(cookieParser())

    console.log('NOTI: Express app has already')
  }

  init = () => {
    new TCloudDatasource().init()
  }

  getExpressApp = () => this.app
}

const MyExpressApp = new TCloudExpressApp()

export default MyExpressApp
