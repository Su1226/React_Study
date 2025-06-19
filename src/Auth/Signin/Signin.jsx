/** @jsxImportSource @emotion/react */
import { MdOutlineCheckCircle, MdOutlineErrorOutline } from 'react-icons/md';
import * as s from './styles';
import React, { useEffect, useRef, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRefreshStore } from '../stores/storesStudy';

/**
 * 유효성 검사(Validation Check)
 * - 데이터의 값을 받기 전에 올바른 형태인지 확인하는 절차 
 */

function useSignInAndUpInput({ id, type, name, placeholder, value, valid }) {
     const STATUS = {
        idle: "idle",
        success: "success",
        error: "error",
    };
    const inputRef = useRef();
    const [ inputValue, setInputValue ] = useState(value);
    const [ status, setStatus ] = useState(STATUS.idle);

    const handleOnChange = (e) => {
        // console.log(e.target.value)
        setInputValue(e.target.value);
    }   // 값 입력 

    const handleOnBlur = (e) => {
        if(isEmpty(e.target.value)) {
            setStatus(STATUS.idle);
            return;
        } // 값이 비어있으면 아무 동작 하지 않음.
          // INPUT에 빈 값일때마다, 값을 초기화 시켜준다.  

        if (valid.enabled) {
            setStatus(valid.regex.test(e.target.value) ? STATUS.success : STATUS.error);
            return;
        } // 유효성 검사가 있는 것이라면? 
          // 유효성 검사를 한다. 

        // 유효성 검사가 없는 경우, 즉 password가 맞는지 확인하는 checkPassword이다.
        // 현재 해당 코드 안에서는 가져 올 수 없으므로, 외부에서 vaild로 값을 가져온다.
        setStatus(valid.callback() ? STATUS.success : STATUS.error);
    }

    const isEmpty = (str) => {
        return !/^.+$/.test(str);
    }

    return {
        name: name,
        value: inputValue,
        status: status,
        ref: inputRef,
        element: <SignInAndUpInput 
            key={id}
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={inputValue}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            status={status}
            message={valid.message} 
            inputRef={inputRef}/>
    }
}

function SignInAndUpInput({type, name, placeholder, value, onChange, onBlur, status, message, inputRef}) {

    const { isShow, element: PasswordInputHiddenButton } = usePasswordInputHiddenButton();

     return (
        <div css={s.inputItem}>
            <div css={s.inputContainer(status)}>
                <input type={type === "password" ? isShow ? "text" : "password" : type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} ref={inputRef}/>
                {
                    type === "password" && PasswordInputHiddenButton
                }
                {
                    status !== "idle"
                    && (
                        status === "success" 
                        ? <div><MdOutlineCheckCircle /></div>
                        : <div><MdOutlineErrorOutline /></div>
                    )
                }
            </div>
            <InputVaildatedMessage status={status} message={message} />
        </div>
    )
}

// message 관련 함수 
function InputVaildatedMessage({status, message}) {
    const ERROR = "error";

    if (status === ERROR) {
        return <div css={s.messageContainer()}>{message}</div>
    }

    return <></>
}


function usePasswordInputHiddenButton() {
    const [isShow, setShow] = useState(false);
    
    const handleOnClick = () => {
        setShow(prev => !prev);
    }

    return {
        isShow,
        element: <PasswordInputHiddenButton isShow={isShow} onClick={handleOnClick}/>
    }

}

// Password Hidden Button 관련 함수
function PasswordInputHiddenButton({isShow, onClick}) {
    return <p onClick={onClick}>{isShow ? <IoEyeOff /> : <IoEye />}</p>
}

function Signin() {
    const navigate = useNavigate();
    const location = useLocation();

    const { setValue:setRefresh } = useRefreshStore();
    const [ submitDisabled, setSubmitDisabled ] = useState(true);
    // 버튼 활성화 여부를 결정하는 상태 변수 

    const inputs = [
        {
            id: 1,
            type: "text",
            name: "username",
            placeholder: "사용자이름",
            value: location.state?.username || "",
            valid: {
                enabled: true,
                regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
                message: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
            },
        },
        {
            id: 2,
            type: "password",
            name: "password",
            placeholder: "비밀번호",
            value: location.state?.password || "",
            valid: {
                enabled: true,
                regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
                message: "비밀번호는 영문, 숫자를 포함 4~20자여야 합니다.",
            },
        },
    ];

    const inputItems = inputs.map(input => useSignInAndUpInput(input)); 

    useEffect(() => {
        inputItems.forEach(inputItem => {
            inputItem.ref.current.focus();
            inputItem.ref.current.blur();
        })
    }, [])  // 장착이 되고 나서 Ref를 참조하겠다는 의미. 최초 한 번만 일어남. 
    
    useEffect(() => {
        setSubmitDisabled(!!inputItems.find(inputItem => inputItem.status !== "success"))
    }, [inputItems]);

    const handleRegisterOnClick = async () => {
        // async가 붙은 경우? 비동기이자 Promise
        // 어떨 때 쓰는가? await을 써야 하는 경우
        
        const url = "http://localhost:8080/api/users/login"

        let data = {};

        inputItems.forEach(inputItem => {
            data = {
                ...data,
                [inputItem.name]: inputItem.value,
            }
        });

        try {
            const response = await axios.post(url, data);      
            const accessToken = response.data?.accessToken;
            if (!!accessToken) {
                localStorage.setItem("AccessToken", accessToken);
                setRefresh(prev => true);
                navigate("/");
            }
            alert("로그인이 요청 완료");
        } catch {
            const { response, status } = error;
            console.log(response.data);
            alert("로그인 오류");
        }
    }


     return (
        <div css={s.layout}>
            <div css={s.container}>
                <h1 css={s.title}>로그인</h1>
                {
                    inputItems.map(inputItem => inputItem.element)
                }
            </div>
            <button css={s.submitButton} disabled={submitDisabled} onClick={handleRegisterOnClick}>로그인 하기</button>
        </div>
    );
    
}

export default Signin;

