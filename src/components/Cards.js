import React, { useState, useEffect } from 'react'
import { CirclesWithBar } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { getDocs } from 'firebase/firestore'
import { movieRef } from './firebase/Firebase'
import { Link } from 'react-router-dom'


const Cards = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getData() {
            setLoading(true)
            const _data = await getDocs(movieRef);
            _data.forEach((doc)=>{
                setData((prv)=>[...prv, {...(doc.data()), id: doc.id}])
            })
            setLoading(false)
        }
        getData()
    }, [])

    return (
        <div className='flex flex-wrap justify-between mt-2 px-2'>
            {loading ? <div className='circle w-full flex justify-center items-center'>
                <CirclesWithBar height={80} color='orange' />
            </div> :
                data.map((e, i) => {
                    return (
                       <Link to={`/detail/${e.id}`}><div key={i} className='card font-bold shadow-lg p-2 hover:-translate-y-3 cursor-pointer
                         mt-4 transition-all duration-300'>
                            <img className="h-60 md:h-72" src={e.image} />
                            <h1>{e.title}</h1>
                            <h1 className='flex items-center'><span className='text-gray-500 mr-1'>Rating:</span>
                                <ReactStars
                                    size={20}
                                    half={true}
                                    value={e.rating/e.rated}
                                    edit={false}
                                /></h1>
                            <h1><span className='text-gray-500'>Year:</span> {e.year}</h1>
                        </div></Link>
                    )
                })
            }
        </div>
    )
}

export default Cards