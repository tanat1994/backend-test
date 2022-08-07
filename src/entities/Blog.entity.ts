import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ 
    name: 'blog' 
})
export class BlogEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false})
    name: string;

    @Column({ name: 'status', nullable: false })
    status: string;

    @Column({ name: 'content', nullable: false })
    content: string;

    @Column({ name: 'authorId', nullable: false })
    authorId: number;

    @Column({ name: 'category', nullable: false })
    category: string;
}