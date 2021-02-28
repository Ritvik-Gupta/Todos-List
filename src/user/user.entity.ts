import { env } from "$/custom.env"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TodoEntity } from "../todo/todo.entity"

@ObjectType()
@Entity("user")
export class UserEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Field(() => String)
	@Column({ type: "varchar", length: 100 })
	firstName: string

	@Field(() => String, { nullable: true })
	@Column({ type: "varchar", length: 100, nullable: true })
	middleName?: string

	@Field(() => String)
	@Column({ type: "varchar", length: 100 })
	lastName: string

	@Field(() => String)
	@Column({ type: "varchar", length: 100, unique: true })
	email: string

	@Column({ type: "text" })
	password: string

	@Field(() => [TodoEntity])
	@OneToMany(() => TodoEntity, ({ ownerUser }) => ownerUser)
	todos: TodoEntity[]

	@Field(() => String)
	get accessToken(): string {
		return sign({ id: this.id, email: this.email }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRY })
	}

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.password = await bcrypt.hash(this.password, env.HASH_SALT)
	}

	comparePassword(attemptPassword: string): Promise<boolean> {
		return bcrypt.compare(attemptPassword, this.password)
	}
}
