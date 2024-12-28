import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/AuthStore";
import toast from "react-hot-toast";

function CreatePost() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  async function onSubmit(data) {
    const formData = new FormData();
    // formData.append('image', data.image[0]);
    formData.append('title', data.title);
    formData.append('description', data.post);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    } 
    setLoading(true);
    try {
      const response = await axios.post('/Api/post',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,

          }
        });
      // console.log(response);
      toast.success(response.data.message);
        navigate(`/post/${response.data.post.id}`);
    } catch (err) {
      setError(err.response.data);
      // console.log(error);
    }
    finally {
      setLoading(false);
    }


  }

  return (
    <>
      <div className='px-3'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-8 mt-4'>
            <label htmlFor="post" className="block mb-2 text-sm font-semibold">
              Title
            </label>
            <input
              {...register('title', {
                required: 'Title is required'
              })}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Title..."
            />
            {errors.title && <span className="text-red-500 text-xs mt-1 input-error">{errors.title.message}</span>}

          </div>
          <div>
            <label htmlFor="post" className="block mb-2 text-sm font-semibold ">
              Write Post
            </label>
            
             <textarea
              {...register('post', {
                required: 'Post description is required',
              })}
              rows="16"
              className="block whitespace-pre-wrap p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your Post here..."
            ></textarea> 
            {errors.post && <span className="text-red-500 text-xs mt-1 input-error">{errors.post.message}</span>}

          </div>
          <div>
            {/*   <div className="w-full ">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Picture
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-slate-50">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input {...register('image')} id="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1"> Here files types are</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 2MB</p>
                </div>
              </div>
            </div> */}
            <div className="my-4">
              <input type="file" {...register('image')} />
              {errors.image && <span className="text-red-500 text-xs mt-1 input-error">{errors.image.message}</span>}

            </div>
          </div>

          <button type='submit' className='mt-2 float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full sm:w-1/3'>{loading ? (
            <ClipLoader color="#ffffff" loading={loading} size={20} />
          ) : ('Submit')}</button>
        </form>
        {error && <span className="text-red-500 text-xs mt-1 input-error">{error.message}
        </span>}

      </div>
    </>
  )
}

export default CreatePost