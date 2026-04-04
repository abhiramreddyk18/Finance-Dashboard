import "../styles/Dashboard.css"
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts"
import { useAppContext } from "../context/AppContext"

function Dashboard() {
    const { transactions: trans } = useAppContext()

    let bal = 0
    let inc = 0
    let exp = 0

    for (let i = 0; i < trans.length; i++) {
        if (trans[i].type === "income") {
            inc = inc + trans[i].amount
        } else {
            exp = exp + trans[i].amount
        }
    }
    bal = inc - exp

    let trend = []
    let balance = 0
    let sorted_trans = [...trans].sort((a, b) => new Date(a.date) - new Date(b.date))

    for (let i = 0; i < sorted_trans.length; i++) {
        if (sorted_trans[i].type === "income") {
            balance += sorted_trans[i].amount
        } else {
            balance -= sorted_trans[i].amount
        }
        trend.push({
            name: sorted_trans[i].date,
            val: balance
        })
    }


    let catSum = {}
    for (let i = 0; i < trans.length; i++) {
        if (trans[i].type === "expense") {
            let c = trans[i].category
            if (!catSum[c]) {
                catSum[c] = 0
            }
            catSum[c] = catSum[c] + trans[i].amount
        }
    }

    let pieData = []
    let cats = Object.keys(catSum)
    for (let i = 0; i < cats.length; i++) {
        pieData.push({
            name: cats[i],
            value: catSum[cats[i]]
        })
    }

    let COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"]

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>


            <div className="cards">
                <div className="card c-bal">
                    <p className="label">Total Balance</p>
                    <p className="val">₹{bal.toLocaleString()}</p>
                </div>
                <div className="card c-inc">
                    <p className="label">Total Income</p>
                    <p className="val">₹{inc.toLocaleString()}</p>
                </div>
                <div className="card c-exp">
                    <p className="label">Total Expenses</p>
                    <p className="val">₹{exp.toLocaleString()}</p>
                </div>
            </div>


            <div className="charts">


                <div className="box">
                    <h2>Balance Trend</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={trend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                            <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="box">
                    <h2>Spending Breakdown</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map(function (entry, index) {
                                    return <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                })}
                            </Pie>
                            <Tooltip
                                formatter={function (value) { return "₹" + value.toLocaleString() }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard