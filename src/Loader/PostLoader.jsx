import axios from "axios";


export const PostLoader = async ({ params }) => {
    const { id } = params; // Get the post ID from params
  
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/Api/post/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Ensure you have your token here
            },
        });
        return response.data; // Return the post data
    } catch (error) {
        console.error("Failed to load post:", error);
        throw new Error("Failed to load post data"); // Handle the error appropriately
    }
};
