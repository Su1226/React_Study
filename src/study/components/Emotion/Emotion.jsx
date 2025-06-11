/**
 * Emotion(CSS in JS 라이브러리)
 * 1. 라이브러리 설치 -> npm install @emotion/react
 * 2. jsx 태그의 css 속성 활성화 -> 주석으로 @jsxImportSource @emotion/react
 * 3. css 객체 import -> css`` 문자열로 css를 작성
 * 4. 확장 프로그램으로 vscode-styled-componets 설치
 * 
 * 참고 블로그 : https://velog.io/@favorcho/Emotion-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
 */

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const box1 = css`
    width: 100px;
    height: 100px;
    background-color: black;
`;

const box2 = (color) => css`
    width: 100px;
    height: 100px;
    background-color: ${color};
`;

function Emotion(props) {
    return (
        <div>
            <div css={box1}></div>
            <div css={box2("gray")}></div>
        </div>
    );
}

export default Emotion;