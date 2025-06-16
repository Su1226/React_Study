import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import NotFound from '../NotFound/NotFound';

// 로그인이 되기 전
// 그리고 로그인이 된 후에 되서는 안되는 페이지.

function UnAuthRouter(props) {
    return (
        <Routes>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default UnAuthRouter;