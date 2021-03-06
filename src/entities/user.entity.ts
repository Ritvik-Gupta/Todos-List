import { ENV } from "$/services"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TodoEntity } from "./todo.entity"

@ObjectType()
export class UserHollow {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Field()
	@Column({ type: "varchar", length: 100 })
	firstName: string

	@Field({ nullable: true })
	@Column({ type: "varchar", length: 100, nullable: true })
	middleName?: string

	@Field()
	@Column({ type: "varchar", length: 100 })
	lastName: string

	@Field()
	@Column({ type: "varchar", length: 100, unique: true })
	email: string

	@Column({ type: "text" })
	password: string

	@Field()
	get accessToken(): string {
		return sign({ id: this.id, email: this.email }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRY })
	}

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.password = await bcrypt.hash(this.password, ENV.HASH_SALT)
	}

	comparePassword(attemptPassword: string): Promise<boolean> {
		return bcrypt.compare(attemptPassword, this.password)
	}
}

@ObjectType()
@Entity({ name: "user" })
export class UserEntity extends UserHollow {
	@Field(() => [TodoEntity])
	@OneToMany(() => TodoEntity, ({ user }) => user)
	todos: TodoEntity[]
}
