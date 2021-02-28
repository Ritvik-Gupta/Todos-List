import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { UserEntity } from "../user/user.entity"

@ObjectType()
@Entity("todo")
export class TodoEntity {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	userId: string

	@Field(() => String)
	@PrimaryColumn({ type: "varchar", length: 200 })
	title: string

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@Column({ type: "text" })
	content: string

	@Field(() => UserEntity)
	@ManyToOne(() => UserEntity, ({ todos }) => todos)
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	ownerUser: UserEntity
}
