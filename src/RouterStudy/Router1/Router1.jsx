/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
// Router를 실행하기 위해 필요한 import
// BrowerRouter 태그가 필요하며, 이 안에 감싸져야 한다. 

const layout = css`
    width: 1200PX;
    height: 800px;
`

const header = css`
    width: 100%;
    height: 100px;
    background-color: yellow;
`

const main = (color) => css`
    width: 100%;
    height: 600px;
    background-color: ${color};
`

const footer = css`
    width: 100%;
    height: 100px;
    background-color: green;
`

function Router1(props) {
    const navigate = useNavigate();
    const [ data, setData ] = useState(0);
    
    return (
        <>
            <div css={layout}>
                <header css={header}>
                    <a href={"/color/red"}>RED</a>
                    <a href={"/color/blue"}>BLUE</a>
                    <a href={"/color/orange"}>ORANGE</a>
                    <div></div>
                    <Link to={"/color/red"}>RED</Link>
                    <Link to={"/color/blue"}>BLUE</Link>
                    <Link to={"/color/orange"}>ORANGE</Link>
                    <div></div>
                    <button onClick={() => navigate("/color/red")}>RED</button>
                    <button onClick={() => navigate("/color/blue")}>BLUE</button>
                    <button onClick={() => navigate("/color/orange")}>ORANGE</button>
                    <div>
                        <h1>{data}</h1>
                        <button onClick={() => setData(prev => prev + 1)}>+1</button>
                        <button onClick={() => setData(prev => prev - 1)}>-1</button>
                    </div>
                </header>
                <Routes>
                    <Route path='/color/red' element={<main css={main("red")}></main>}/>
                    <Route path='/color/blue' element={<main css={main("blue")}></main>}/>
                    <Route path='/color/orange' element={<main css={main("orange")}></main>}/>
                </Routes>
                <footer css={footer}></footer>
            </div>
        </>
    );

    // Routes 태그는 BrowserRouter 태그 안에 있어야 한다. 
    // a 태그를 사용하면 처음부터 다시 랜더링을 한다.
    // 그러나 Link Component를 사용하면, 부분만 랜더링을 한다.

    // 화면 상의 차이는 없지만, 
    // 부분 랜더링이 일어난다는 것은, <Routes> 부분만 다시 호출이 일어나는 것이고,
    // 다른 부분은 랜더링이 일어나지 않는다. 

    // 여기서 1 증가하는 버튼 기능을 만들었을 때, 
    // a 태그로 이동하면 이동할때마다 값이 초기화 되지만,
    // Link 태그로 이동하면, 값이 초기화되지 않고 배경색이 바뀐다.
    // 그렇다고 a태그를 사용하지 않는 것은 아니며, 싹 갈아엎을 때 사용된다.
    
    // useNavigate() 함수로도 페이지 이동이 가능하며, 
    // useNavigate()도 Hooks 함수이다. 
}

export default Router1;