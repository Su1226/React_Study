import React, { useEffect, useState } from 'react';
import IndexLayout from '../components/IndexLayout/IndexLayout';
import IndexMain from '../components/IndexMain/IndexMain';

function Index(props) {
    const [ todoList, setTodoList ] = useState([]);

    useEffect(() => {
        console.log(todoList);
    }, [todoList]);

    return (
        <IndexLayout>
            <IndexMain todoList={todoList} setTodoList={setTodoList}/>
        </IndexLayout>
    );
}

export default Index;

// 왜 Index에서 useState([])를 만들었는가?
// 본질적으로 최종으로 Page를 작성하는 것은 Index이며, 
// 다른 Layout이나 Main, Header와 같은 외부로 해당 값을 넘겨주기 위해서
// Index에서 값을 만들고, key-value 값으로 전달한다. 