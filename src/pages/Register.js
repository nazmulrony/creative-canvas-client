import React, { useState } from 'react';
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    // reg error state
    const [error, setError] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photoURL, email, password);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(name, photoURL);
                setError('');
                navigate('/');
            })
            .catch(error => {
                setError(error.message);
            })

    }
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                navigate('/');
            })
            .catch(error => {
                setError(error.message)
                console.log(error);
            });
    }

    return (
        <div className='min-h-[90vh] px-2 py-4'>
            <div className="bg-stone-900 text-light max-w-md mx-auto p-6 rounded-lg shadow-2xl">
                <h2 className='text-center text-3xl text-brand mb-2 font-semibold'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" id="name" placeholder='Enter your full name ' className='p-2 rounded-md text-dark font-semibold' required />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="photoURL">Photo URL</label>
                        <input type="text" name="photoURL" id="photoURL" placeholder='Enter your photo URL' className='p-2 rounded-md text-dark font-semibold' />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder='Enter your email' className='p-2 rounded-md text-dark font-semibold' required />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className='p-2 rounded-md text-dark font-semibold' placeholder='Enter your password' required />
                    </div>
                    {
                        error && <p className='text-red-600'> {error}</p>
                    }
                    <button type="submit" className=' w-full btn btn-brand  my-4 ' >Register</button>
                    <p className='text-center my-2 text-sm'>Already have an account? <Link to="/login" className='btn-link text-brand'>Login</Link></p>
                    <div className='line-break-container'>
                        <hr className='line-break' />
                        <p className='text-center'>or</p>
                        <hr className='line-break' />
                    </div>
                    <div>

                    </div>
                </form >
                <button onClick={handleGoogleSignIn} className="btn flex-1 w-full outline-brand  my-3"><FaGoogle className='mr-2 text-[20px]' /> Google</button>

            </div>
        </div >
    );
};

export default Register;