import axios from "axios";
// import { useState } from "react";
import { useForm } from "react-hook-form"
import useAuthStore from "../Store/AuthStore"
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useCommentStore from "../Store/CommentStore";
import ClipLoader from "react-spinners/ClipLoader";




function CreateComment({ postId }) {
  const { handleSubmit, reset, register, formState: { errors } } = useForm();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();
  // const addComment = useCommentStore((state) => state.addComment);
//with out react query
  // async function onSubmit(data) {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post('/Api/post/comments', {
  //       'comment': data.message,
  //       'post_id': postId,
  //     },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       });
  //       const comment = {
  //         ...response.data.comment,
  //         user:{
  //           firstName: useAuthStore.getState().user.firstName, 
  //           lastName: useAuthStore.getState().user.lastName
  //         }
  //       }
  //       addComment(comment);
  //       toast.success(response.data.message);
  //       reset();
  //   }
  //   catch (err) {
  //     setError(err);
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // }
  const addData = async (data) => {
    const response = await axios.post('/Api/post/comments', {
      'comment': data.message,
      'post_id': postId,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    return response.data;
  }
  function onSubmit(data){
    mutate(data);
  }

  const {mutate,isPending}= useMutation({
    mutationFn:addData,
    onSuccess:(data)=>{
      queryClient.invalidateQueries(['post',postId]),
      toast.success(data.message),
      reset();
    },
  }
    
  )
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>

          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your message
          </label>
          <textarea
            {...register('message', {
              required: "Message is required"
            })}

            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your Comment here..."
          ></textarea>
          {errors.message && <span className="text-red-500 text-xs mt-1 input-error">{errors.message.message}</span>}

          <button type='submit' className='mt-2 float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'>{isPending ? (<ClipLoader />) : ('Submit')}</button>
        </div>
      </form>
    </>
  )
}

export default CreateComment