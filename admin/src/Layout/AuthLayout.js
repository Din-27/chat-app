import React from 'react'
import SideMenu from '../components/SideMenu'

export default function AuthLayout({ children }) {
    return (
        <>
            <SideMenu />
            {children}
        </>
    )
}
