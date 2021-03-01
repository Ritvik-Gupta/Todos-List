import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "../user/user.entity"

@ObjectType()
export class TodoHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	userId: string

	@Field()
	@PrimaryColumn({ type: "varchar", length: 200 })
	title: string

	@Field()
	@CreateDateColumn()
	createdAt: Date

	@Field()
	@Column({ type: "text" })
	content: string
}

@ObjectType()
@Entity()
export class Todo extends TodoHollow {
	@Field()
	@ManyToOne(() => User, ({ todos }) => todos)
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	user: User
}
