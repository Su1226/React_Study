import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import IndexHeader from '../IndexHeader/IndexHeader';

function IndexLayout({children}) {
    return (
        <div css={s.layout}>
            <IndexHeader />
            {children}
        </div>
    );
}

export default IndexLayout;