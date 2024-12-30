import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';
import { Public } from '../auth/decorators/public.decorator';
import { ApiBody } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  async findOneById(
    @Param('id') id: number
  ): Promise<CategoryEntity | undefined> {
    return await this.categoriesService.findOneById(id);
  }

  @Public()
  @Get('subcategories/:parentId')
  async findSubcategories(
    @Param('parentId') parentId: number
  ): Promise<CategoryEntity[]> {
    return await this.categoriesService.findSubcategories(parentId);
  }

  @ApiBody({ type: CreateCategoryDto })
  @Post()
  async addCategory(
    @Body('name') name: string,
    @Body('parentCategoryId') parentCategoryId?: number
  ): Promise<CategoryEntity> {
    return await this.categoriesService.addCategory(name, parentCategoryId);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<{ success: boolean }> {
    const success = await this.categoriesService.deleteCategory(id);
    return { success };
  }
}
