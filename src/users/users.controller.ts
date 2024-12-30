import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Add a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.message === 'User with this email already exists') {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(+id, updateUserDto);
      if (!updatedUser) {
        return { message: `User with ID ${id} not found` };
      }
      return updatedUser;
    } catch (error) {
      if (error.message === 'User with this email already exists') {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(+id);
      return { message: 'User successfully deleted' };
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
