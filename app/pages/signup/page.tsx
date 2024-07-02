'use client';
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation';
import {  doc, setDoc } from 'firebase/firestore/lite';
import { db } from '@/firebase/config'; 

function Signup() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [rol, setRol] = React.useState('');
    const router = useRouter();

    const handleForm = async (event: any) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password);

        if (error) {
            console.log(error);
            return;
        }

        if (result && result.user) {
            const user = result.user;
            const userData = {
                uid: user.uid,
                email: user.email,
                name: name,
                surname: surname,
                rol: rol,
            };

            try {
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, userData);
                console.log('User data saved to Firestore');
            } catch (error) {
                console.log('Error saving user data to Firestore:', error);
            }
        }

        router.push("/pages/admin");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">Sign up</h1>
                <form onSubmit={handleForm} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            required
                            type="text"
                            name="name"
                            id="name"
                            placeholder="First Name"
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                            Surname
                        </label>
                        <input
                            onChange={(e) => setSurname(e.target.value)}
                            required
                            type="text"
                            name="surname"
                            id="surname"
                            placeholder="Last Name"
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                            rol
                        </label>
                        <input
                            onChange={(e) => setRol(e.target.value)}
                            required
                            type="text"
                            name="rol"
                            id="rol"
                            placeholder="rol"
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
