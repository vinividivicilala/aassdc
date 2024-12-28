import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/AuthStore";
import { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";


function EditPost() {
  const postData = useLoaderData();
   console.log(postData);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues:{
      title:postData.title,
      post:postData.description,
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  async function onSubmit(data) {
    // console.log(data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.post);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    } 
     formData.append('_method','PUT');



    setLoading(true);
    try {
      const response = await axios.post(`/Api/post/${postData.id}`,
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
      setError(err.response);
      console.log(error);
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
              className="block whitespace-pre-wrap p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your Post here..."
            ></textarea>
            {errors.post && <span className="text-red-500 text-xs mt-1 input-error">{errors.post.message}</span>}

          </div>
          <div>

            <div className="my-4">
              <input type="file" {...register('image')} />
              {errors.image && <span className="text-red-500 text-xs mt-1 input-error">{errors.image.message}</span>}

            </div>
          </div>

          <button type='submit' className='mt-2 float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full sm:w-1/3'>{loading ? (
            <ClipLoader color="#ffffff" loading={loading} size={20} />
          ) : ('Submit')}</button>
        </form>
        {error && <span className="text-red-500 text-xs mt-1 input-error">{error.data.message}</span>}
      </div>
    </>
  )
}

export default EditPost