import { useState } from "react";

function CountState() {
    
    // 앞으로 렌더링이 되는 변수의 경우, useState() 함수를 사용되어야 한다. 
    const CountState = useState(0); 

    // 따라서 앞으로 react에서는 아래와 같이 사용하지 않을 예정. 
    let count = 0;
    console.log("렌더링");

    const handlePlusOnClick = (e) => {
        console.log(e);
    }

    
    const handleMinusOnClick = (e) => {
        console.log(e);
    }
    
    // 굳이 두개를 만들지 않아도, 하나의 함수를 만들어 value 값을 줄 수 있다.
    const handleOnClick = (e) => {
        console.log(e);
        console.log(e.target.value);

        const num = parseInt(e.target.value);
        console.log(typeof(num));

        // CountState[0] += num;
        // 위 코드가 아니라 아래 코드처럼 해야지 값이 증가하거나 감소한다. 
        // 0번 인덱스는 초기값, 1번 인덱스값이 함수. 
        // 1번 인덱스가 값을 변경해줄 수 있는 setter 함수가 들어있기 때문에 
        // 결과로 렌더링이 일어나면서 값이 감소하거나 증가한다. 
        CountState[1](CountState[0] + num);
    }

    // 이벤트 객체에서 target을 잘 쓰는 것이 중요하다.
    // value 값은 들어올 때, 무조건 string으로 들어온다. 


    // 위의 함수대로 count가 바뀌게 하려면 
    // 다시 호출을 해줘야 한다. 
    // 이것이 DOM이자 JavaScript의 한계. 
    // 앞으로 return은 lendering 된다라고 표현한다.
    // 다시 호출을 해야지 다시 렌더링이 되면서 화면에 적용이 적용되기 때문이다. 
    return <div>
        <h1>{CountState[0]}</h1>
        <button onClick={handleOnClick} value={"1"}>+1</button>
        <button onClick={handleOnClick} value={"-1"}>-1</button>
    </div>;
}

export default CountState;