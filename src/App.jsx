import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import Transaction from "./pages/Transaction"
import Insights from "./pages/Insights"

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
