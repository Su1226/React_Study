import React, { use, useEffect, useState } from 'react';
import IndexLayout from '../components/IndexLayout/IndexLayout';
import IndexMain from '../components/IndexMain/IndexMain';

function Index(props) {
    const [ isLoad, setLoad ] = useState(false);
    const [ todoList, setTodoList ] = useState([]);
    const [ filter, setFilter ] = useState("incomplete");
    const [ searchText, setSearchText ] = useState("");


    // 새로고침을 하면 데이터가 사라지기 때문에,
    // Local storage를 이용해서 데이터를 저장한다. 
    useEffect(() => {
        let localStorageTodoList = localStorage.getItem("todoList");
        if(!localStorageTodoList) { 
            localStorage.setItem("todoList", JSON.stringify([]));   // JSON으로 값을 넣어야 함.
            localStorageTodoList = [];
            setTodoList(localStorageTodoList);
        } else { 
            setTodoList(JSON.parse(localStorageTodoList));          // JSON에서 문자열로 반환해서 넣어야 함. 
        }
        setLoad(true);
    }, []); // 최초에 한번만 한다. 


    // todoList의 상태가 바뀌면 발생하는 함수.
    // 또한 두 개의 useEffect() 사이에서 누가 먼저 호출이 될 지 모른다.
    // 위에 것이 먼저 실행 될 때는 문제가 없으나,
    // 아래 것이 먼저 실행되면 문제가 된다.

    useEffect(() => {
        setSearchText("");

        if(isLoad) {
            let localStorageTodoList = localStorage.getItem("todoList");
            const todoListJson = JSON.stringify(todoList)
            if (localStorageTodoList !== todoListJson) {
                localStorage.setItem("todoList", todoListJson);
            }
        }
    }, [isLoad, todoList]);
    // 최초 한 번, 위에서 만들어지지 않으면 해당 useEffect()는 실행되지 않는다.
    // [] 안에 isLoad를 넣으므로써, 최초 한 번 실행되는 useEffect()가 실행 된 후에 
    // isLoad가 true로 변해야지만, 아래 것이 무사히 실행되며 오류를 해결할 수 있다. 
    // 때문에, todoList의 상태가 변하면 해당 useEffect()는 계속 실행되며 변한다.


    // 검색 기능을 위한 filter.
    const filterTodoList = todoList.filter(todo => {
        if (filter === "all") {
            return true;
        } else if (filter === "complete") {
            return todo.isComplete;
        } else if (filter === "incomplete") {
            return !todo.isComplete;
        }
    }).filter(todo => {
        if (searchText.trim().length === 0) {
            return true;
        }   // 검색 기능으로, 만약 공백이거나 띄어쓰기가 있으면 그냥 원래대로.
        return todo.content.includes(searchText);
        // 검색된 내용만 포함하여 보여준다. 
    });

    return (
        <IndexLayout filter={filter} setFilter={setFilter} setSearchText={setSearchText} >
            <IndexMain todoList={filterTodoList} setTodoList={setTodoList} />
        </IndexLayout>
    );
}

export default Index;

// 왜 Index에서 useState([])를 만들었는가?
// 본질적으로 최종으로 Page를 작성하는 것은 Index이며, 
// 다른 Layout이나 Main, Header와 같은 외부로 해당 값을 넘겨주기 위해서
// Index에서 값을 만들고, key-value 값으로 전달한다. 