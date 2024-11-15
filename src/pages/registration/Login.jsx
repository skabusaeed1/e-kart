import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyContext from '../../context/data/MyContext';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';

const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const context = useContext(MyContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const handleLogin = async()=>{
        
        setLoading(true);
        if(email === '' || password === ''){
            return toast.error("All Fields Are Required!")
        }
        try{

            const result = await signInWithEmailAndPassword(auth, email, password);
            if(result){
                setLoading(false);
                setEmail("");
                setPassword("");
                toast.success("Login Successfully.", {
                    position: 'top-right',
                    autoClose:1500,
                    hideProgressBar: true,
                    closeOnClick:true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme : 'colored',
                })
                navigate("/");
                localStorage.setItem("user", JSON.stringify(result))
            }
        }
        catch(error){
            toast.error(error.message);
            setLoading(false);
        }
    
    }


  return (
    <div className="flex justify-center items-center h-screen">
        { loading && <Loader/> }
        <div className="bg-gray-800 px-10 py-10 rounded-xl">
            <div className="">
                <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>
            </div>

            <div>
                <input type="email" name='email' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[2oem] rounded-lg text-white placeholder:text-gray-200 outline-none' placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>

            <div>
                <input type="password" name='password' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[2oem] rounded-lg text-white placeholder:text-gray-200 outline-none' placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
            </div>

            <div>
                <div className="flex justify-center mb-3">
                    <button className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg' onClick={handleLogin}> Login </button>
                </div>
            </div>

            <div>
                <h2 className="text-white">Don't have an account <Link className='text-yellow-500 font-bold' to={'/signup'}> Signup </Link>
                </h2>
            </div>

        </div>
    </div>
  )
}

export default Login
