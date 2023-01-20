import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Header from '../../components/Headers/header'

const User = () => {
    const [user, setUser] = useState({
        email: "",
        username: ""
    })

    const router = useRouter()



    const getProfile = async () => {
        const response = await axios.get('./api/profile')
        setUser(response.data)
    }

    const logout = async () => {
        try {
            const response = await axios.get('./api/auth/logout')
            setUser(response.data)
        } catch (error) {
            console.log("Error");            
        }
        router.push("login")
    }


    return (
        <>
            <Header tipo="user"></Header>
            <main>
                <h1>Dashboard</h1>
                <button type="button" onClick={getProfile}>
                    get profile
                </button>
                <button type="button" onClick={logout}>
                    Logout
                </button>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </main>
        </>
    )
}

export default User