import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import IndexHeader from '../IndexHeader/IndexHeader';

function IndexLayout({filter, setFilter, setSearchText, children}) {
    return (
        <div css={s.layout}>
            <IndexHeader filter={filter} setFilter={setFilter} setSearchText={setSearchText} />
            {children}
        </div>
    );
}

export default IndexLayout;

// Header에 검색을 할 수 있도록 화면을 구성했기 때문에,
// Header에 Search Props객체를 넣어서 값을 전달한다. 

// 또, 화면에서 전체, 완료, 미완료도 Header에 있기 때문에
// 이를 찾는 것 역시 Header에서 진행한다. 

// IndexHeader.jsx 코드로 가보자. 