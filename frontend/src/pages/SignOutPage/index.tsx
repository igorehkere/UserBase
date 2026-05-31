import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import { useEffect } from "react";
import { getSignInRoute } from "../../lib/routes";


export function SignOutPage() {
    const navigate = useNavigate()
    const trpcUtils = trpc.useContext()
    useEffect(() => {
        Cookies.remove('token')
        void trpcUtils.invalidate().then(() => {
            navigate(getSignInRoute())
        })
    }, [])
    return <div>Loading...</div>
}