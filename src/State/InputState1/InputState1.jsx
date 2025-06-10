import { useState } from "react";

function InputState1() {

    // input에 입력되는 값을 받을 변수
    const [ InputValue1, setInputValue1 ] = useState("");
    const [ InputValue2, setInputValue2 ] = useState("");

    // input 받은 값을 저장 할 변수 
    const [ stringVlaue1, setStringValue1 ] = useState("");
    const [ stringVlaue2, setStringValue2 ] = useState("");

    console.log("랜더링");

    // e.target.value는 이벤트 객체를 꺼내오는데,
    // 같은 input이 여러 개 있다고 하더라도 다른 객체의 input이다. 
    // 즉, e.target.value는 그런 여러 개의 input들을 구분할 수 있을 뿐 아니라,
    // 버튼 같은 요소들도 target 대상을 알아낼 수 있다. 
    // 같은 요소라고 하더라도 다른 객체로 인식하도록 할 수 있게 하는 것이 e.target.value이다.
    // 단, e는 이벤트 객체이므로, 이벤트가 있는 경우에만 확인 가능하다. 
    // e.target.value는 이벤트가 일어난 곳에 입력된 값을 의미한다. 
    // console창에 log를 찍어 확인 할 수 있다. 

    const handleName1OnChange = (e) => {
        setInputValue1(e.target.value);
        console.log("1번" + e.target.value);
    }

    const handleName2OnChange = (e) => {
        setInputValue2(e.target.value);
        console.log("2번" + e.target.value);
    }

    const handleButtonOnClick = () => {
        setStringValue1(InputValue1);
        setStringValue2(InputValue2);
        console.log("버튼 클릭");
    }


    // onChange는 '값이 바뀌면' 발생하는 이벤트 함수이다.
    // 여기서 on이 이벤트 함수라는 것을 알 수 있는 키워드이다.
    // 이벤트 함수를 잘 사용하면, 반복되는 코드를 줄일 수 있다. → InputState2
    return <div>
        <h1>{stringVlaue1}</h1>
        <h1>{stringVlaue2}</h1>
        <input type="text" value={InputValue1} onChange={handleName1OnChange}/>
        <input type="text" value={InputValue2} onChange={handleName2OnChange}/>
        <button onClick={handleButtonOnClick}>확인</button>
    </div>
    // value={inputValue}가 계속해서 초기값으로 돌려놓기 때문에,
    // 입력창에 아무것도 적히지 않는다. 
    // 때문에 setInputValue를 이벤트 핸들러에 있어줘야 한다. 

    // 그렇다면 이런 기능이 왜 생겼는가?
    // 만약 전송 버튼의 경우 입력창 안에 있던 내용들이 사라져야 한다. 
    // 해당 기능을 구현하기 위해서 입력창 상태가 나왔다. 

    // 리액트에서 JQuery를 적거나 DOM 객체에 직접 접근하는 방법을 피하기 위해 만들어 진 것.
    // 따라서 해당 방법으로 코드를 작성하지 말 것. 
}

export default InputState1;