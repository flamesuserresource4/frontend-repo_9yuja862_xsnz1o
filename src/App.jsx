import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import CategoryManager from './components/CategoryManager'
import BudgetPlanner from './components/BudgetPlanner'
import ExpenseTracker from './components/ExpenseTracker'
import MonthlySummary from './components/MonthlySummary'

function App() {
  const [categories, setCategories] = useState([])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Hero />

      <main className="relative z-10 container mx-auto px-6 pt-10 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <CategoryManager onChange={setCategories} />
          </div>
          <div className="md:col-span-2 space-y-6">
            <BudgetPlanner categories={categories} />
            <ExpenseTracker categories={categories} />
            <MonthlySummary categories={categories} />
          </div>
        </div>
      </main>

      <footer className="text-center text-blue-200/70 py-8">
        Track your goals with a modern, simple flow.
      </footer>
    </div>
  )
}

export default App
