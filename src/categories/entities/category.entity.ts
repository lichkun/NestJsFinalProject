import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentCategoryId: number | null;

  @ManyToOne(() => CategoryEntity, (category) => category.subcategories, {
    nullable: true,
  })
  parentCategory: CategoryEntity | null;

  @OneToMany(() => CategoryEntity, (category) => category.parentCategory)
  subcategories: CategoryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
