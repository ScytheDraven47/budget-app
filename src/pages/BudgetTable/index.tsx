type BudgetRow = {
	startDate: Date
	isPayWeek: boolean
}
const INCOME = 216224

const formatBudgetRow = (row: BudgetRow) => (
	<tr>
		<td>
			{Intl.DateTimeFormat('en-US', {
				day: 'numeric',
				month: 'short',
				year: '2-digit',
			}).format(row.startDate)}
		</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
)

const BudgetTable = () => {
	const calculatedRows: BudgetRow[] = [
		{
			startDate: new Date(2023, 2 - 1, 20),
			isPayWeek: true,
		},
	]

	return (
		<table>
			<thead>
				<tr>
					<th rowSpan={2}>Week Starting</th>
					<th>Income</th>
					<th colSpan={3}>Current</th>
					{/* <th></th> */}
					{/* <th></th> */}
					<th>Out</th>
					<th>Savings</th>
					<th colSpan={5}>Living</th>
					{/* <th></th> */}
					{/* <th></th> */}
					{/* <th></th> */}
					{/* <th></th> */}
					<th></th>
					<th>Accounts</th>
					<th></th>
					<th></th>
					<th>Subscriptions</th>
				</tr>
				<tr>
					{/* <th></th> */}
					<th>Salary</th>
					<th>Cheque</th>
					<th>Credit</th>
					<th>Rec.</th>
					<th>Total</th>
					<th>50%</th>
					<th>Rent</th>
					<th>Flat Exp.</th>
					<th>Fuel</th>
					<th>Food</th>
					<th>Haircut</th>
					<th>Rec.</th>
					<th>Sub</th>
					<th>Credit</th>
					<th>Description</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{calculatedRows.map(formatBudgetRow)}</tbody>
		</table>
	)
}

export default BudgetTable
