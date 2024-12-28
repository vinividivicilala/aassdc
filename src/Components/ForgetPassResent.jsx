import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";


function ForgetPassResent() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorBackend, setErrorBackend] = useState("");
  const navigate = useNavigate();
  async function onSubmit(data) {
    // console.log(data)
    setLoading(true);
    try {
      const response = await axios.post('/Api/password/email',
        {
          email: data.email,
          password: data.password
        }
      );
      toast.success(response.data.message);
      navigate('/login');
    }
    catch (error) {
      setErrorBackend(error.response.data.message);
      toast.error(error.response.data.message);
    }
    finally {
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
              <button type="submit" className="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">{loading ? (
                <ClipLoader color="#ffffff" loading={loading} size={20} /> // Spinner
              ) : (
                'Submit'
              )}</button>
              {errorBackend&& <span className="text-red-500 text-center font-bold mt-1 input-error">{errorBackend}</span>}

            </form>
          </div>
        </div>

      </div>

    </>
  )
}

export default ForgetPassResent