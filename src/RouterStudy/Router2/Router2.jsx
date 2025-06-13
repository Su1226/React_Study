import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

/** 
 * 하위 라우트 (sub route)
*/

function Page1() {
    return <div>
        <h1>Page1</h1>
        <Routes>
            <Route path='/page1' element={<h1>페이지 1 입니다.</h1>} />
            <Route path='/page2' element={<Page2 />} />
        </Routes>
    </div>
}   // 하위에도 라우터를 걸어줄 수 있다. 

function Page2() {
    return <div>
        <h1>Page2</h1>
    </div>
}

function Router2(props) {
    return (
        <div>
            <header>
                <Link to={"/pagestudy/page1"}>PAGE1</Link>
                <Link to={"/pagestudy/page2"}>PAGE2</Link>
                <Link to={"/pagestudy2/name1"}>NAME1</Link>
                <Link to={"/pagestudy2/name2"}>NAME2</Link>
            </header>
            <h1>Router 2</h1>
            <Routes>
                <Route path='/pagestudy/*' element={<Page1 />}/>
                <Route path='/pagestudy2/*' element={<Routes>
                    <Route path='/name1' element={<h1>이수원</h1>} />
                    <Route path='/name2' element={<h1>이수이</h1>} />
                </Routes>}/>
            </Routes>
        </div>
    );  // 상위 라우터 

    // 위에 새로운 컴포넌트로 하위 라우터를 빼도 되지만,
    // 위와 같이 상위 라우터 바로 아래에 하위 라우터를 작서할 수 있다. 

    // *의 의미는 전체를 의미한다.
    // 즉, pagestudy에 있는 Page1의 모든 것을 가져오라는 의미.

    // Route의 Path가 상태로 사용되고 있음을 알 수 있다. 
}

export default Router2;
