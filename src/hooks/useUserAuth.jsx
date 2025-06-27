import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";



export const useUserAuth = () => {
    const { user, loading, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (user) return;
        if (!user) {
            clearUser();
            navigate("/login")
        }

    }, [loading, user, clearUser, navigate]);
}