import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyContext from '../../context/data/MyContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';


const Signup = () => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const context = useContext(MyContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const signup = async()=>{

        setLoading(true);

        if(name ==="" || email === "" || password === ""){
            return toast.error("All fields are required !")
        }

        try{

            const users = await createUserWithEmailAndPassword( auth, email, password );

            const user = {
                name : name,
                uid : users.user.uid,
                email : users.user.email,
                time : Timestamp.now(),
            }

            const userRef = collection(fireDB, 'users');
            await addDoc(userRef, user);
            toast.success("Signup Successfully.")
            setEmail("");
            setPassword("");
            setName("");
            setLoading(false);
            navigate("/");
            localStorage.setItem("user", JSON.stringify(user))

        } catch(error){
            console.log("Error while signing up : ", error.message )
            toast.error(error.message)
            setLoading(false);
        }
        
    }
    
  return (
    <div className="flex justify-center items-center h-screen">
        { loading && <Loader/> }
        <div className="bg-gray-800 px-10 py-10 rounded-xl">
            <div className="">
                <h1 className="text-center text-white text-xl mb-4 font-bold">Signup</h1>
            </div>

            <div>
                <input value={name} onChange={(e)=> setName(e.target.value)} type="text" name='name' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[2oem] rounded-lg text-white placeholder:text-gray-200 outline-none' placeholder='Name' />
            </div>
            <div>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}  type="email" name='email' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[2oem] rounded-lg text-white placeholder:text-gray-200 outline-none' placeholder='Email' />
            </div>

            <div>
                <input  value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name='password' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[2oem] rounded-lg text-white placeholder:text-gray-200 outline-none' placeholder='Password' />
            </div>

            <div>
                <div className="flex justify-center mb-3">
                    <button onClick={ signup } className='bg-red-500 w-full text-black font-bold px-2 py-2 rounded-lg'> Signup </button>
                </div>
            </div>

            <div>
                <h2 className="text-white">Already have an account ? <Link className='text-red-500 font-bold' to={'/login'}> Login </Link>
                </h2>
            </div>

        </div>
    </div>
  )
}

export default Signup
