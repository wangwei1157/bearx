import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Generated, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

@Entity('user')
export class UserEntity extends CommonEntity {

  // @PrimaryColumn({comment:'用户ID'})
  // @Generated('uuid')
  // @PrimaryGeneratedColumn('uuid', { comment: '用户ID', })
  // id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '用户密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: false,
    comment: '用户角色',
  })
  role: string;

  @Column({
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: '用户状态（1-正常，其他-异常）',
  })
  status: number;
  
}
