import { useState } from "react";

function Calculator() {
    const [ result, setResult ] = useState(0);
    const [ input, setInput ] = useState("0");

    const getResult = () => {
        let inputText = input;
        let plusNums = [];
        let minusNums = [];
        let lastCalc = "";

        const plusIndex = inputText.indexOf("+");
        const minusIndex = inputText.indexOf("-");
        
        if(plusIndex === -1 && minusIndex === -1) {
            // 플러스도 마이너스도 아무것도 없는 경우
            return;
        }
        
        if(plusIndex < 0) {
            // 플러스가 없는 경우
            // 위에서 아무것도 없는 경우를 작성했으므로, 마이너스만 있는 경우이다. 
            const numText = inputText.substring(0, minusIndex);
            const restNumText = inputText.substring(minusIndex + 1); 

            console.log(plusIndex);
            console.log(minusIndex);

            setResult(numText - restNumText);
            
        }

        if (minusIndex < 0) {
            // 마이너스가 없는 경우
            // 위에서는 아무거도 없는 경우를 확인했으므로, 플러스만 있는 경우이다.
            const numText = inputText.substring(0, plusIndex);
            const restNumText = inputText.substring(plusIndex + 1); 

            console.log(plusIndex);
            console.log(minusIndex);

            setResult(parseInt(numText) + parseInt(restNumText));
        }

        if (plusIndex < minusIndex) {
            const numText = inputText.substring(0, plusIndex);
            const restNumText = inputText.substring(plusIndex + 1); 
        } else {
            const numText = inputText.substring(0, minusIndex);
            const restNumText = inputText.substring(minusIndex + 1); 
        }

    }

    const handleInputOnClick = (e) => {
        if(e.target.value === "=") {
            getResult();
            // setResult(eval(input)); // eval() : 문자열 형태로 전달된 코드를 실행하는 함수.  
            // setInput("0");
            return;
        }

        if (input === "0") {
            setInput(e.target.value);
        } else {
            setInput(input + e.target.value)
        }
    }

    return <div>
        <h1>입력 : {input}</h1>
        <h1>결과 : {result}</h1>
        <div>
            <button onClick={handleInputOnClick} value={0}>0</button>
        </div>
        <div>
            <button onClick={handleInputOnClick} value={1}>1</button>
            <button onClick={handleInputOnClick} value={2}>2</button>
            <button onClick={handleInputOnClick} value={3}>3</button>
        </div>
        <div>
            <button onClick={handleInputOnClick} value={4}>4</button>
            <button onClick={handleInputOnClick} value={5}>5</button>
            <button onClick={handleInputOnClick} value={6}>6</button>
        </div>
        <div>
            <button onClick={handleInputOnClick} value={7}>7</button>
            <button onClick={handleInputOnClick} value={8}>8</button>
            <button onClick={handleInputOnClick} value={9}>9</button>
        </div>
        <div>
            <button onClick={handleInputOnClick} value={"+"}>+</button>
            <button onClick={handleInputOnClick} value={"-"}>-</button>
            <button onClick={handleInputOnClick} value={"="}>=</button>
        </div>
    </div>
}

export default Calculator;