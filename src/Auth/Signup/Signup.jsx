/** @jsxImportSource @emotion/react */
import { MdOutlineCheck, MdOutlineCheckCircle, MdOutlineError, MdOutlineErrorOutline } from 'react-icons/md';
import * as s from './styles';
import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

/**
 * 유효성 검사(Validation Check)
 * - 데이터의 값을 받기 전에 올바른 형태인지 확인하는 절차 
 */

function Signup(props) {

     const [ inputState, setInputState ] = useState({
        username: {
            value: "",
            message: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
            regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
            status: "idle", //success(성공), error(오류), idle(초기 대기상태)
        },
        password: {
            value: "",
            message: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
            regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
            status: "idle",
        },
        checkPassword: {
            value: "",
            message: "비밀번호가 서로 일치하지 않습니다.",
            status: "idle",
        },
        fullName: {
            value: "",
            message: "이름은 한글 2~20자여야 합니다.",
            regex: /^[가-힣]{2,20}$/,
            status: "idle",
        },
        email: {
            value: "",
            message: "유효하지 않은 이메일 형식입니다.",
            regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            status: "idle",
        }
    });

    const [ showPassword, setShowPassword ] = useState(false);
    // password를 보이게 할지 결정하는 상태 변수

    const [ submitDisabled, setSubmitDisabled ] = useState(true);
    // 버튼 활성화 여부를 결정하는 상태 변수 

    const handleOnChange = (e) => {
        setInputState(prev => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                value: e.target.value,
            }
        }));
    }   // target의 value 값이 변경될 때마다 값을 바꾸고 
        // 상태값을 바꿔주는 역할을 한다. 

    
    // 커서가 벗어났을 때 상태값이 바뀌어야 하기 때문에,
    // 다시 화면을 바꾸기 위해서 다음과 같은 함수를 쓴다. 
    // 아래는 메시지가 보이는 여부만 알려주는 함수이다. -> '사용 가능한 아이디입니다.'는 별도
    // 정규식에 맞는 키의 value를 가져와서 
    const handleOnBlur = (e) => {
        if (!/^.+$/.test(inputState[e.target.name].value)) {
            setInputState(prev => ({
                ...prev,
                [e.target.name]: {
                    ...prev[e.target.name],
                    status: "idle",
                }
            }));
            return;
        }   // 글자를 지우면 아이콘도 사라질 수 있게 status를 초기화 하는 과정. 

        if(e.target.name === "checkPassword" ) {
            if(inputState.password.status ==="success") {
                setInputState(prev => ({
                    ...prev,
                    checkPassword: {
                        ...prev["checkPassword"],
                        status: prev["checkPassword"].value === prev["password"].value ? "success" : "error",
                    }
                }));
            }
            return;
        }   // password 값과 동일한지 checkPassword로 확인하는 과정.
            // 맞는 경우에만 checkPassword도 success로 된다. 

        setInputState(prev => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                status: prev[e.target.name].regex.test(prev[e.target.name].value) ? "success" : "error",
            }
        }));    
            // 정규식에 맞는 경우, 상태값을 변화한 후 
            // 해당 값으로 바꿔준다. 
    }

    useEffect(() => {
        setSubmitDisabled(!!Object.values(inputState).map(obj => obj.status).find(status => status !== "success"));
        // 현재 inputState는 객체 안에 객체 형태이므로
        // 객체에서 map으로 status들만 꺼내 새로운 배열로 만든다.
        // find()로 status값에 error나 idle이 없을 경우에만, 
        // submitButton의 disable을 풀어준다. 
    }, [inputState]);

     return (
        <div css={s.layout}>
            <div css={s.container}>
                <h1 css={s.title}>회원가입</h1>
                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.username.status)}>
                        <input type="text" name='username' value={inputState.username.value} placeholder='사용자 아이디' onChange={handleOnChange} onBlur={handleOnBlur} />
                        <div>
                            {
                                inputState.username.status !== "idle"
                                && (
                                    inputState.username.status === "success" 
                                    ? <MdOutlineCheckCircle />
                                    : <MdOutlineErrorOutline />
                                )
                            }
                        </div>
                    </div>
                    {
                        inputState.username.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.username.message}</div>
                    }
                </div>

                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.password.status)}>
                        <input type={showPassword ? "test" : "password"} name='password' value={inputState.password.value} placeholder='비밀번호' onChange={handleOnChange} onBlur={handleOnBlur} />
                        <p onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <IoEyeOff /> : <IoEye />}</p>
                            {
                                inputState.password.status !== "idle"
                                && (
                                    inputState.password.status === "success" 
                                    ? <div><MdOutlineCheckCircle /></div>
                                    : <div><MdOutlineErrorOutline /></div>
                                )
                            }
                    </div>
                    {
                        inputState.password.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.password.message}</div>
                    }
                </div>

                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.checkPassword.status)}>
                        <input type={showPassword ? "test" : "password"} name='checkPassword' value={inputState.checkPassword.value} placeholder='비밀번호 확인' onChange={handleOnChange} onBlur={handleOnBlur} />
                        <div>
                            {
                                inputState.checkPassword.status !== "idle"
                                && (
                                    inputState.checkPassword.status === "success" 
                                    ? <MdOutlineCheckCircle />
                                    : <MdOutlineErrorOutline />
                                )
                            }
                        </div>
                    </div>
                    {
                        inputState.checkPassword.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.checkPassword.message}</div>
                    }
                </div>

                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.fullName.status)}>
                        <input type="text" name='fullName' value={inputState.fullName.value} placeholder='사용자 이름' onChange={handleOnChange} onBlur={handleOnBlur} />
                        <div>
                            {
                                inputState.fullName.status !== "idle"
                                && (
                                    inputState.fullName.status === "success" 
                                    ? <MdOutlineCheckCircle />
                                    : <MdOutlineErrorOutline />
                                )
                            }
                        </div>
                    </div>
                    {
                        inputState.fullName.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.fullName.message}</div>
                    }
                </div>

                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.email.status)}>
                        <input type="text" name='email' value={inputState.email.value} placeholder='이메일' onChange={handleOnChange} onBlur={handleOnBlur} />
                        <div>
                            {
                                inputState.email.status !== "idle"
                                && (
                                    inputState.email.status === "success" 
                                    ? <MdOutlineCheckCircle />
                                    : <MdOutlineErrorOutline />
                                )
                            }
                        </div>
                    </div>
                    {
                        inputState.email.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.email.message}</div>
                    }
                </div>

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