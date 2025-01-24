import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AccountStatus } from '../../common/variable.utils';

@Entity('UserInfo')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  email: string;

  @Column({ length: 40 })
  phoneNumber: string;

  @Column({ length: 256 })
  password: string;

  @Column({ length: 20 })
  nickname: string;

  @Column({ length: 20, default: AccountStatus.ACTIVE, nullable: false })
  accountStatus: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @Column({ default: 'ACTIVE' })
  status: string;
}
