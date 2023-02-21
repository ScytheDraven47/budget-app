import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import BudgetTable from './BudgetTable'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<>
			<Head>
				<title>Budget App</title>
				<meta
					name='description'
					content='A rudimentary webapp for keeping track of spending'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<div className={styles.description}></div>

				<div className={styles.center}>
					<BudgetTable />
				</div>

				<div className={styles.grid}></div>
			</main>
		</>
	)
}
