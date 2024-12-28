// import { useEffect, useState } from "react";
import useAuthStore from "../Store/AuthStore"
import axios from "axios";
import PostItem from "./PostItem";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from "@tanstack/react-query";

// import {fetchPosts} from "../Api/FetchDataApi"

function Posts() {

    // const [error, setError] = useState("");
    // const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(false);
    const token = useAuthStore((state) => state.token);


    // useEffect(() => {

    //     const fetchPosts = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get('/Api/post?page=1', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 }
    //             });
    //             console.log(response);
    //             setPosts(response.data.data);
    //         }
    //         catch (err) {
    //             setError(err);
    //         }
    //         finally {
    //             setLoading(false);
    //         }

    //     }
    //     fetchPosts()
    // }, []);

    const fetchPosts = async () => {



        const response = await axios.get('/Api/post?page=1', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(response.data);
        return response.data.data;
    }
    //i will use query to fetch data
    const { data: posts, isPending } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    return (
        <>
            <div>
                <div>
                    <div>
                        {isPending ? (
                            <div className="flex justify-center items-center h-screen">

                                <ClipLoader size={100} />
                            </div>
                        ) : (
                            <div className="">
                                {
                                    posts.map((post) => (
                                        <PostItem key={post.id} postdetails={post} />
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Posts