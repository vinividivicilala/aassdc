import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../Components/Comment";
import CreateComment from "../Components/CreateComment";
import Post from "../Components/Post";
import useAuthStore from "../Store/AuthStore";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import useCommentStore from "../Store/CommentStore";
import { useQuery } from "@tanstack/react-query";


function PostPage() {
  // const [loading, setLoading] = useState(false);
  // const [post, setPost] = useState([]);
  const token = useAuthStore((state) => state.token);
  const { id } = useParams();
  const isVerified = useAuthStore.getState().getUserVerified();
  // // const [comments, setComments] = useState([]);
  // const navigate = useNavigate();
  const setComments = useCommentStore((state) => state.setComments);
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`/Api/post/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setPost(response.data);
  //       setComments(response.data.comments)
  //     } catch (error) {
  //       // console.log(error)
  //       toast.error('page not found');
  //       navigate('/')
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchPost();

  // }, [id]);
  const fetchSinglePost = async () => {
    const response = await axios.get(`/Api/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  }
  const { data, isPending } = useQuery({
    queryKey: ['post', id], 
    queryFn: fetchSinglePost
  });


  return (
    <>
      {
        isPending ? (
          <div className="flex items-center justify-center h-screen"><ClipLoader size={100} /></div>) : (
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="col-span-1 md:col-span-4">
              <div>
                <Post postItem={data} />
              </div>
              <div className="px-4 mt-4 mb-14">
                {
                  isVerified ? (<CreateComment postId={id} />) : ('')
                }
              </div>
              <div className="px-4 mt-6">
                <Comment postId={id} comment={data.comments} />
              </div>
            </div>
            <div className="hidden md:col-span-1 h-screen">

            </div>
          </div>
        )
      }



    </>
  )
}

export default PostPage