import { CreateCategoryInput, UpdateCategoryInput } from '@/dtos/input/category.input';
import { prismaClient } from '../../prisma/prisma';

export class CategoryService {
  async findCategory(id: string) {
    const existingCategory = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new Error('Category with this id does not exist');
    }

    return existingCategory;
  }

  async findCategoriesByCreator(creatorId: string) {
    return prismaClient.category.findMany({
      where: { creatorId },
    });
  }

  async createCategory(data: CreateCategoryInput, creatorId: string) {
    const existingCategory = await prismaClient.category.create({
      data: {
        ...data,
        creatorId: creatorId,
      },
    });

    if (!existingCategory) {
      throw new Error('Category with this id does not exist');
    }

    return existingCategory;
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Category with this id does not exist');
    }

    return prismaClient.category.update({
      where: { id },
      data: {
        name: data.name,
        color: data.color,
        description: data.description,
        type: data.type,
      },
    });
  }

  async deleteCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error('Category with this id does not exist');
    }

    if (category.creatorId !== userId) {
      throw new Error('You are not authorized to delete this category');
    }

    return prismaClient.category.delete({
      where: { id },
    });
  }
}
