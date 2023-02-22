import { BudgetRow, Cell } from '@/types/types'

export const { INCOME, BASE_BALANCE } = process.env

const FIRST_PAY_DAY = new Date(2018, 3 - 1, 26)
const EXPENSES = {}

const generateBudgetRow = (offset: number, prevBalances: Cell[]): BudgetRow => {
	const monday = new Date()
	monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7))
	monday.setHours(0, 0, 0, 0)
	monday.setDate(monday.getDate() + offset * 7)

	const diffTime = Math.abs(monday.valueOf() - FIRST_PAY_DAY.valueOf())
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
	const diffWeeks = Math.floor(diffDays / 7)
	const isPayWeek = diffWeeks % 2 === 0

	const incomes = [{ name: 'Salary', amount: isPayWeek ? Number(INCOME) : 0 }]
	const expenses = [
		{ name: 'Rent', amount: 20000 },
		{ name: 'Flat Expenses', amount: 6000 },
		{ name: 'Recurring', amount: 6000 },
	]

	const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
	const totalExpense = expenses.reduce(
		(sum, expense) => sum + expense.amount,
		0
	)

	const amountDifference = totalIncome - totalExpense

	const balances = prevBalances.map((balance) => {
		if (balance.name === 'Cheque') balance.amount += amountDifference
		return balance
	})

	return {
		id: monday.valueOf(),
		startDate: monday,
		incomes,
		balances,
		expenses,
		subscriptions: [],
	}
}

export const generateBudgetRows = (
	initialBalance: number,
	numWeeks = 6
): BudgetRow[] => {
	const budgetRows = [] as BudgetRow[]
	let prevBalances = [{ name: 'Cheque', amount: initialBalance }] as Cell[]
	for (let i = 0; i < numWeeks; i += 1) {
		const newBudgetRow = generateBudgetRow(i, prevBalances)
		budgetRows.push(newBudgetRow)
		prevBalances = newBudgetRow.balances
		console.log(prevBalances)
	}

	return budgetRows
}
