import { useEffect, useState } from "react";
import useAuthStore from "../Store/AuthStore";
import axios from "axios";
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import PostDropdown from "./PostDropdown";



function Post({ postItem }) {

    const userv = useAuthStore((state) => state.user);
    // console.log(userv)
    // console.log(id);

    // console.log(postItem);

    const date = new Date(postItem.created_at);
    const createdAgo = Math.floor((new Date() - date) / 60000);
    const day = Math.floor(createdAgo / (24 * 60));
    const month = Math.floor(day / 30);


    return (
        <>
            <div className="px-4 pb-2 mt-6">
                <div className="my-2">
                    <div className="flex justify-between">


                        <h1 className="font-bold text-lg from-neutral-800">{postItem.title}</h1>
                        {postItem.user?.id === userv.id && <PostDropdown postId={postItem.id} />}
                    </div>
                </div>
                <div className="mb-2">
                    <h1 className="mb-0 text-sm">{postItem.user?.firstName} {postItem.user?.lastName}</h1>
                    <span className="text-xs text-slate-600">{month ? `${month} ${month > 1 ? 'months' : 'month'} ago` : (day ? `${day} ${day > 1 ? 'days' : 'day'} ago` : `${createdAgo} ${createdAgo > 1 ? 'minutes' : 'minute'} ago`)} </span>
                </div>
                <div className="flex justify-center">
                    {postItem.image && <img title={postItem.title} src={`/Image/${postItem.image}`} className="w-96 h-48 lg:w-3/4 lg:h-2/4 rounded-lg object-cover my-4" />}
                </div>
                <div className="text-justify mt-4 whitespace-pre-wrap" >
                    {postItem.description}
                </div>

                <div className="flex space-x-8 mb-2 mt-4">
                    <div className="flex items-center"><span><LuArrowBigUp size={22} /></span> <span className="bg-red-500 text-white text-xs rounded-full px-1">{postItem.reactions_count}</span> <span><LuArrowBigDown size={22} /></span></div>
                    <div className="relative flex items-center">
                        <FaRegComment size={20} />
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                            {postItem.comments_count+postItem.replies_count} 
                        </span>
                    </div>
                    <div><FaRegShareSquare size={20} /></div>
                </div>

            </div>
        </>
    )
}

export default Post