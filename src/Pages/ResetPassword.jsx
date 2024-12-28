import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import ClipLoader from "react-spinners/ClipLoader";
import { useSearchParams,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ResetPassword() {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const password = watch("password");
  const [loading, setLoading] = useState(false);
  const [errorBackend, setErrorBackend] = useState();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  async function onSubmit(data) {
    console.log(data,token,
      email);
    setLoading(true);
    try{
      const response = await axios.post('/Api/password/reset',{
        token,
        email,
        password:data.password,
        password_confirmation:data.password_confirmation,
      });
      console.log(response);
      toast.success(response.data.message);
      navigate('/')
    }
    catch(error)
    {
      console.log(error);
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="border shadow-lg rounded-lg w-full md:w-3/5 lg:w-2/5 p-8 md:py-28">
            <h1 className="font-bold text-xl mb-10 text-center">Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long"
                    }
                  })}

                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                />
                {errors.password && <p className="text-red-500 text-xs mt-1 input-error">{errors.password.message}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                <input
                  type="password"

                  {...register("password_confirmation", {
                    required: "Password confirmation is required",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                />
                {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 input-errorm">{errors.password_confirmation.message}</p>}
              </div>

              <button
                type="submit"
                className="text-white mb-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                {loading ? (<ClipLoader color="#ffffff" loading={loading} size={20} />) : ('Submit')}
              </button>
              {errorBackend && <span className="text-red-500 text-center text-sm mt-1 input-error">{errorBackend}</span>}
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default ResetPassword