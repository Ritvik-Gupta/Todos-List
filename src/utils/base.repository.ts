import { DeepPartial, FindConditions, Repository } from "typeorm"

export interface IRepositoryErrors {
	ifDefined: string
	ifNotDefined: string
}

export abstract class BaseRepository<T> extends Repository<T> {
	constructor(private readonly repoErrors: IRepositoryErrors) {
		super()
	}

	async ifDefined(where: FindConditions<T>): Promise<T> {
		const value = await this.findOne({ where })
		if (value === undefined) throw Error(this.repoErrors.ifNotDefined)
		return value
	}

	async ifNotDefined(where: FindConditions<T>): Promise<void> {
		const value = await this.find({ where })
		if (value.length > 0) throw Error(this.repoErrors.ifDefined)
	}

	createAndReturn(entity: DeepPartial<T>): Promise<T> {
		return this.save(this.create(entity))
	}
}
