import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import { FaMoon, FaSun } from "react-icons/fa"
import "./Header.css"

function Header() {
    const { role, setRole, theme, toggleTheme } = useAppContext()

    let ThemeIcon = <FaSun />
    if (theme === "light") {
        ThemeIcon = <FaMoon />
    }

    return (
        <nav className="header">
            <h2 className="logo">Financial Freedom</h2>
            <ul className="links">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/insights">Insights</Link></li>
            </ul>
            <div className="actions">
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="role"
                >
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="theme" onClick={toggleTheme}>
                    {ThemeIcon}
                </button>
            </div>
        </nav>
    )

}

export default Header