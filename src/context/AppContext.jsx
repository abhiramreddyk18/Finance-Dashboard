import { createContext, useState, useContext, useEffect } from "react"
import defaultData from "../data/transactions"

const AppContext = createContext()

function getTransactions() {
    let stored = localStorage.getItem("transactions")
    if (stored) {
        return JSON.parse(stored)
    }
    
    localStorage.setItem("transactions", JSON.stringify(defaultData))
    return defaultData
}

function saveToStorage(data) {
    localStorage.setItem("transactions", JSON.stringify(data))
}

function AppProvider({ children }) {
    const [transactions, setTransactions] = useState(getTransactions())
    const [role, setRole] = useState("viewer")
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [theme])

    function toggleTheme() {
        let newTheme = "light"
        if (theme === "light") {
            newTheme = "dark"
        }
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    function addingtransaction(newTransaction) {
        let maxId = 0
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].id > maxId) {
                maxId = transactions[i].id
            }
        }
        newTransaction.id = maxId + 1
        let updated = [...transactions, newTransaction]
        setTransactions(updated)
        saveToStorage(updated)
    }

    function deleteTransaction(id) {
        let updated = []
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].id !== id) {
                updated.push(transactions[i])
            }
        }
        setTransactions(updated)
        saveToStorage(updated)
    }

    function edit(id, updatedData) {
        let updated = []
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].id === id) {
                updated.push({ ...transactions[i], ...updatedData })
            } else {
                updated.push(transactions[i])
            }
        }
        setTransactions(updated)
        saveToStorage(updated)
    }

    return (
        <AppContext.Provider value={{
            transactions,
            role,
            setRole,
            theme,
            toggleTheme,
            addingtransaction,
            deleteTransaction,
            edit
        }}>
            {children}
        </AppContext.Provider>
    )
}

function useAppContext() {
    return useContext(AppContext)
}

export { AppProvider, useAppContext }
