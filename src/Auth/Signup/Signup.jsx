/** @jsxImportSource @emotion/react */
import { MdOutlineCheckCircle, MdOutlineErrorOutline } from 'react-icons/md';
import * as s from './styles';
import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        element: <SignInAndUpInput 
            key={id}
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={inputValue}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            status={status}
            message={valid.message} />
    }
    // 실제 컴포넌트는 return 안에 있는 <SignInAndUpInput .. /> 이다. 
}

function SignInAndUpInput({type, name, placeholder, value, onChange, onBlur, status, message}) {
    // 매개변수가 {}로 감싸져 있으므로, 비구조 할당으로 가져와야 한다. 
    // Input만 관련된 내용을 넣을 함수.

    const { isShow, element: PasswordInputHiddenButton } = usePasswordInputHiddenButton();

     return (
        <div css={s.inputItem}>
            <div css={s.inputContainer(status)}>
                <input type={type === "password" ? isShow ? "text" : "password" : type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
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
// type이 password 일 때, password로 바뀌고 아니면 text나 자신의 type으로 바꾼다.
// 또한 password일 때만, PasswordInputHiddenButton 함수를 호출하고, usePasswordInputHiddenButton로 기능을 구현.
// isShow를 받아서 사용한 이유.


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

function Signup(props) {
    const navigate = useNavigate();

    const [ submitDisabled, setSubmitDisabled ] = useState(true);
    // 버튼 활성화 여부를 결정하는 상태 변수 

    const inputs = [
        {
            id: 1,
            type: "text",
            name: "username",
            placeholder: "사용자이름",
            value: "",
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
            value: "",
            valid: {
                enabled: true,
                regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
                message: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
            },
        },
        {
            id: 3,
            type: "password",
            name: "checkPassword",
            placeholder: "비밀번호 확인",
            value: "",
            valid: {
                enabled: false,
                regex: null,
                callback: () => inputItems[1].value === inputItems[2].value,
                message: "비밀번호가 서로 일치하지 않습니다.",
            },
        },
        {
            id: 4,
            type: "text",
            name: "fullName",
            placeholder: "성명",
            value: "",
            valid: {
                enabled: true,
                regex: /^[가-힣]{2,20}$/,
                message: "이름은 한글 2~20자여야 합니다.",
            },
        },
        {
            id: 5,
            type: "email",
            name: "email",
            placeholder: "이메일",
            value: "",
            valid: {
                enabled: true,
                regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "유효하지 않은 이메일 형식입니다.",
            },
        },
    ];

    const inputItems = inputs.map(input => useSignInAndUpInput(input)); 
    // 객체로 꺼낼 수 있다.
    // [input, input, input, ... ] -> [{}] 가 된다. 
    // 그래서 useSignInAndUpInput의 return 결과 객체이다. 
    // [useSignInAndUpInput(리턴값), useSignInAndUpInput(리턴값) ... ] 과 같은 형태로 반환. 
    // [input, input] -> [useSignInAndUpInput(리턴값), useSignInAndUpInput(리턴값)]

    useEffect(() => {
        setSubmitDisabled(!!inputItems.find(inputItem => inputItem.status !== "success"))
    }, [inputItems]);
    // 상태가 바뀌면, 안에 있는 정보들이 바뀌며 반응을 할 것이다. 
    // 즉, 여기서부터 다시 랜더링이 일어날 것이다. 
    // 그러면 return 안의 {} 값이 변하게 된다. 

    const handleRegisterOnClick = async () => {
        // async가 붙은 경우? 비동기이자 Promise
        // 어떨 때 쓰는가? await을 써야 하는 경우

        const url = "http://localhost:8080/api/users"

        let data = {};

        inputItems.forEach(inputItem => {
            data = {
                ...data,
                [inputItem.name]: inputItem.value,
            }
        }); // 데이터 형태는 DTO와 같아야 한다.

        
        try {
            const response = await axios.post(url, data);  
            alert("사용자 등록 완료");
            navigate("/users/signin", {
                state: {
                    username: response.data.username, 
                    password: inputItems.find(inputItem => inputItem.name === "password").value,
                    // 암호화가 된 경우, 암호가 아닌 내가 쓴 비밀번호를 쓰기 위해서 위와 같이 쓴다. 
                }});
        } catch {
            alert("사용자 등록 오류");
        }
        // await가 붙어 있기 때문에,
        // 등록이 완료된 후에 alert를 띄운다. 
    }


     return (
        <div css={s.layout}>
            <div css={s.container}>
                <h1 css={s.title}>회원가입</h1>
                {
                    inputItems.map(inputItem => inputItem.element)
                }
            </div>
            <button css={s.submitButton} disabled={submitDisabled} onClick={handleRegisterOnClick}>가입하기</button>
        </div>
    );
    
}

export default Signup;

// 20250616 Sign Up 일반 
// 위 div 구조는 
// input을 넣고, input과 함께 있는 div은 
// 정규식을 이용해서 가능한 것인지를 판단하는 아이콘이 들어갈 것이다.
// 그리고 그 아래 div는 input 안의 내용에 어떤 것이 부족한지, 불가능한 아이디임을 알려주는 텍스트가 
// 들어가 예정이나, 특정 조건일때만 나타나게 된다. 
// h1 아래의 div은 안의 내용들을 중앙으로 위치시키기 위해서 만든 div
// 가운데 정렬을 위해 padding-bottom: 100px;를 준다.

// 20250617 Clean Code
// inpust 안에 객체를 추가해주면, 언제든지 다른 객체를 넣을 수 있다.
// 예를 들어, 전화번호나 주소 같은 것들 전부 다 뿌려줄 수 있다. 

// 그렇다면 custom Hooks 함수는?
// Custom Hooks 함수는 Hooks 함수인데, 함수 안에 또 다른 Hooks(use..())함수가 들어있으며,
// 변화가 생기는 이벤트가 있는 경우에 
// 분리를 할 수 있다. 

// 굳이 이벤트가 없다면 나눌 필요가 없으며, use가 없으면 나눌 필요가 없다. 

// 해당 방법은 초기에 코드를 짤 때 설계가 오래 걸리므로, 추후에 수정하는 것을 권고한다. 