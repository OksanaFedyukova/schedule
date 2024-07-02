'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

function Signin() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event:any) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // Result Data of UserFirebase
        console.log("RESULT OF SIGN IN", result)
        return router.push("/pages/admin")
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold text-center mt-6 mb-3">Sign in</h1>
          <form onSubmit={handleForm} className="space-y-6">
            <label htmlFor="email" className="block">
              <p className="text-sm font-medium text-gray-700">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </label>
            <label htmlFor="password" className="block">
              <p className="text-sm font-medium text-gray-700">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </label>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
}

export default Signin;