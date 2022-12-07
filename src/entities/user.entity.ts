import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { createRandomHEXColor } from '../utils/create-random-HEX-color'
import { UserStatusEnum } from './enums/user-status.enum'
import { Post } from './post.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ name: 'full_name' })
  fullName!: string

  @Column()
  phone!: string

  @Column()
  password!: string

  @Column({ default: createRandomHEXColor() })
  avatar?: string

  @Column({ default: UserStatusEnum.ACTIVE })
  status?: UserStatusEnum

  @Column({ default: new Date().toISOString(), name: 'created_at' })
  createdAt?: string

  @Column({ type: 'int', default: 0, name: 'token_version' })
  tokenVersion?: number

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[]
}
