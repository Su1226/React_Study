import React, { useEffect, useState } from 'react';
import RootLayout from '../RootLayout/RootLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import AuthRouter from './AuthRouter';
import UnAuthRouter from './UnAuthRouter';
import NotFound from '../NotFound/NotFound';
import RootHeader from '../RootHeader/RootHeader';
import axios from 'axios';
import { CgAssign } from 'react-icons/cg';
import { useGlobalStateStore, useRefreshStore } from '../stores/storesStudy';

// 두 경우를 담는 Main Router
// MainRouter는 무조건 한 번은 실행되는 최상위 Router이다.

/**
 * 전역 상태 관리
 * 1. 클라이언트 전역 상태(ZUSTAND, recoil-react19에서 지원하지 않음.)
 * 2. 서버 전역 상태(React Query)
 */

function MainRouter(props) {

    const [ isLogin, setLogin ] = useState(false); 
    const { value:isRefresh, setValue:setRefresh } = useRefreshStore();
    // const [ refresh, setRefresh ] = useState(true);  

    // 페이지 랜더링
    useEffect(() => {
        if (isRefresh) {
            const accessToken = localStorage.getItem("AccessToken");
    
            if (!!accessToken) {
                axios.get("http://localhost:8080/api/users/login/status", {
                    headers: {
                        Authorization: !accessToken ? null : `Bearer ${accessToken}`
                    }
                })
                .then(response => {
                    if (response.data.login) {
                        setLogin(true);
                    }
                })
            }
            setRefresh(prev => false);
        }
    }, [isRefresh]) 
    // Login이 되었는지를 확인하고 Token을 저장해두는 부분.
    // Login이 된 다음에는 refreh가 false로 바뀌면서, 다시 실행하지 않음. 

    return (
        <RootLayout>
            <RootHeader isLogin={isLogin} setLogin={setLogin}/>
            <Routes>
                <Route path='' element={<Home />}/>
                <Route path='/auth/*' element={<AuthRouter />} />
                <Route path='/users/*' element={<UnAuthRouter />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </RootLayout>
    );
}

export default MainRouter;

// 종종 import가 되지 않는 경우가 있는데,
// 해당 경우에는 탭에 해당 파일이 없어서 그런 경우가 있다.

// path 조건에 맞으면, rendering이 되고 끝남. 
// 즉, 화면을 조건으로 걸었다고 봐도 된다.

// 맨 마지막에는 무조건 NotFound를 만들어 줘야 한다. 