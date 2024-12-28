import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import toast from "react-hot-toast";
import useAuthStore from "../Store/AuthStore";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CommentDropdown({ commentId,userId }) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const token = useAuthStore((state) => state.token);
  const queryClient= useQueryClient();

  // Mutation for delete action
  const deleteData = async () => {
    const response = await axios.delete(`/Api/post/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn:deleteData, 
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['profile',userId]);

      setConfirmOpen(false); // Close popover on success
    },
    onError: () => {
      toast.error("Failed to delete comment");
    }
  });

  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <button onClick={() => setOpen(!open)} className="ml-24">
        <HiDotsVertical />
      </button>

      {/* Dropdown Menu */}
      <ul className={`${open ? "block" : "hidden"} absolute bg-white z-10 shadow-md w-28 text-left rounded-lg text-sm`}>
        <li onClick={() => setConfirmOpen(true)} className="cursor-pointer py-2 px-4 hover:bg-slate-200">
          Delete
        </li>
      </ul>

      {/* Confirmation Popover */}
      {confirmOpen && (
        <div className="absolute left-0 top-10 bg-white border border-gray-200 shadow-md p-4 rounded-lg z-20">
          <p className="text-gray-700">Are you sure you want to delete this comment?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => mutate()}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentDropdown;




// import axios from "axios";
// import { useState } from "react";
// import { HiDotsVertical } from "react-icons/hi";
// import useAuthStore from "../Store/AuthStore";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useMutation, useQueryClient } from "react-query";

// function CommentDropdown({ commentId,userId }) {
//   const [open, setOpen] = useState(false);
//   const token = useAuthStore((state) => state.token);
//   const navigate = useNavigate();
//   const queryClient= useQueryClient();
//   function handleEdit() {
//     navigate(`/post/comment/edit/${commentId}`);
//   }

//   // async function handleDelete() {
//   //   try {
//   //     const response = await axios.delete(`/Api/post/comments/${commentId}`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
//   //     toast.success(response.data.message);
      
//   //   } catch (err) {
//   //     toast.error(err.response.data.message);
//   //   }
//   // }


//   //

//   const deleteData = async()=>{
//     const response = await axios.delete(`/Api/post/comments/${commentId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   }

//   const {mutate}=useMutation(deleteData,{
//     onSuccess:(data)=>{
//       toast.success(data.message);
//       queryClient.invalidateQueries(['profile',userId]);
//     }
//   })
//   return (
//     <div className="relative">
//       <button onClick={() => setOpen(!open)} className="ml-24">
//         <HiDotsVertical />
//       </button>
//       <ul
//         className={`${
//           open ? "block" : "hidden"
//         } absolute bg-white z-10 shadow-md w-28 text-left rounded-lg text-sm`}
//       >
//         <li onClick={handleEdit} className="cursor-pointer py-2 px-4 hover:bg-slate-200">
//           Edit
//         </li>
//         <li onClick={mutate} className="cursor-pointer py-2 px-4 hover:bg-slate-200">
//           Delete
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default CommentDropdown;
