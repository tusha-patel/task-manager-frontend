import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from "react-router-dom"
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { updateUser } = useContext(UserContext);
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please Enter a valid email address");
            return
        }

        if (!password) {
            setError("Please enter the password");
            return
        }
        setError("");

        // login api
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });

            console.log(response);
            
            const { token, role } = response.data;
console.log(token,role);

            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data)
                // Redirect based on role
                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/dashboard")
                }
            }


        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something want wrong please try again")
            }
        }
    }


    return (
        <>
            <AuthLayout>
                <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center  ">
                    <h2 className='text-xl font-semibold text-black '>Welcome Back</h2>
                    <p className='text-xs text-slate-700 mt-[5px] mb-6  ' >Please Enter your details to log in </p>

                    <form onSubmit={handleLogin} >
                        <Input type={"text"} value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder={"john@example.com"} label={"Email Address"} />
                        <Input type={"password"} value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            placeholder={"Min 8 character"} label={"Enter Password"} />
                        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}


                        <button className='btn-primary' >LOGIN</button>
                        <p className='text-[13px] text-slate-800 mt-3 ' >
                            Don't have an account?{" "}
                            <Link to={"/signup"} className='font-medium text-primary underline ' >Signup</Link>
                        </p>
                    </form>

                </div>
            </AuthLayout>
        </>
    )
}

export default Login