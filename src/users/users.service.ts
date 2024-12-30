import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  // Метод для создания пользователя с проверкой на существование почты
  async create(user: Partial<CreateUserDto>): Promise<User> {
    // Проверяем, существует ли пользователь с таким email
    const existingUser = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (existingUser) {
      throw new Error('User with this email already exists'); // Генерируем исключение, если email уже занят
    }

    const defaultValues: Partial<User> = {
      phoneNumber: null,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUser = this.usersRepository.create({
      ...defaultValues,
      ...user, // Переданные данные пользователя перекрывают значения по умолчанию
    });

    return await this.usersRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    // Проверяем, существует ли пользователь с таким ID
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found'); // Генерируем исключение, если пользователь не найден
    }
    await this.usersRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    // Проверяем, существует ли пользователь с таким ID
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found'); // Генерируем исключение, если пользователь не найден
    }

    // Проверка на уникальность email при обновлении
    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findOneBy({
        email: updateUserDto.email,
      });
      if (existingUser && existingUser.id !== id) {
        throw new Error('User with this email already exists');
      }
    }

    // Обновляем только переданные поля
    const updatedUser = this.usersRepository.merge(user, updateUserDto);

    // Сохраняем изменения в базе данных
    return await this.usersRepository.save(updatedUser);
  }
}
