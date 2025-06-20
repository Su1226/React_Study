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
import { useQuery } from '@tanstack/react-query';

function MainRouterReactQuery(props) {

    const principalUserQuery = useQuery({
        queryKey:["principalUserQuery"],
        queryFn: async () => {
            const acceessToken = localStorage.getItem("AccessToken");
            return await axios.get("http://localhost:8080/api/users/principal", {
                headers: {
                    Authorization: !acceessToken ? null : `Bearer ${acceessToken}`,
                },
            });
        },
        // refetchOnWindowFocus: true,
        // retry: 3,
        // staleTime: 1000 * 60, // cache 만료 시간으로, 시간이 지나도 재로딩하지 않음.
        // gcTime: (6000 * 10), // gabege collect가 동작하는 시간 -> 해당 시간을 지나기 전에는 갱신하지 않음. 
    }); 

    // 서버의 상태를 가져올 때 사용되는 것. 
    // isLoading으로 현재 로딩 중임을 알 수 있으며, data로 함수의 결과를 얻을 수 있다.
    // 첫 로딩 때 처음 한 번만 일어난다.  

    console.log(principalUserQuery.isLoading);
    console.log(principalUserQuery.data);

    return (
        <>
            {
                !principalUserQuery.isLoading &&
                <RootLayout>
                    <RootHeader />
                    <Routes>
                        <Route path='' element={<Home />}/>
                        <Route path='/auth/*' element={<AuthRouter />} />
                        <Route path='/users/*' element={<UnAuthRouter />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </RootLayout>
            }
        </>
    );
}

export default MainRouterReactQuery;
