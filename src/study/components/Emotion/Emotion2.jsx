/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React from 'react';
// import { box1, box2 } from './style';
 // 하나하나씩 가져오면 import가 늘어나기 때문에,
 // * 로 모든 내용을 가져오도록 한 다음 as로 별칭을 붙여 
 // s.box1 형태로 작성하도록 한다. 

function Emotion2(props) {
    return (
        <div>
            <div css={s.box1}></div>
            <div css={s.box2("gray")}></div>
        </div>
    );
}

export default Emotion2;