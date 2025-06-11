import { css } from "@emotion/react";

export const container = css`
    display: flex;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    width: 100%;
    height: 40px;
    overflow: hidden;
`;

export const searchInput = css`
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 5px 15px;
`;

export const searchButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 50px;
    font-size: 18px;
    cursor: pointer;

`;

// react-icons에서 아이콘을 사용할 수 있다.
// 해당 사이트에서 아이콘을 찾아서, 
// 코드로 사용할 수 있으며
// 사용하기 전에 npm install react-icons로 설치가 필요하다. 
// https://react-icons.github.io/react-icons/

// 아이콘은 font로 처리할 예정. 

export const filterContainer = css`
    display: flex;
    justify-content: end;
    box-sizing: border-box;
    width: 100%;
    padding: 5px 10px;
`;