import { DataSource } from 'typeorm'
import { Post } from '../entities/post.entity'
import { User } from '../entities/user.entity'

class MyDatasource {
  private datasource: DataSource

  constructor() {
    this.datasource = new DataSource({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: true,
      logging: false,
      entities: [User, Post],
      poolSize: 5,
    })
  }

  getDataSource = () => this.datasource

  init = async () => {
    try {
      await this.datasource.initialize()
      console.log('NOTI: Datasource has already')
    } catch (error) {
      console.log(error)
    }
  }
}

export default MyDatasource
