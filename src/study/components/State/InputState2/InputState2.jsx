import { useState } from "react";

function InputState2() {
    
    // useState()를 객체로 값을 지정할 수 있도록 {}을 넣을 수 있다. 
    const [ inputValue, setInputValue ] = useState({
        t1: "",
        t2: "",
        t3: "",
    });


    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(`name : ${name}, value : ${value}`);

        const newInputValue = {
            ...inputValue,
            [name]: value,
        }

        setInputValue(newInputValue);

        // 위와 같이 하면, 여러 번 함수를 만들거나 비구조 할당을 만들지 않아도 된다.
        // 대신 속성 값은 늘어날 수 있다. 
    }  
    // ------------------------------------------------------- //
    const addr = "address"
    const address = "부산 사상구"
    const obj = {
        name: "이수원",
        age: 25,
        [addr]: address,
            ddress: "부산 진구",
    }

    // 객체에서 addr을 그냥 쓸 수 없지만, 
    // []를 쓰면, "address"라는 문자열을 넣을 수 있기 때문에
    // 값을 쓸 수 있게 된다. 단, 키 값만 가능하다. 
    // value 값은 변수를 그냥 직접 참조해서 적으면 된다.
    // value 값에 []를 넣으면 배열이나 리스트에 값을 넣은 것이 된다. 
        
    // 위 객체는 현재 key 값에 address라는 값이 중복되고 있다.
    // 이때, 뒤에 쓰여진 address 값이 쓰여진다. 

    const obj2 = {
        name: obj.name,
        age: obj.age,
        address: obj.address
    } // obj 객체 자체의 값을 복사하기 때문에 '깊은 복사'이다. 

    const obj3 = {
        ...obj
    } // obj의 객체 안에 있는 키와 value 값을 전부 복사한 것. 
    // 위 개념이 Spread(특정 배열 혹은 객체 값을 복제하는 문법)이다.
    // 반대 개념은 Rest로, 특정 배열 혹은 객체가 아닌 개별 요소들을 하나의 배열로 만든다. 

    const obj4 = obj; 
    // obj 객체의 주소 값을 가지고 있는 것이기 때문에, '얕은 복사'이다. 
    

    // 함수의 주소 개념도 중요하다. 
    // 한 번 호출이 일어날 때마다 주소가 달라진다. 
    // 호출 할 때마다 메모리가 재정의가 되기 때문에 낭비가 심하다.
    // 나중에 Memoization을 통해 이러한 문제를 해결한다. 

    const fx3 = handleOnChange;
    // fx3에 handleOnChange 함수의 주소가 같기 때문에,
    // onChange 이벤트 함수에 fx3을 넣어도 동일하다. 

    return <div>
        <input type="text" name="t1" value={inputValue.t1} onChange={handleOnChange}/>
        <input type="text" name="t2" value={inputValue.t2} onChange={handleOnChange}/>
        <input type="text" name="t3" value={inputValue.t3} onChange={handleOnChange}/>

        <input type="text" value={inputValue.t4} onChange={(e) => {console.log(e)}}/>
        <input type="text" value={inputValue.t5} onChange={(e) => {console.log(e)}}/>
        <input type="text" value={inputValue.t6} onChange={(e) => {console.log(e)}}/>
    </div>

    // t1, t2, t3는 다른 함수를 정의한 것으로 서로 다른 함수이다. 
    // t4, t5, t6는 같은 함수를 사용한다. (handleOnChange)
}

export default InputState2;