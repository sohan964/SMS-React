import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";


export  const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('access-token'));
    const axiosPublic = useAxiosPublic();

    const signIn = async (data) =>{
        setLoading(true);
        const res = await axiosPublic.post("/Auth/login", data);
        setLoading(false);
        setUser(res.data.data);
        return res.data;
        
    }

    //get the current user info
    useEffect(() =>{
        if(token){
            axiosPublic.get("/Auth/current-user", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            .then(res =>{
                console.log("Current user info:", res?.data?.data);
                setUser(res?.data?.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error fetching current user:", err);
            })
        }
    }, [token, axiosPublic]);

    const logout = () =>{
        localStorage.removeItem("access-token");
        setToken(null);
        setUser([]);
    }

    const authInfo = {
        signIn,
        loading,
        token,
        setToken,
        logout,
        user
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;