import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminCreateUserDto } from './dto/create-user.dto';
import { AdminUpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';
import { hashPassword } from 'src/_common/utils/hashing';
import { CustomResponse } from 'src/_common/res/response';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} is not found`);
    }
    return user;
  }

  async findByCode(code: string): Promise<User> {
    const user = await this.usersRepository.findByCode(code);
    if (!user) {
      throw new NotFoundException(`User #${code} is not found`);
    }
    return user;
  }

  async create(createUserDto: AdminCreateUserDto): Promise<User> {
    const isExist = await this.usersRepository.findByCode(createUserDto.code);
    if (isExist) {
      throw new ConflictException('User already exists');
    }
    const passwordHash = await hashPassword(createUserDto.passwordHash);
    return this.usersRepository.create({
      ...createUserDto,
      passwordHash,
    });
  }

  async update(id: number, updateUserDto: AdminUpdateUserDto): Promise<User> {
    const isExist = await this.usersRepository.findOne(id);
    if (!isExist) {
      throw new NotFoundException(`User #${id} is not found`);
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<CustomResponse> {
    const isExist = this.usersRepository.findOne(id);
    if (!isExist) {
      throw new NotFoundException(`User #${id} is not found`);
    }
    return this.usersRepository.remove(id);
  }

  async checkIfCodeExists(code: string) {
    const isExist = await this.usersRepository.findByCode(code);
    if (!isExist) {
      return {
        exists: false,
      };
    } else {
      return {
        exists: true,
      };
    }
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
