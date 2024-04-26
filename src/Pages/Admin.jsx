import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/store'
import { jwtDecode } from 'jwt-decode'
import "./CSS/Admin.css"

export default function Admin() {
    const user = useAppSelector(state => state?.auth?.user)
    const router = useNavigate()

    useEffect(() => {
        if (!user) return router("/")
        const payload = jwtDecode(user.token)
        if (payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "Admin") return router("/")
    }, [user])
    return (
        <div className='body'>
            
            <Outlet />
        </div>
    )
}
