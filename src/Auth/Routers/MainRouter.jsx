import React from 'react';
import RootLayout from '../RootLayout/RootLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import AuthRouter from './AuthRouter';
import UnAuthRouter from './UnAuthRouter';
import NotFound from '../NotFound/NotFound';
import RootHeader from '../RootHeader/RootHeader';

// 두 경우를 담는 Main Router

function MainRouter(props) {
    return (
        <RootLayout>
            <RootHeader />
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