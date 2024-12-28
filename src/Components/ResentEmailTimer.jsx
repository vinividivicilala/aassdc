import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../Store/AuthStore";

function ResentEmailTimer() {
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(true);   
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        let countdown;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        else {
            setCanResend(true);
        }
        return () => clearInterval(countdown);
    }, [timer, canResend]);

    async function ResendLink() {
        setCanResend(false);
        setTimer(60);
        try {
            const response = await axios.get('/Api/resent/email', {

                headers: {
                    Authorization: `Bearer ${token}`
                },

            });
            // console.log(response);
            toast.success(response.data.message);
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);

        }

    }
    return (
        <>
            {canResend ? (
                <span onClick={ResendLink} className="text-blue-600 cursor-pointer hover:text-blue-800 transition duration-200 ease-in-out">Resend otp</span>
            ) : (<span className="text-gray-400">
                Resend OTP in {timer} seconds
            </span>)}
        </>
    )
}

export default ResentEmailTimer