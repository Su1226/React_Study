import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import IndexHeader from '../IndexHeader/IndexHeader';

function IndexLayout({childern}) {
    return (
        <div css={s.layout}>
            <IndexHeader />
            {childern}
        </div>
    );
}

export default IndexLayout;