import axios from "axios";
import useAuthStore from "../Store/AuthStore"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function LogOut() {
  const token = useAuthStore((state) => state.token);
  const clearAuth = useAuthStore((state)=>state.clearAuth);
  const navigate = useNavigate();
  async function handleClick() {
    try {
      const response = await axios.post('/Api/logout',{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
      clearAuth();
      toast.success(response.data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response.data.message);
    } 

  }
  return (
    <>
      <button onClick={handleClick}>Logout</button>
    </>
  )
}

export default LogOut