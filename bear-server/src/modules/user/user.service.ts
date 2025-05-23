import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileModel: Repository<ProfileEntity>,
  ) { }

  async create(createUserDto: CreateUserDto, generateProfile: boolean = false) {
    return await this.userModel.manager.transaction(async (manager) => {
      const userExist = await this.userModel.findOne({ where: { username: createUserDto.username } });
      if (userExist) {
        throw new HttpException('用户名已存在', 500);
      }
      const createUser = manager.create(UserEntity, {
        ...createUserDto,
      });
      const user = await manager.save(createUser);
      console.log('createUser:', createUser);
      let createProfile: ProfileEntity;
      if (!generateProfile) {
        createProfile = await manager.create(ProfileEntity, {
          nickName: createUserDto.username,
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELDaNDc4xUNriasQXMbtvrwGs8sUsyuic1IpOlvMeEaCFrMVqiaK82d05MpGIOyBXlJQibIZXhVB8YRoB7W6BeYvdgw5JNibic4TC7364jQfLzSBrPA/132',
          userId: createUser.id
        })
      } else {
        const { username, password, ...rest } = createUserDto;
        createProfile = manager.create(ProfileEntity, {
          ...rest,
        });
      }
      const profile = await manager.save(createProfile);
      console.log('profile:', profile);
      return {
        ...user,
        profile
      }
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {
    try {
      return this.userModel.findOne({ where: { username } });
    } catch (error) {
      throw error;
    }
  }
  async getUserInfo(userId: string) {
    try {
      console.log('userId:', userId);
      if(isEmpty(userId)){
        throw new HttpException('用户ID不能为空', 500);
      }
      let user = await this.profileModel.findOne({ where: { userId } });
      console.log('user:', user);
      
      if (!user) {
        throw new HttpException('用户不存在', 500);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
