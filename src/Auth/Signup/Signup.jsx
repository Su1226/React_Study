/** @jsxImportSource @emotion/react */
import { MdOutlineCheck, MdOutlineCheckCircle, MdOutlineError, MdOutlineErrorOutline } from 'react-icons/md';
import * as s from './styles';
import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

/**
 * 유효성 검사(Validation Check)
 * - 데이터의 값을 받기 전에 올바른 형태인지 확인하는 절차 
 */

function useSignInAndUpInput({ type, name, placeholder, value, vaild }) {
    const STATUS = {
        idle: "",
        success: "success",
        error: "error"
    }
    const [ inputValue, setInputValue ] = useState(value);
    const [ status, setStatus ] = useState(STATUS.idle);

    const handleOnChange = (e) => {
        console.log(e.target.value);
        setInputValue(e.target.value);
    }   // 값 입력 

    const handleOnBlur = (e) => {
        if(isEmpty(e.target.value)) {
            setStatus(STATUS.idle);
            return;
        } // 값이 비어있으면 아무 동작 하지 않음.
          // INPUT에 빈 값일때마다, 값을 초기화 시켜준다.  

        if (vaild.enabled) {
            // 유효성 검사가 있는 것이라면?
            setStatus(vaild.regex.test(e.target.value) ? STATUS.success : STATUS.error);
            return;
        }
    }

    const isEmpty = (str) => {
        return !/^.+$/.test(str);
    }

    return {
        inputValue,
        element: <SignInAndUpInput 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        value={inputValue} 
        vaild={vaild}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        status={status}
        message={vaild.message}/>
    }
}

function SignInAndUpInput({type, name, placeholder, value, onChange, onBlur, status, message}) {
    // 매개변수가 {}로 감싸져 있으므로, 비구조 할당으로 가져와야 한다. 
    // Input만 관련된 내용을 넣을 함수.

    return (
        <div css={s.inputItem}>
            <div css={s.inputContainer(status)}>
                <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur} />
                    {
                        status !== "idle"
                        && (
                            status === "success" 
                            ? <div><MdOutlineCheckCircle /></div>
                            : <div><MdOutlineErrorOutline /></div>
                        )
                    }
            </div>
            <InputVaildatedMessage status={status} message={message}/>
        </div>
    )
}

// 일반 함수 안에서 Hooks 함수를 사용하는 경우, 이를 Custom Hooks라고 한다. 
// 아래의 함수를 Custom Hooks 함수로 만든다. 
function useInputVaildatedMessage({ defaultMessage }) {
    const STATUS = {
        idle: "idle",
        success: "success",
        error: "error"
    }   // 다음 사람이 보기 편하도록, 어떤 상태값들이 있는지 알 수 있게 변수로 작성.
    const [ status, setStatus ] = useState(STATUS.idle);
    const [ message, setMessage ] = useState(defaultMessage || "");

    return {
        status,
        setStatus,
        message,
        setMessage,
        element: <InputVaildatedMessage status={status} message={message} />
    }
}

// message 관련 함수 
function InputVaildatedMessage({status, message}) {
    const ERROR = "error";
    // 상수로 처리.

    if (status === ERROR) {
        return <div css={s.messageContainer()}>{message}</div>
    }
    
    return <></>
}


// Password Hidden Button 관련 함수
function PasswordInputHiddenButton() {
    const [ isShow, setShow ] = useState(false);

    const handleOnClick = () => {
        setShow(prev => !prev)
    }
    return <p onClick={handleOnClick}>{isShow ? <IoEyeOff /> : <IoEye />}</p>
}

function Signup(props) {

    const [ submitDisabled, setSubmitDisabled ] = useState(true);
    // 버튼 활성화 여부를 결정하는 상태 변수 

    const [ inputs, setInputs ] = useState([
        {
            type: "text",
            name: "username",
            placeholder: "사용자 이름",
            value: "",
            vaild: {
                regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
                message: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
            },
        },

        {
            type: "password",
            name: "password",
            placeholder: "비밀번호",
            value: "",
            vaild: {
                enabled: true,
                regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
                message: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
            },
        },

        {
            type: "password",
            name: "checkPassword",
            placeholder: "비밀번호",
            value: "",
            vaild: {
                enabled: false,
                regex: null,
                message: "비밀번호가 서로 일치하지 않습니다.",
            },
        }

    ]); // input과 관련된 내용들을 담을 useState 변수

    const inputItems = inputs.map(input => useSignInAndUpInput(input));
    // 객체로 꺼낼 수 있다.

    // useEffect(() => {
    //     setSubmitDisabled(!!Object.values(inputState).map(obj => obj.status).find(status => status !== "success"));
    //     // 현재 inputState는 객체 안에 객체 형태이므로
    //     // 객체에서 map으로 status들만 꺼내 새로운 배열로 만든다.
    //     // find()로 status값에 error나 idle이 없을 경우에만, 
    //     // submitButton의 disable을 풀어준다. 
    // }, [inputState]);

     return (
        <div css={s.layout}>
            <div css={s.container}>
                <h1 css={s.title}>회원가입</h1>
                {
                    inputItems.map(inputItem => inputItem.element)
                }
            </div>
            <button css={s.submitButton} disabled={submitDisabled}>가입하기</button>
        </div>
    );
}

export default Signup;

// 위 div 구조는 
// input을 넣고, input과 함께 있는 div은 
// 정규식을 이용해서 가능한 것인지를 판단하는 아이콘이 들어갈 것이다.
// 그리고 그 아래 div는 input 안의 내용에 어떤 것이 부족한지, 불가능한 아이디임을 알려주는 텍스트가 
// 들어가 예정이나, 특정 조건일때만 나타나게 된다. 
// h1 아래의 div은 안의 내용들을 중앙으로 위치시키기 위해서 만든 div
// 가운데 정렬을 위해 padding-bottom: 100px;를 준다.


/**
 * to. ChatGPT -> 정규식은 GPT에게 맡긴다..
 * username, password, checkPassword, fullName(한글), email
 * javascirpt 정규 표현식을 각각 만들어 주고, error메세지도 만들어줘
 */