import { useState } from "react"
import "../styles/Insights.css"
import { useAppContext } from "../context/AppContext"
import { FaChartBar, FaMoneyBillWave, FaCalendarDay, FaHashtag, FaTrophy } from "react-icons/fa"

function Insights() {
    const { transactions } = useAppContext()
    const [visible_month, setVisibleMonth] = useState("")

    let catTotals = {}

    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i]

        if (t.type === "expense") {
            let c = t.category

            if (!catTotals[c]) {
                catTotals[c] = 0
            }

            catTotals[c] += t.amount
        }
    }

    let high_category = ""
    let highvalue = 0

    let cats = Object.keys(catTotals)

    for (let i = 0; i < cats.length; i++) {
        let name = cats[i]

        if (catTotals[name] > highvalue) {
            highvalue = catTotals[name]
            high_category = name
        }
    }

    let all_months = {}

    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i]
        let m = t.date.substring(0, 7)

        if (!all_months[m]) {
            all_months[m] = {
                income: 0,
                expense: 0
            }
        }

        if (t.type === "income") {
            all_months[m].income += t.amount
        } else {
            all_months[m].expense += t.amount
        }
    }

    let months = Object.keys(all_months).sort()


    let currentmonth = visible_month || (months.length ? months[months.length - 1] : "")

    let total_income = 0
    let total_expense = 0

    if (currentmonth && all_months[currentmonth]) {
        total_income = all_months[currentmonth].income
        total_expense = all_months[currentmonth].expense
    }

    let savings = 0
    if (total_income > 0) {
        savings = Math.round(((total_income - total_expense) / total_income) * 100)
    }

    let largest_expense = null

    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i]

        if (t.type === "expense") {
            if (!largest_expense || t.amount > largest_expense.amount) {
                largest_expense = t
            }
        }
    }

    let lagre_amount = "0"
    let lagre_detail = "No data"

    if (largest_expense) {
        lagre_amount = largest_expense.amount.toLocaleString()
        lagre_detail = `${largest_expense.category} on ${largest_expense.date}`
    }

    let Bar_width = "0%"

    if (total_income > 0) {
        Bar_width = ((total_expense / total_income) * 100) + "%"
    }

    let expenseDays = {}

    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i]

        if (t.type === "expense") {
            expenseDays[t.date] = true
        }
    }

    let daysCount = Object.keys(expenseDays).length

    let avgPerDay = 0
    if (daysCount > 0) {
        avgPerDay = Math.round(total_expense / daysCount)
    }

    let income_num = 0
    let expense_num = 0

    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === "income") {
            income_num++
        } else {
            expense_num++
        }
    }


    return (
        <div className="page">
            <h1>Insights</h1>

            <div className="grid">

                <div className="card focus">
                    <div className="icon"><FaTrophy /></div>

                    <h3>Highest Spending Category</h3>

                    <p className="value">{high_category || "N/A"}</p>

                    <p className="detail">₹{highvalue.toLocaleString()} spent</p>
                </div>

                <div className="card">
                    <div className="icon"><FaChartBar /></div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <h3 style={{ marginBottom: 0 }}>Monthly Comparison</h3>

                        <select
                            value={currentmonth}
                            onChange={(e) => setVisibleMonth(e.target.value)}
                            className="filter-select"
                            style={{ padding: "4px 8px", fontSize: "0.8rem", width: "auto" }}
                        >
                            {months.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bars">

                        <div className="row">
                            <span className="label">Income</span>

                            <div className="bar-bg">

                                <div className="bar-fill inc" style={{ width: "100%" }}></div>

                            </div>

                            <span className="amt">₹{total_income.toLocaleString()}</span>
                        </div>

                        <div className="row">
                            <span className="label">Expense</span>
                            <div className="bar-bg">
                                <div className="bar-fill exp" style={{ width: Bar_width }}></div>
                            </div>
                            <span className="amt">₹{total_expense.toLocaleString()}</span>
                        </div>

                    </div>

                    <p className="detail" style={{ marginTop: "8px" }}>
                        Savings rate: {savings}%
                    </p>
                </div>

                <div className="card">
                    <div className="icon"><FaMoneyBillWave /></div>

                    <h3>Largest Single Expense</h3>

                    <p className="value">₹{lagre_amount}</p>

                    <p className="detail">{lagre_detail}</p>
                </div>

                <div className="card">
                    <div className="icon"><FaCalendarDay /></div>

                    <h3>Average Daily Spending</h3>

                    <p className="value">₹{avgPerDay.toLocaleString()}</p>

                    <p className="detail">
                        Across {daysCount} days with expenses
                    </p>
                </div>

                <div className="card">
                    <div className="icon"><FaHashtag /></div>

                    <h3>Transaction Count</h3>

                    <p className="value">{transactions.length} total</p>

                    <p className="detail">
                        {income_num} income, {expense_num} expenses
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Insights