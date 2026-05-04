import React from 'react'
import styles from "./Sidebar.module.css"
import Logo from './Logo'
import AppNav from './AppNav'
import Map from './Map'
import { Outlet } from 'react-router'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />


           <Outlet />

            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; {new Date().getFullYear()} WorldWise. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Sidebar