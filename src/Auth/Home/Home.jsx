/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import * as s from './styles';
import React, { useState } from 'react';
import { RiUser3Line } from 'react-icons/ri';
import { LuLogOut, LuUser, LuUserPlus } from 'react-icons/lu';

function Home(props) {

    // 로그인 여부를 확인하는 변수
    // 만약 로그인이 된 후에는, 로그인과 회원가입 아이콘이 없어져야 하기 때문에.
    const [ isLogin, setLogin ] = useState(true);

    return (
        <div css={s.layout}>

            <main>

            </main>
        </div>
    );
}

export default Home;