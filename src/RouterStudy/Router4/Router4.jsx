import React, { useEffect } from 'react';
import { Route, Routes, useParams, useSearchParams } from 'react-router-dom';

// PathParm
// 경로 안에 값을 전달하는 방법 
// :변수명 -> 다음과 같은 형태로 사용되며, 이는 element의 함수에 값을 전달하게 된다.
function Component1() {
    const { name } = useParams();
    // useParams()가 주소에서 변수값을 객체로 가져오기 때문에,
    // 비구조 할당으로 가져와도 된다. 

    console.log(name);
    return <></>
}

//SearchParm
function Component2(){
    const [ searchParams, setSearchParams ] = useSearchParams();
    // useSearchParams 결과로 배열을 가지고 온다.
    // 때문에 비구조 할당으로 가져오는 것이 가능하다.

    // 주로 검색 기능에서 여러 개를 가져가야할 때 사용된다. 

    useEffect(() => {
        const entries = searchParams.entries();
        let searchParamObj = {};
        while (true) {
            const next = entries.next();    // 첫 번째 entriy객체를 꺼냄.
            if(next.done) {                // 만약 done이 아니라면, 데이터가 더 이상 없다는 의미. 
                break;                      // 그렇기 때문에 종료 한다. 
            }
            const [ key, value ] = next.value;  // 배열이기 때문에 비구조 할당으로 값을 가져올 수 있다.
            
            searchParamObj = {
                ...searchParamObj,
                [key]: value,
            }
        }
        // 한 번에 다 들고 올 수 없기 때문에, 
        // 반복문을 이용해서 모두 들고 올 수 있다. 

        console.log(searchParamObj);                // param2?name=test&age=25&address=busan&&address=seoul 했을 때, seoul이 배열에 담겨있다.
        console.log(searchParams.get("address"));   // param2?name=test&age=25&address=busan&&address=seoul 했을 때, busan을 꺼낸다.
        
        console.log(searchParams.getAll("address"));   // address 모든 값을 꺼내 오려면, getAll()함수를 사용해야 한다. -> 결과 값은 배열로 ['busan', 'seoul']을 가져온다. 

    }, [searchParams])

    // 이를 통해, 조건문을 걸어 해당 조건에 맞는지를 검사할 수도 있다. 

    const handleOnClick = () => {
        setSearchParams(prev => {
            prev.set("address", "busan");
            return prev;
        });
    }

    return <>
        <div>
            <button onClick={handleOnClick}>주소 추가</button>
        </div>
    </>
}



function Router4(props) {
    return (
        <div>
            <Routes>
                <Route path='/param1/:name/:age' element={<Component1 />} />
                <Route path='/param2' element={<Component2 />} />
            </Routes>
        </div>
    );

    // /param1/:name/:age 안에 :로 계속 이어 붙여도 되고,
    // 또는 중간에 주소를 넣었다가, :로 값을 넣어도 된다. 
}

export default Router4;