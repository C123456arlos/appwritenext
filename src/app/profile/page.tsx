'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState('nothing')
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('logout')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/user')
        console.log(res.data)
        setData(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile</h1>
            <hr></hr>
            <p>profile page</p>
            <h2 className="p-3 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr></hr>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">logout</button>
            <button onClick={getUserDetails} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">get user details</button>
        </div>
    )
}
