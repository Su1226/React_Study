import { useState } from "react"

function InputState3() {
    const studentInputValueEmpty = {
        name: "",
        age: "",
        address: "",
    }

    const [ studentInputValue, setStudentInputValue ] = useState(studentInputValueEmpty);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        
        setStudentInputValue((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        }); // setStudentInputValue(prev => ({...prev, [name]: value})); 와 동일한 코드. 

        // setter는 함수도 받는데, 
        // 함수에서 매개변수로 할 때, 입력값을 가져온다.
        // 즉, prev == studentInputValue 이다. 
        // setter 자체에서 원래 안의 상태값을 가져오게 된다. 
        // (주로 prev라는 이름으로 많이 사용됨.)
        // 앞으로 setter 부분은 위와 같이 쓸 예정이다. -> 최적화가 된 상태이기 때문에. 
    }

    return <div>
        <h1>{studentInputValue.name}</h1>
        <h1>{studentInputValue.age}</h1>
        <h1>{studentInputValue.address}</h1>
        <input type="text" name="name" value={studentInputValue.name} onChange={handleOnChange}/>
        <input type="text" name="age" value={studentInputValue.age} onChange={handleOnChange}/>
        <input type="text" name="address" value={studentInputValue.address} onChange={handleOnChange}/>
    
        <button onClick={() => setStudentInputValue(studentInputValueEmpty)} >reset</button>
    </div>
}

export default InputState3;