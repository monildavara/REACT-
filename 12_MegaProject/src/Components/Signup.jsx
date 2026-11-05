import React, { useState } from "react";
import {Link , useNavigate} from 'react-router-dom'
import {login } from '../Store/authSlice'
import { Button, Input, Logo } from './Index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/Auth";
import {useFrom} from "react-hook-form"

function signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useFrom()
    const [error, setError] = useState('')
    const create = async(data) => {
        setError("")
            try {
                const userData = await authService.createAccount(data)
            if (userData) {
                    const userData = await authService.
                        getCurrentUser()
                        if(userData) dispatch(login(userData))
                        navigate('/')
                    }
                } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div 
            className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg 
                    bg-gray-100 rounded-lx p-10 border border-black/
                    10`}>
                        <div className="mb-2 flex justify- center">
                                <span className="inline-block w-full max-w-[100px]">
                                    <Logo width="100%" />
                                </span>
                            </div>
                        <h2 className="text-center text-2xl font-bold 
                                leading-tight">Sing in to your account</h2>
                                    <p className="mt-2 text-center text-base text-black/60">
                                        Don&apos;t have any account?&nbsp;
                                            <Link 
                                                to="/signup"
                                                className="frot-medium text-primary                                                    transition-all duration-200
                                                hover:underline"
                                            >
                                                Sign Up
                                            </Link>    
                                    </p>
                                {error && <p className="text-red-600 mt-8 text-center">
                                    {error}
                                </p> 
                            }
                        <form onSubmit={handleSubmit(create)}>
                            <div className="space-y-5">
                                <Input 
                                    label="Name"
                                    placeholder="Enter your name"
                                    {...register("name", 
                                        { required: true,
                                            validate: {
                                                matchPattern: (value) => /^[A-Za-z]+$/i.test(value) || 
                                                "Name should only contain letters",
                                            }
                                        }
                                    )}
                                />
                                <Input
                                    label="password"
                                    placeholder="Enter your password"
                                    type="password"
                                        {...register("password", 
                                            { required: true,}
                                        )
                                    }
                                />
                                <Button 
                                    type="submit"
                                    className="w-full"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                </div>
            </div>
    )
}
