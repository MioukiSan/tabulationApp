import React, { useEffect } from 'react'
import { pb } from '../pocketbase.js'
import AdminTable from './AdminTable.jsx'

function Dashboard() {
    const [toggle, setToggle] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [topic, setTopic] = React.useState('talent')

    useEffect(() => {
        if (localStorage.getItem('admin') === null) {
            window.location.href = '/adminview'
        }
    }, [])

    async function getToggle() {
        try {
            setLoading(true)
            const res = await pb.collection('ControlUnlock').update('w3kuc2a0rtq7x5e', { viewunlock: toggle })
            setToggle(!toggle)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    async function getTopic(ev) {
        try {
            const res = await pb.collection('Topic').update('l1qoc0mlnovtslm', { topic: ev })
            setTopic(ev)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex overflow-hidden flex-col gap-10 w-[80vw] h-[80vh] justify-center items-center bg-white rounded-3xl">
            <h1 className="text-4xl font-bold uppercase">Dashboard</h1>
            <div className='flex gap-10'>
                <div onClick={getToggle} className={`w-40 h-20 cursor-pointer rounded-full border-2 border-black flex items-center transition-all`}>
                    <div className={`w-16 h-16 mx-1 flex justify-center items-center bg-blue-300 rounded-full ${toggle && "translate-x-20 bg-red-300"} transition-all`}>
                        {loading ? (<h1 className='font-bold text-3xl animate-spin'>C</h1>) : toggle ? (<h1 className='font-bold text-3xl'>X</h1>) : (<h1 className='font-bold text-3xl'>O</h1>)}
                    </div>
                </div>
                <select onChange={(e) => getTopic(e.target.value)} className='bg-blue-100 w-40 text-2xl font-bold rounded-xl text-center' name="topic" id="topic">
                    <option value="talent">Talent</option>
                    <option value="swimwear">Swimwear</option>
                    <option value="press">Press</option>
                    <option value="formal">Formal</option>
                    <option value="question">Question</option>
                </select>
            </div>
            <div className='flex w-full h-3/4 bg-gray-200'>
                <AdminTable topic={topic} />
            </div>
        </div>
    )
}

export default Dashboard