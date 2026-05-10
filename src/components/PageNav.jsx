import React from 'react'
import { Link } from 'react-router'
import styles from "./PageNav.module.css"
import Logo from "./Logo"

function PageNav() {
    return (
        <nav className={styles.navClass}>
            <Link to="/">
                <Logo />
            </Link>
            <ul >
                <li >
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                    <Link to="/Login">Login</Link>
                </li>

            </ul>
        </nav>
    )
}

export default PageNav;
