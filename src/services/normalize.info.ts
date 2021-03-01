import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { FieldNode, FragmentDefinitionNode, GraphQLResolveInfo, SelectionNode } from "graphql"

export interface INormalizedJoin {
	parent: string
	joins: INormalizedJoin[]
}

type path = [string, string]

export interface INormalizedPaths {
	root: string
	relations: path[]
}

export class Normalize {
	private readonly fragments: Record<string, FragmentDefinitionNode>
	private readonly fieldNodes: readonly FieldNode[]

	private constructor({ fragments, fieldNodes }: GraphQLResolveInfo) {
		this.fragments = fragments
		this.fieldNodes = fieldNodes
	}

	private normalizeJoins(node: SelectionNode): INormalizedJoin[] {
		switch (node.kind) {
			case "InlineFragment":
				return this.mapJoins(node.selectionSet.selections)
			case "FragmentSpread":
				return this.mapJoins(this.fragments[node.name.value]!.selectionSet.selections)
			case "Field": {
				const normalizedPath: INormalizedJoin[] = []
				if (node.selectionSet !== undefined)
					normalizedPath.push({
						parent: node.name.value,
						joins: this.mapJoins(node.selectionSet.selections),
					})
				return normalizedPath
			}
		}
	}

	private mapJoins = (selections: readonly SelectionNode[]): INormalizedJoin[] =>
		selections.reduce<INormalizedJoin[]>(
			(paths, field) => paths.concat(this.normalizeJoins(field)),
			[]
		)

	private fieldJoins(): INormalizedJoin[] {
		return this.mapJoins(this.fieldNodes)
	}

	private fieldPaths(): INormalizedPaths {
		const allFieldJoins = this.fieldJoins()
		const fieldJoins = allFieldJoins[allFieldJoins.length - 1]!
		const fieldPaths: INormalizedPaths = { root: fieldJoins.parent, relations: [] }

		const fieldJoinsQueue: INormalizedJoin[] = [fieldJoins]
		while (fieldJoinsQueue.length > 0) {
			const currentFieldJoins = fieldJoinsQueue.shift()!
			currentFieldJoins.joins.forEach(fieldJoins => {
				fieldJoinsQueue.push({
					parent: `${currentFieldJoins.parent}_${fieldJoins.parent}`,
					joins: fieldJoins.joins,
				})
				fieldPaths.relations.push([
					`${currentFieldJoins.parent}.${fieldJoins.parent}`,
					`${currentFieldJoins.parent}_${fieldJoins.parent}`,
				])
			})
		}

		return fieldPaths
	}

	static readonly Joins = createParamDecorator<void, ExecutionContext>((_, ctx) =>
		new Normalize(GqlExecutionContext.create(ctx).getInfo<GraphQLResolveInfo>()).fieldJoins()
	)

	static readonly Paths = createParamDecorator<void, ExecutionContext>((_, ctx) =>
		new Normalize(GqlExecutionContext.create(ctx).getInfo<GraphQLResolveInfo>()).fieldPaths()
	)
}
