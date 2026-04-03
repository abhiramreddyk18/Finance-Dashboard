import { useState } from "react"
import "../styles/Transaction.css"
import { useAppContext } from "../context/AppContext"

function Transaction() {
    const { transactions: trans, role, addingtransaction, deleteTransaction, edit } = useAppContext()

    const [search, setSearch] = useState("")
    const [fType, setFType] = useState("all")
    const [sort_option, setSortOption] = useState("date")

    const [isAdding, setIsAdding] = useState(false)
    const [new_date, setNewDate] = useState("")
    const [new_amount, setNewAmount] = useState("")
    const [new_category, setNewCategory] = useState("")
    const [new_type, setNewType] = useState("expense")

    const [editId, setEditId] = useState(null)
    const [editDate, setEditDate] = useState("")
    const [editAmount, setEditAmount] = useState("")
    const [editCategory, setEditCategory] = useState("")
    const [editType, setEditType] = useState("")

    let filtered_trans = []

    for (let i = 0; i < trans.length; i++) {
        let t = trans[i]
        let low_category = t.category.toLowerCase()
        let low_search = search.toLowerCase()

        if (low_category.includes(low_search)) {
            if (fType === "all") {
                filtered_trans.push(t)
            } else if (fType === t.type) {
                filtered_trans.push(t)
            }
        }
    }

    if (sort_option === "date") {
        filtered_trans.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sort_option === "amount") {
        filtered_trans.sort((a, b) => b.amount - a.amount)
    }

    function handleAdd() {
        if (!new_date || !new_amount || !new_category) return

        addingtransaction({
            date: new_date,
            amount: Number(new_amount),
            category: new_category,
            type: new_type
        })

        setNewDate("")
        setNewAmount("")
        setNewCategory("")
        setNewType("expense")
        setIsAdding(false)
    }

    function enable_editing(t) {
        setEditId(t.id)
        setEditDate(t.date)
        setEditAmount(t.amount.toString())
        setEditCategory(t.category)
        setEditType(t.type)
    }

    function cancel_the_edit() {
        setEditId(null)
    }

    function saveEdit() {
        if (!editDate || !editAmount || !editCategory) return

        edit(editId, {
            date: editDate,
            amount: Number(editAmount),
            category: editCategory,
            type: editType
        })

        setEditId(null)
    }

    let a = "+ Add"
    if (isAdding) {
        a = "Cancel"
    }

    return (
        <div className="page">
            <h1>Transactions</h1>

            <div className="controls">
                <input
                    type="text"
                    placeholder="Search by category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="inputs"
                />

                <select value={fType} onChange={(e) => setFType(e.target.value)} className="filter">
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select value={sort_option} onChange={(e) => setSortOption(e.target.value)} className="filter">
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                </select>

                {role === "admin" && (
                    <button className="btn-add" onClick={() => setIsAdding(!isAdding)}>
                        {a}
                    </button>
                )}
            </div>

            {role === "admin" && isAdding && (
                <div className="form">
                    <input type="date" value={new_date} onChange={(e) => setNewDate(e.target.value)} className="inputs" />
                    <input type="number" placeholder="Amount" value={new_amount} onChange={(e) => setNewAmount(e.target.value)} className="inputs" />
                    <input type="text" placeholder="Category" value={new_category} onChange={(e) => setNewCategory(e.target.value)} className="inputs" />
                    <select value={new_type} onChange={(e) => setNewType(e.target.value)} className="filter">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <button className="btn-save" onClick={handleAdd}>Save</button>
                </div>
            )}

            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Amount</th>
                        {role === "admin" && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {filtered_trans

                        .map((t) => {

                            let amountClass = "amt-exp"

                            let amountSign = "-"

                            if (t.type === "income") {
                                amountClass = "amt-inc"
                                amountSign = "+"
                            }

                            if (editId === t.id) {
                                return (
                                    <tr key={t.id}>
                                        <td><input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="edit-in" /></td>
                                        <td><input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="edit-in" /></td>
                                        <td>
                                            <select value={editType} onChange={(e) => setEditType(e.target.value)} className="edit-in">
                                                <option value="income">income</option>
                                                <option value="expense">expense</option>
                                            </select>
                                        </td>
                                        <td><input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} className="edit-in" /></td>
                                        <td>
                                            <button className="btn-save" onClick={saveEdit}>Save</button>
                                            <button className="btn-cancel" onClick={cancel_the_edit}>Cancel</button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={t.id}>
                                        <td>{t.date}</td>
                                        <td>{t.category}</td>
                                        <td><span className={`badge ${t.type}`}>{t.type}</span></td>
                                        <td className={amountClass}>
                                            {amountSign} ₹{t.amount.toLocaleString()}
                                        </td>
                                        {role === "admin" && (<td>
                                            <button className="btn-edit" onClick={() => enable_editing(t)}>Edit</button>
                                            <button className="btn-del" onClick={() => deleteTransaction(t.id)}>Delete</button>
                                        </td>
                                        )}
                                    </tr>
                                )
                            }
                        })}
                </tbody>
            </table>
            {filtered_trans
                .length === 0 && <p className="empty">No transactions found.</p>}
        </div>
    )
}

export default Transaction