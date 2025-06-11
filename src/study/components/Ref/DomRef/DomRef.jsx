import { useEffect, useRef, useState } from 'react';
import fx1, {fx2, fx3} from '../Function/Function';
// 또는 ' * as f ' 라고 쓰면, 전부 가져오며
// 아래에서 f.fx2로 사용할 수 있다. 

function DomRef(props) {
    const [ name, setName ] = useState();
    const inputRef = useRef()

    // 마운트, 언마운트 관리 
    // useEffect()는 랜더링이 일어나면, 부품(return)이 준비되고
    // return이 일어났을 때, 실행되어야 할 함수이다. 
    // 즉, 콜백 함수로, return 이후에 화면에 뿌려지는 이후 실행되는 함수이다.
    // useEffect()에서만 발생하는 개념. 
    useEffect(() => {
        console.log("마운트(장착)");
        console.log(inputRef.current.value);
        return () => {  
            // 해당 return은 실제 화면에 뿌려지는 화면이 
            // 거두어 질 때 실행되는 부분이다. (재랜더링이 일어났을 경우 등.)
            console.log("마운트(해제)")
        }
    })

    console.log("랜더링2");

    return (
        <div>
            <input type="text" ref={inputRef} value={"ABC"}/>
        </div>
    );
    // useRef를 사용하고 싶다면, return이 된 이후에, 
    // 즉, useEffect와 함께 사용되어야 한다. 
}

export default DomRef;