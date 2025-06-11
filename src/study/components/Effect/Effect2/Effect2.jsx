import { css } from '@emotion/react';
import React, { useState } from 'react';
 /** @jsxImportSource @emotion/react */


 // 매개변수가 필요한 경우에는 다음과 같이 함수로 만들어서 사용해도 되고,
 // 없는 경우에는 변수처럼 사용하면 된다. 
 const style = (p1, p2) => css`
    display: flex;
    box-sizing: border-box;
    border: 5px solid ${p2 ? "green" : "#222"};
    width: 200px;
    height: 200px;
    background-color: ${p1 ? "red" : "blue"};
 `;

function Effect2(props) {

    const [ flag, setFlag ] = useState(false);

    const handleOnClick = () => {
        setFlag(prev => !prev);
    }

    return (
        <div>
            <div css={style(false, true)}>

            </div>
            <button onClick={handleOnClick}>변경</button>
        </div>
    );
}

export default Effect2;