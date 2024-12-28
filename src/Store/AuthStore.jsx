import { create } from "zustand";

const useAuthStore = create((set)=>({
    token: localStorage.getItem('token')||null,
    // email_verified_at: JSON.parse(localStorage.getItem('email_verified_at'))||false,
    user:JSON.parse(localStorage.getItem('user'))||null,
    
    
    setAuth:(token,user)=>{
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user));
        set( {
            token,
            user,
           
        })
    },
    clearAuth:()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
            token: null, user: null, 
        });
    },
    getUserVerified: () => {
        const state = useAuthStore.getState();
        return !!state.token && !!state.user?.email_verified_at;
    },
}));
export default useAuthStore;





/* 


import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    email_verified_at: JSON.parse(localStorage.getItem('email_verified_at')) || false,

    // Computed variable to check if user is authenticated (has token)
    isAuthenticated: !!localStorage.getItem('token'), // Boolean check if token exists

    // Computed variable to check if user is authenticated and email is verified
    isVerified: !!localStorage.getItem('token') && JSON.parse(localStorage.getItem('email_verified_at')),

    setAuth: (token, email_verified_at) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email_verified_at', email_verified_at);
        set({
            token,
            email_verified_at,
            isAuthenticated: !!token, // Update isAuthenticated when setting auth
            isVerified: !!token && email_verified_at // Update isVerified based on both token and email verification
        });
    },
    
    clearAuth: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email_verified_at');
        set({
            token: null,
            email_verified_at: false,
            isAuthenticated: false, // Reset authentication status
            isVerified: false // Reset verification status
        });
    },
}));

export default useAuthStore;

*/