export type Subscription = {
	name: string
	startDate: Date
	amount: number
	span: number
}

export type Cell = {
	name: string
	amount: number
}

export type BudgetRow = {
	id: number
	startDate: Date
	incomes: Cell[]
	balances: Cell[]
	expenses: Cell[]
	subscriptions: Subscription[]
}
