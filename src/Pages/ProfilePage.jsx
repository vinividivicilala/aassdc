
import useAuthStore from "../Store/AuthStore";
import axios from "axios";
import PostDropdown from "../Components/PostDropdown";
import ClipLoader from "react-spinners/ClipLoader";
import CommentDropdown from "../Components/CommentDropdown";
import { useQuery } from "@tanstack/react-query";


const ProfilePage = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  // const [profile, setProfile] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`/Api/profile/user/${user.id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setProfile(response.data);
  //     } catch (err) {
  //       setError(err.response?.data?.error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // // Handler to remove deleted comment
  // const handleDeleteComment = (commentId) => {
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     comments: prevProfile.comments.filter((comment) => comment.id !== commentId),
  //   }));
  // };

  //using react query
  const profileData = async () => {
    const response = await axios.get(`/Api/profile/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user.id],
    queryFn: profileData
  });

  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen ">
      {/* Profile Info Section */}
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader size={100} />
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gray-300"></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600">{profile.email}</p>
                <div className="mt-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Posts</h3>
            <div className="space-y-4">
              {profile.posts && profile.posts.length < 1 ? "No Posts" : ""}
              {profile.posts?.map((post) => (
                <div key={post.id} className="p-4 bg-gray-50 rounded-lg shadow">
                  <div className="flex justify-between pb-4">
                    <h4 className="font-semibold text-lg text-gray-800">{post.title}</h4>
                    <PostDropdown postId={post.id} />
                  </div>
                  <p className="text-gray-700">{post.description}</p>
                  <div className="mt-2 text-gray-500 text-sm">
                    Posted on: {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Comments</h3>
            <div className="space-y-4">
              {profile.comments < 1 ? (
                "No Comments"
              ) : (
                profile.comments?.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg shadow mb-4">
                    <div className="flex justify-between">
                      <p className="text-gray-700">{comment.comment}</p>
                      <CommentDropdown commentId={comment.id} userId={user.id} />
                    </div>
                    <div className="mt-2 text-gray-500 text-sm">
                      Commented on: {new Date(comment.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
