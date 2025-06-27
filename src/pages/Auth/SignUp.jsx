import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import Input from '../../components/inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl;


    if (!fullName) {
      setError("Please enter your Name");
      return
    }
    if (!validateEmail(email)) {
      setError("Please Enter a valid email address");
      return
    }

    if (!password) {
      setError("Please enter the password");
      return
    }
    setError("");

    // sign up api

    try {

      // upload image if present

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl;
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      });


      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);


        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard")
        } else {
          navigate("/user/dashboard");
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
    <div>
      <AuthLayout>
        <div className="lg:w-[100%] md:h-full h-auto mt-10 md:mt-0 flex flex-col justify-center ">
          <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6 '>Join us today by entering your details below. </p>

          <form onSubmit={handleSignup} >
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label={"Full Name"}
                placeholder={"john"}
                type={"text"}
              />
              <Input type={"text"} value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder={"john@example.com"} label={"Email Address"} />
              <Input type={"password"} value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder={"Min 8 character"} label={"Enter Password"} />
              <Input type={"text"} value={adminInviteToken}
                onChange={(e) => { setAdminInviteToken(e.target.value) }}
                placeholder={"6 Digit Code"} label={"Admin InviteToken"} />
            </div>
            {error && <p className='text-red-500 text-xs pb-2.5' >{error}</p>}
            <button type='submit' className='btn-primary' >SIGN UP</button>
            <p className='text-[13px] text-slate-800 mt-3 text-center '>Already an Account? {" "}
              <Link to={"/login"} className='font-medium text-primary underline' >Login</Link>
            </p>
          </form>

        </div>


      </AuthLayout>
    </div>
  )
}

export default SignUp