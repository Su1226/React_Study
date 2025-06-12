import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const listContainer = css`
    flex-grow: 1;
    border: 1px solid #dbdbdd;
    border-radius: 8px;
    overflow: hidden;

    & > ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        height: 432px;
        overflow-y: scroll;

        & > li {
            display: flex;
            box-sizing: border-box;
            border-bottom: 1px solid #dbdbdd;
            padding: 5px 15px;
            
            & > input[type=checkbox] {
                display: none;

                & + label {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-sizing: border-box;
                    border: 1px solid #dbdbdd;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                }

                &:checked + label::after {
                    content: "";
                    display: block;
                    border-radius: 50%;
                    width: 15px;
                    height: 15px;
                    background-color: #0b4f8f;
                }
            }
        }
    }
`;

export const todoTextContainer = (isOpen) => css`
    margin-left: 10px;


    
    width: 280px;
    text-align: start;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    ${
        isOpen ?
       `white-space: break-spaces;
        overflow-wrap: break-word;
        word-wrap: break-word;
        text-overflow: ellipsis; `
        : 
        `white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;`
    }
`


export const todoInputContainer = css`
    box-sizing: border-box;
    margin-top: 10px;
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    width: 100%;
    height: 40px;
    overflow: hidden;

    & > input {
        box-sizing: border-box;
        border: none;
        outline: none;
        padding: 5px 15px;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
`;