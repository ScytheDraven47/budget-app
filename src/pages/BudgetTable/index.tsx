/* eslint-disable jsx-a11y/control-has-associated-label */
import { BASE_BALANCE, generateBudgetRows } from '@/lib/budget'
import { BudgetRow } from '@/types/types'
import styles from '@/styles/BudgetTable.module.css'

const getHeadersForRow = (row: BudgetRow) => {
	const headers = [['Week Starting']]

	row.incomes.forEach((income) => {
		headers.push(['Income', income.name])
	})
	row.balances.forEach((balance) => {
		headers.push(['Balance', balance.name])
	})
	row.expenses.forEach((expense) => {
		headers.push(['Expenses', expense.name])
	})

	return headers
}

const formatHeaderRow = (rows: BudgetRow[]) => {
	const calculatedHeaders = getHeadersForRow(rows[0])
	const topRowCells = calculatedHeaders?.map((header, i) => {
		const rowSpan = header.length === 1 ? 2 : 1
		let colSpan = 1
		if (i - colSpan >= 0 && header[0] === calculatedHeaders[i - colSpan][0])
			return
		while (
			calculatedHeaders.length > i + colSpan &&
			header[0] === calculatedHeaders[i + colSpan][0]
		) {
			colSpan += 1
		}
		return (
			<th key={i} rowSpan={rowSpan} colSpan={colSpan}>
				{header[0]}
			</th>
		)
	})
	const bottomRowCells = calculatedHeaders?.map((header, i) => {
		if (header.length === 1) return
		return <th key={i}>{header[1]}</th>
	})
	return (
		<>
			<tr>{topRowCells}</tr>
			<tr>{bottomRowCells}</tr>
		</>
	)
}

const formatDate = (date: Date) => {
	const dateParts = Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		year: '2-digit',
	})
		.formatToParts(date)
		.reduce(
			(acc, part) => {
				if (part.type === 'literal') return acc
				return {
					...acc,
					[part.type]: part.value,
				}
			},
			{ month: '', day: '', year: '' }
		)

	return `${dateParts.day} ${dateParts.month} ${dateParts.year}`
}

const formatCurrency = (amount: number) =>
	amount
		? Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
		  }).format(amount / 100)
		: ''

const formatBudgetRow = (row: BudgetRow) => {
	const monday = new Date()
	monday.setDate(monday.getDate() - (monday.getDay() - 1))
	monday.setHours(0, 0, 0, 0)
	const isThisWeek = monday.valueOf() === row.startDate.valueOf()
	return (
		<tr key={row.id} className={isThisWeek ? styles.today : ''}>
			<td className={styles.date}>{formatDate(row.startDate)}</td>
			{row.incomes.map((income) => (
				<td key={income.name} className={styles.currency}>
					{formatCurrency(income.amount)}
				</td>
			))}
			{row.balances.map((balance) => (
				<td key={balance.name} className={styles.currency}>
					{formatCurrency(balance.amount)}
				</td>
			))}
			{row.expenses.map((expense) => (
				<td key={expense.name} className={styles.currency}>
					{formatCurrency(expense.amount)}
				</td>
			))}
		</tr>
	)
}

const BudgetTable = () => {
	const calculatedRows: BudgetRow[] = generateBudgetRows(BASE_BALANCE)

	return (
		<table className={styles.table}>
			<thead>{formatHeaderRow(calculatedRows)}</thead>
			<tbody>{calculatedRows.map(formatBudgetRow)}</tbody>
		</table>
	)
}

export default BudgetTable
