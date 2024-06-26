import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/types';

const AuthGuard = ({ children }: any) => {
    const router = useRouter();
    const auth = useSelector((state: AppState) => state?.userData.userProfile.isAuth);
    const parent_user_id = useSelector((state: AppState) => state?.userData.userProfile.parent_user_id);
    
    useEffect(() => {
        const unAuthorize = ["/signup", "/login"];
        const publicPaths = ["/search", "/", "/search/profile/[id]", "/search/availability/[id]", "/forgot-password-verifyemail", "/new-password", "/forgot-password", "/verify-email"];

        const isUnAuthorizedPath = unAuthorize.includes(router.pathname);
        const isPublicPath = publicPaths.includes(router.pathname);

        if (!localStorage.getItem("access_token") && !auth && !isUnAuthorizedPath && !isPublicPath) {
            router.push("/");
        }

        if (localStorage.getItem("access_token") && auth && isUnAuthorizedPath) {
            router.push("/");
        }
        if (router.pathname === "/wallet-history" && parent_user_id == null) {
            router.push("/");
        }
    }, [router, auth, parent_user_id]);

    return <>{children}</>;
}

export default AuthGuard;
