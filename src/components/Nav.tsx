import { useContext } from "react"
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/theme"
import { ActiveStyle } from "../types";

export const Nav = ({ toggleTheme }: { toggleTheme: () => void }) => {

    const theme = useContext(ThemeContext);

    return (
        <nav className="row space-between">
            <ul className="row nav">
                <li>
                    <NavLink
                        to='/'
                        style={({ isActive }) => isActive ? ActiveStyle : undefined}
                        className='nav-link'
                    >
                        Top
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/new'
                        style={({ isActive }) => isActive ? ActiveStyle : undefined}
                        className='nav-link'
                    >
                        New
                    </NavLink>
                </li>
            </ul>
            <button className="btn-clear" onClick={toggleTheme} style={{ fontSize: 30 }}>
                {theme === 'light' ? '🔦' : '💡'}
            </button>
        </nav>
    )
}
