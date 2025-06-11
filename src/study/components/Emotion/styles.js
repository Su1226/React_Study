import { css } from "@emotion/react";

export const box1 = css`
    width: 100px;
    height: 100px;
    background-color: black;
`;

export const box2 = (color) => css`
    width: 100px;
    height: 100px;
    background-color: ${color};
`;

// 앞으로는 css 파일이 아니라 js 파일로 작성할 예정.
