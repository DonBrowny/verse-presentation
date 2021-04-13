import React from 'react'
import './Header.scss'
import Logo from '../logo.png'

const Header = ({ children }) => {
    return (
        <header className="header">
            <a href="/">
                <img className="header-logo" src={Logo} alt="Logo" />
                <span className="header-name">VERSE PRESENTATION</span>
            </a>
            <nav className="header-links">
                {children}
            </nav>
        </header>
    )
}

export default Header
