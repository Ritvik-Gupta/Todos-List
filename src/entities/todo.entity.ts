import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { UserEntity } from "./user.entity"

@ObjectType()
export class TodoHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	userId: string

	@Field()
	@PrimaryColumn({ type: "varchar", length: 200 })
	title: string

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date

	@Field()
	@Column({ type: "text" })
	content: string
}

@ObjectType()
@Entity({ name: "todo" })
export class TodoEntity extends TodoHollow {
	@Field()
	@ManyToOne(() => UserEntity, ({ todos }) => todos)
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	user: UserEntity
}
