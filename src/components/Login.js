import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { query, where, getDocs } from 'firebase/firestore';
import { usersRef } from './firebase/Firebase';
import swal from 'sweetalert';
import bcrypt from 'bcryptjs';
import { Appstate } from '../App';



const Login = () => {

    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            const qry = query(usersRef, where('mobile', '==', form.mobile));
            const querySnapshot = await getDocs(qry);
            
            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name)
                    swal({
                        text: 'Logged In',
                        icon: 'success',
                        buttons: false,
                        timer: 3000,
                    })
                    navigate("/")
                } else {
                    swal({
                        text: 'Wrrong Password',
                        icon: 'error',
                        buttons: false,
                        timer: 3000,
                    })
                }
            });
        } catch (error) {
            swal({
                text: error.message,
                icon: 'error',
                buttons: false,
                timer: 3000,
            })
        }
        setLoading(false);
    }

    return (
        <div className='w-full mt-20 flex flex-col items-center'>
            <h1 className='text-xl font-bold'>Login</h1>

            <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                    <label for="name" class="leading-7 text-sm text-gray-300">Mobile No.</label>
                    <input
                        type={"number"}
                        id="number"
                        name="number"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        class="w-full rounded border border-gray-700
                   focus:border-indigo-500  focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 
                   leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>

            <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                    <label for="name" class="leading-7 text-sm text-gray-300">Password</label>
                    <input
                        type={"password"}
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        class="w-full rounded border border-gray-700
                   focus:border-indigo-500  focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 
                   leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div class="p-2 w-full mt-4">
                <button onClick={login}
                    class="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 
                focus:outline-none hover:bg-blue-700 rounded text-lg">
                    {loading ? <TailSpin height={20} color='white' /> : 'Login'}
                </button>
            </div>
            <div>
                <p>Do not have an account? <Link to={'/signup'}><span className='text-blue-500'>Sign Up</span></Link></p>
            </div>
        </div>
    )

}
export default Login