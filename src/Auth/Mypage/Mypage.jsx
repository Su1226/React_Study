/** @jsxImportSource @emotion/react */
import { useQueryClient } from '@tanstack/react-query';
import * as s from './styles';
import React, { useState } from 'react';
import axios from 'axios';

function Mypage(props) {

    const queryClient = useQueryClient();
    const principalUserData = queryClient.getQueryData(['principalUserQuery']);
    console.log(principalUserData);  

    // 사용자 정보 수정과 비밀번호 변경을 위한 상태 관리
    const [ userInfo, setUserInfo ] = useState({
        username: principalUserData.data.principal.username,
        fullName: principalUserData.data.principal.fullName,
        email: principalUserData.data.principal.email,
    });


    // 사용자 정보 수정 입력값 변경 핸들러
    // 입력값이 변경될 때마다 상태를 업데이트한다.
    const handleUserInfoOnChange = (e) => {
        setUserInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    // 비밀번호 변경을 위한 상태 관리
    const [ passwordInfo, setPasswordInfo ] = useState({
        oldPassword: '',
        newPassword: '',
        newPasswordCheck: '',
    }); 

    // 비밀번호 변경 입력값 변경 핸들러
    const handlePasswordInfoOnChange = (e) => {
        setPasswordInfo(prev => ({
            ...prev, 
            [e.target.name]: e.target.value,
        }));
    }


    // 사용자 정보 수정 버튼 클릭 핸들러
    const handleUserInfoModificationOnClick = () => {        
        if (!userInfo.fullName || !userInfo.email) {
            alert("성명 또는 이메일은 필수 입력사항입니다.");
            return;
        }

        const principal = principalUserData.data.principal;

        // 사용자 정보가 변경되지 않았을 때
        if (principal.fullName === userInfo.fullName &&
            principal.email === userInfo.email) {
            alert("변경된 정보가 없습니다.");
            return;
        }

        const accessToken = localStorage.getItem("AccessToken");
        axios.put(`http://localhost:8080/api/users/${principal.userId}`, userInfo, {
            headers: {
                Authorization: !accessToken ? null : `Bearer ${accessToken}`, 
            },
        });
        // 사용자 정보가 변경되었을 때, 서버에 사용자 정보를 수정하는 요청을 보낸다.
        // axios를 사용하여 PUT 요청을 보낸다.
        // principal.userId를 사용하여 해당 사용자의 정보를 수정한다.
        // userInfo 객체를 요청 본문에 담아 보낸다.
    }

    // 비밀번호 변경 버튼 클릭 핸들러
    const handlePasswordInfoModificationOnClick = async () => {
        if (!!JSON.stringify(Object.values(passwordInfo).find(value => !value))) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        const principal = principalUserData.data.principal;
        const accessToken = localStorage.getItem("AccessToken");

        try {
            const response = await axios.put(`http://localhost:8080/api/users/${principal.userId}/password`, passwordInfo, {
                headers: {
                    Authorization: !accessToken ? null : `Bearer ${accessToken}`, 
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
            const errorResponse = error.response;
            console.log(errorResponse);
        }
    }

    // 사용자 정보 수정과 비밀번호 변경을 위한 컴포넌트
    return (
        <div>
            <div>
                <h2>사용자 정보 수정</h2>
                <div>
                    <input type="text" name="username" placeholder='사용자이름' disabled={true} value={userInfo.username} onChange={handleUserInfoOnChange}/>
                </div>
                <div>
                    <input type="text" name="fullName" placeholder='성명' value={userInfo.fullName} onChange={handleUserInfoOnChange} />
                </div>
                <div>
                    <input type="text" name="email" placeholder='이메일' value={userInfo.email} onChange={handleUserInfoOnChange}/>
                </div>
                <button onClick={handleUserInfoModificationOnClick}>변경하기</button>
            </div>
            <div>
                <h2>비밀번호 변경</h2>
                <div>
                    <input type='password' name='oldPassword' placeholder='기존 비밀번호 확인' value={passwordInfo.oldPassword} onChange={handlePasswordInfoOnChange}></input>
                </div>
                <div>
                    <input type='password' name='newPassword' placeholder='새 비밀번호' value={passwordInfo.newPassword} onChange={handlePasswordInfoOnChange}></input>
                </div>
                <div>
                    <input type='password' name='newPasswordCheck' placeholder='새 비밀번호 확인' value={passwordInfo.nesPasswordCheck} onChange={handlePasswordInfoOnChange}></input>
                </div>
                <button onClick={handlePasswordInfoModificationOnClick}>변경하기</button>
            </div>
        </div>
    );
}

export default Mypage;