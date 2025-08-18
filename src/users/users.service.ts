import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExist = await this.usersRepository.findByCode(createUserDto.code);
    if (isExist) {
      throw new ConflictException('User already exists');
    }
    const passwordHash = await hashPassword(createUserDto.password);
    const modifiedUserDto = {
      ...createUserDto,
      passwordHash: passwordHash,
      password: undefined,
    };
    return this.usersRepository.create(modifiedUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const isUserExist = await this.usersRepository.findOne(id);
    if (!isUserExist) {
      throw new NotFoundException(`User #${id} is not found`);
    }
    if (updateUserDto.code) {
      const isCodeExist = await this.usersRepository.findByCode(
        updateUserDto.code
      );
      if (isCodeExist) {
        throw new ConflictException('User already exists');
      }
    }
    if (updateUserDto.password) {
      const passwordHash = await hashPassword(updateUserDto.password);
      const modifiedUserDto = {
        ...updateUserDto,
        passwordHash: passwordHash,
        password: undefined,
      };
      return this.usersRepository.update(id, modifiedUserDto);
    } else {
      return this.usersRepository.update(id, updateUserDto);
    }
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
}
