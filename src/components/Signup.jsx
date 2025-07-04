import React from 'react';
import AuthService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { Button, Input, Logo } from "../components/index";
import { useForm } from 'react-hook-form';

function Signup() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const create = async (data) => {
        setError("");
        try {
            const userData = await AuthService.createAccount(data);
            if (userData) {
                const currentUser = await AuthService.getCurrentUser();
                if (currentUser) {
                    dispatch(login({ userData: currentUser }));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^[\w.-]+@gmail\.com$/.test(value) ||
                                        "Email address must end with @gmail.com",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
