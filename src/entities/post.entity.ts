import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PostStatusEnum } from './enums/post-status'
import { PostTypeEnum } from './enums/post-type.enum'
import { User } from './user.entity'

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @ManyToOne(() => User, (user) => user.posts)
  user!: User

  @Column({ name: 'file_name' })
  fileName!: string

  @Column({ name: 'file_url' })
  fileUrl!: string

  @Column({ name: 'file_size' })
  fileSize!: string

  @Column()
  type!: PostTypeEnum

  @Column({ name: 'created_at', default: new Date().toISOString() })
  createdAt?: string

  @Column({ default: PostStatusEnum.DEFAULT })
  status?: PostStatusEnum
}
