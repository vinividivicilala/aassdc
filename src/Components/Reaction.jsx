import axios from "axios"
import useAuthStore from "../Store/AuthStore"
import { useMutation } from "react-query";
import toast from "react-hot-toast";

function Reaction({postId}) {
  const token = useAuthStore((state)=>state.token);
  const reactAction = async()=>{
    const response = await axios.post(`/Api/post/reaction`,{
      'post_id':postId,
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return response.data;
  }
  const {mutate}= useMutation(reactAction,{
    onSuccess:(data)=>{
      toast.success(data.message)
    }
  })

  return (
    <>
    
    </>
  )
}

export default Reaction