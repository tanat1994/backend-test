import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ 
    name: 'user' 
})
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'username', nullable: false, unique: true })
    username: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'token', nullable: true })
    token: string;
}