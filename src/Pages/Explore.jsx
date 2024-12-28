
import { ClipLoader } from 'react-spinners';
import useAuthStore from '../Store/AuthStore';

import PostItem from '../Components/PostItem';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
function Explore() {
    const token = useAuthStore((state) => state.token);
    const fetchPosts = async () => {
        const response = await axios.get('/Api/explore?page=1', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data.data;
    }
    const { data: posts, isPending } = useQuery({
        queryKey: ['explore'],
        queryFn: fetchPosts
    })

    return (
        <>
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-4'>
                    <div className='col-span-1 lg:col-span-3'>
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
                    <div className='hidden lg:col-span-1'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Explore