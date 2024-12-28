import EmailOtp from "../Components/EmailOtp"
import ResentEmailTimer from "../Components/ResentEmailTimer"

function EmailVerify() {
  
    return (
        <>
            <div className="container mx-auto">
                <div className=" h-svh flex flex-col justify-center items-center">
                    <div className="border w-4/5 md:w-3/5 lg:w-2/5 px-6 shadow-lg rounded-lg py-40 md:px-10">
                        <h1 className="pb-2">Enter otp</h1>
                        <EmailOtp/> 
                        <ResentEmailTimer/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailVerify