import axios from "axios";
import { useState } from "react"
import { HiDotsVertical } from "react-icons/hi";
import useAuthStore from "../Store/AuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function PostDropdown({postId}) {
    const [open, setOpen] = useState(false);
    const token = useAuthStore((state)=>state.token);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // console.log(open);
    function handleEdit() {
        navigate(`/post/edit/${postId}`)
    }
    // async function handleDelete() {
        
    //     try {
    //         const response = await axios.delete(`/Api/post/${postId}`,{
    //             headers:{
    //                 Authorization:`Bearer ${token}`,
    //             }
    //         });
    //         toast.success(response.data.message);
    //         navigate('/');
    //     } catch (err) {
    //         toast.error(err.response.data.message);
    //     }
    // }

    //react router
    function handleDelete(){
        mutate(postId)
    }
    const deleteData = async(postId)=>{
        const response = await axios.delete(`/Api/post/${postId}`,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        return response.data;
    }
    const {mutate,isPending} = useMutation({
        mutationFn:deleteData,
        onSuccess:(data)=>{
            toast.success(data.message);
            queryClient.invalidateQueries(['post',postId])
            
        }
    });

    return (
        <>
            <div className="relative">
                <button onClick={() => setOpen(!open)} className="ml-24"> <HiDotsVertical /> </button>
                <ul className={`${open?'block':'hidden'} absolute bg-white z-10 shadow-md w-28 text-left rounded-lg text-sm`}>
                    <li onClick={handleEdit} className="cursor-pointer py-2 px-4 hover:bg-slate-200">Edit</li>
                    <li onClick={handleDelete} className="cursor-pointer py-2 px-4 hover:bg-slate-200">Delete</li>
                </ul>
            </div>
        </>
    )
}

export default PostDropdown