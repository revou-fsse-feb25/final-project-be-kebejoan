import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { CustomResponse } from 'src/_common/res/response';
import { JwtAuthGuard } from 'src/_common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/_common/guards/role.guard';
import { Roles } from 'src/_common/decorators/roles.decorator';

// @UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Check if code exists' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      required: ['exists'],
      properties: {
        exists: { type: 'boolean', example: true },
      },
      example: { exists: true }, // valid in Nest's OpenAPI helper
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Get('/check/:code')
  async checkIfCodeExists(@Param('code') code: string) {
    return this.usersService.checkIfCodeExists(code);
  }

  @ApiOperation({ summary: 'Get one user by code [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success get one user',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Get('/code/:code')
  async findByCode(@Param('code') code: string) {
    const res = await this.usersService.findByCode(code);
    return plainToInstance(UserEntity, res);
  }

  @ApiOperation({ summary: 'Create one user [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success create one user',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);
    return plainToInstance(UserEntity, res);
  }

  @ApiOperation({ summary: 'Get all users [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many users',
    type: UserEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Get()
  async findAll() {
    const res = await this.usersService.findAll();
    return plainToInstance(UserEntity, res);
  }

  @ApiOperation({ summary: 'Get one user by id [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success get one user',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.usersService.findOne(+id);
    return plainToInstance(UserEntity, res);
  }

  @ApiOperation({ summary: 'Update one user [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success update one user',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = await this.usersService.update(+id, updateUserDto);
    return plainToInstance(UserEntity, res);
  }

  @ApiOperation({ summary: 'Delete one user [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success delete one user',
    type: CustomResponse,
    example: {
      status: 200,
      message: 'User #1 has been deleted',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
