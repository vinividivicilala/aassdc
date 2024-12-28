import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import useAuthStore from "../Store/AuthStore";


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorBackend, setErrorBackend] = useState("");
  const navigate = useNavigate(); 
  const setAuth = useAuthStore((state) => state.setAuth);
  async function onSubmit(data) {
    // console.log(data)
    setLoading(true);
    try{
      const response = await axios.post('/Api/login',
        {
          email:data.email,
          password:data.password
        }
      );
      console.log(response);
      setAuth(response.data.token,response.data.user);
      toast.success(response.data.message);
      navigate('/');
    }
    catch(error){
      setErrorBackend(error.response.data.message);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="border shadow-xl rounded-lg min-h-screen lg:w-3/5 md:w-3/4 w-full mx-auto flex items-center justify-center">
          <div className="lg:w-3/5 md:w-2/3 w-full">
            <h1 className="text-2xl font-bold text-center my-6">Login</h1>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-2">

              <div className="mx-6">
                <div className="mb-6 w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                  <input type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Enter a valid email address"
                      }
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {errors.email && <span className="text-red-500 text-xs mt-1 input-error">{errors.email.message}</span>}
                </div>

                <div className="mb-6 w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input type="password"
                    {...register("password", { required: "Password is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                </div>

                <button type="submit" className="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">{loading ? (
                    <ClipLoader color="#ffffff" loading={loading} size={20} /> // Spinner
                  ) : (
                    'Submit'
                  )}</button>

              {errorBackend&& <span className="text-red-500 text-center font-bold mt-1 input-error">{errorBackend}</span>}

              </div>

            </form>
            <Link to='/password/resetEmail' className="text-blue-600 mx-6 pt-4">Forget Password?</Link>
            <p className="text-center mt-4">
              Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login