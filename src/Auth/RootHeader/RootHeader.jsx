/** @jsxImportSource @emotion/react */
import { LuLogOut, LuUser, LuUserPlus } from 'react-icons/lu';
import * as s from './styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RootHeader(props) {
    // 로그인 여부를 확인하는 변수
    // 만약 로그인이 된 후에는, 로그인과 회원가입 아이콘이 없어져야 하기 때문에.
    const [ isLogin, setLogin ] = useState(false);

    return (
        <header css={s.layout}> 
            <h1><Link to={"/"}>사이트 로고</Link></h1>
            {
                isLogin ?
                <ul>
                    <li><Link to={"/auth/mypage"}><LuUser/></Link></li>
                    <li><Link to={"/auth/logout"}><LuLogOut /></Link></li>
                </ul>
                :
                <ul>
                    <li><Link to={"/users/signin"}><LuUser /></Link></li>
                    <li><Link to={"/users/signup"}><LuUserPlus /></Link></li>
                </ul>
            }
        

        </header>
    );
}

export default RootHeader;