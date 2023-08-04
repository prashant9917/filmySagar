import React, { createContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { Appstate } from '../App';
import { useContext } from 'react';

const Header = () => {
    const useAppstate = useContext(Appstate);

    return (
        <div className='sticky top-0 z-10 header text-3xl flex justify-between items-center cursor-pointer text-blue-500 font-bold p-3 border-b-2 border-gray-400'>
            <Link to={'/'} ><span>Filmy<span className='text-white'>Sagar</span></span></Link>
            {useAppstate.login ?
                <Link to={'/addmovie'} ><h1 className='text-lg cursor-pointer flex items-center'>
                    <Button><AddIcon className='mr-1' color='secondary' /><span className=' text-white'> Add New</span></Button>
                </h1></Link>
                :
                <Link to={'/login'} ><h1 className='text-lg bg-blue-500 cursor-pointer flex items-center'>
                    <Button><span className=' text-white'> Login</span></Button>
                </h1></Link>
            }
        </div>
    )
}

export default Header