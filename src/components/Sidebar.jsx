import React from 'react'
import styles from "./Sidebar.module.css"
import Logo from './Logo'
import AppNav from './AppNav'
import Map from './Map'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />


            <p>List of cities</p>

            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; {new Date().getFullYear()} WorldWise. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Sidebar