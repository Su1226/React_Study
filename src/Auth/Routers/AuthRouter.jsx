import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Mypage from '../Mypage/Mypage';
import NotFound from '../NotFound/NotFound';
import { useQueryClient } from '@tanstack/react-query';

// 로그인이 된 후에 가능한 페이지

function Logout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if(confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("AccessToken");
            queryClient.invalidateQueries({
                queryKey: ["principalUserQuery"],
            }).then(() => {
                navigate("/");
            });
        } else {
            navigate(-1);
        }
    }, []);

    // 로그아웃은 AccessToken 값을 지우고, cache 값을 지워버린다.
    // 이후 홈으로 이동을 하게 된다. 
    // 그 이후부터는 principalUser가 anonymousUser로 만들고, 
    // anonymousUser는 거부 대상은 아니기 때문에 화면을 볼 수 있다. -> 비회원 계정

    return <></>
}

function AuthRouter(props) {
    return (
        <Routes>
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default AuthRouter;