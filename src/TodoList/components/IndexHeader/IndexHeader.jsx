/** @jsxImportSource @emotion/react */
import { IoSearch } from 'react-icons/io5';
import * as s from './styles';
import React, { useEffect, useState } from 'react';

function IndexHeader({filter, setFilter, setSearchText}) {

    // 우선 '전체', '완료', '미완료'를 구분하기 위해서 
    // filter를 이용하여 찾을 예정. 

    const [ searchInputValue, setSearchInputValue ] = useState("");
    // 실시간으로 상태가 변화하기 때문에, 비구조 할당으로 프로미스 객체 생성. 

    const handleSearchInputOnChange = (e) => {
        setSearchInputValue(e.target.value);
    }

    const handleSearchInputOnKeyDown = (e) => {
        if (e.keyCode !== 13) {
            return;
        }
        // Enter를 누르지 않으면 종료된다.
        // Enter를 눌러야만 아래 코드가 진행된다.

        // 검색할 단어나 글자 등 입력을 받아서 setter.
        setSearchText(searchInputValue);
    }

    const handleSearchButtonOnClick = (e) => {
        setSearchText(searchInputValue);
    }

    const handleFilterOnChange = (e) => {
        setFilter(e.target.id);
        
        // 찾고자 하는 단어나, 글자의 id값을 가져와서 setter/ 
    }

    return (
        <>
            <div css={s.container}>
                <input css={s.searchInput} type="text" value={searchInputValue} onChange={handleSearchInputOnChange} onKeyDown={handleSearchInputOnKeyDown} />
                <button css={s.searchButton} onClick={handleSearchButtonOnClick} ><IoSearch /></button>
            </div>
            <div css={s.filterContainer}>
                <input type="radio" name="filter" id="all" checked={filter === "all"} onChange={handleFilterOnChange} />
                <label htmlFor="all">전체</label>
                <input type="radio" name="filter" id="complete" checked={filter === "complete"} onChange={handleFilterOnChange} />
                <label htmlFor="complete">완료</label>
                <input type="radio" name="filter" id="incomplete" checked={filter === "incomplete"} onChange={handleFilterOnChange} />
                <label htmlFor="incomplete">미완료</label>
            </div>
        </>
    )
}

export default IndexHeader;