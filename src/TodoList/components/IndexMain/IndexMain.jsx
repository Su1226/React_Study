import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { IoTrash } from 'react-icons/io5';

function IndexMain({todoList, setTodoList}) {

    const [ inputValue, setInputValue ] = useState("");
    const [ contentsOpenId, setContentsIdOpent ] = useState(0);

    const handleOnChange = (e) => {
        setInputValue(e.target.value);
    }

    // 키가 눌려졌을 때, 실행될 함수. 
    const handleOnKeyDown = (e) => {
        if(e.keyCode !== 13) {
            return ;
        } 
        // enter을 치지 않으면 그냥 return. 
        // 즉, enter를 쳐야지만 입력이 아래 코드들이 실행되며 입력이 가능하다.

        if (inputValue.trim().length === 0) {
            return ;
        }
        // space값, 또는 공백값이 있을 경우에는 그냥 return. 

        console.log("todo 등록")

        // Input 창에 입력된 내용들을 리스트에 저장하는 setter. 
        setTodoList(prev => {
            // prev는 todoList에 담긴 리스트를 전부 가져온다. 
            const lastId = (prev.length === 0 ? 0 : prev[prev.length - 1].id);
            // 처음 가져오는 것은 아무것도 없는 빈 리스트일 것이다. 그렇기 때문에 0.
            // 만약 처음 가져오는 것이 아니라면, prev.length - 1로 리스트의 마지막 인덱스를 가져온다. 

            const newTodo = {
                id: lastId + 1,
                isComplete: false,
                content : inputValue,
            }
            // input창에 입력된 내용을 갱신하며, 
            // lastId로 이전 값에 있던 id에서 + 1을 해주므로써 갱신을 해준다. 
            // 입력 내용을 담을 새로운 객체를 선언한 것. 

            return[...prev, newTodo];
            // spread를 활용하여, 이전의 Todo 내용과 새로 작성된 Input의 Todo를 
            // 배열에 넣어 return 해준다. 
        })

        setInputValue("");  // 글을 다 작성한 후에 input 창을 비워준다. 
    }

    const handleCheckBoxOnChange = (e) => {
        const todoId = parseInt(e.target.value);
        // 처음 id 값은 string으로 들어올 것이기 때문에,
        // Int 형태로 바꿔준 뒤에 값을 받아온다. 

        setTodoList(prev => prev.map(todo => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    isComplete: !todo.isComplete,
                }
            }
            return todo;
        }));
        // .map()이용하여 객체를 하나씩 담아주게 되는데, 
        // 만약 if 값이 없었다면 그냥 모든 Todo 객체를 담는 함수이다.
        // if문의 todo.id === todoId은 기존의 Id와 받아온 Id가 같은 경우,
        // 객체의 내용들을 그대로 가져오나, isComplete는 가져온 것의 반대값으로 설정한다. 
        // 다른 경우에는 이전의 객체들은 그대로 들고온다. 

    }

    const handleContentsOpenOnClick = (todoId) => {
        setContentsIdOpent(prev => prev !== todoId ? todoId : 0);
        // 아래의 return 값에 들어 있는 내용과 참조하여 볼 것.
        // 우선, 이전의 Todo 내용이 아닌, 다른 내용의 Content를 클릭하는 경우,
        // 두 글의 id를 비교하여, 다르다면 클릭한 todoId를 반환하며, 
        // 똑같은 글을 두번 클릭한 것이기 때문에 id값을 0으로 처리한다. 

        // 따라서 클릭이 일어날 때 발생하는 것이기에, 
        // 아래 return 값에서 먼저 todoId를 먼저 가져와야만 한다. 
    }

    const handleDeleteOnClick = (todoId) => {
        setTodoList(prev => prev.filter(todo => todo.id !== todoId));
        // 위 코드는 div에 코드를 올렸을 때, 삭제 기능이 담긴 아이콘이 뜨고
        // 삭제를 클릭하게 되면, 현재 삭제하려는 id와 다른 것들은 다른 배열에 담고,
        // 삭제하고자 하는 id의 DOM만 삭제가 된다. (<li>~<li>)

    }

    return (
        <div css={s.container}> 
            <div css={s.listContainer}>
                <ul>
                    {
                        todoList.map(todo => (
                            <li key={todo.id}>
                                <input type="checkbox" id={`todo${todo.id}`} value={todo.id} checked={todo.isComplete} onChange={handleCheckBoxOnChange} />
                                <label htmlFor={`todo${todo.id}`}></label>
                                <div css={s.todoTextContainer(contentsOpenId === todo.id)} onClick={() => handleContentsOpenOnClick(todo.id)}>{todo.content}</div>
                                <div css={s.hiddenTrashBox}>
                                    <div css={s.TrashBox} onClick={() => handleDeleteOnClick(todo.id)}>
                                        <IoTrash />
                                </div>
                                </div>
                            </li>
                        ))

                        // ul 안의 li가 계속 추가될 것이기 때문에, 
                        // todoList에 값을 넣어주기 위해 map을 통해 값을 넣어준다. 
                        // 단, 데이터가 들어가기 시작할 때부터 돌아가기 시작한다. 

                        // li의 key값을 주어서, 값을 비교해서 동작을 실행한다.                               
                    }

                </ul>
            </div>
            <div css={s.todoInputContainer}>
                <input type="text" value={inputValue} onChange={handleOnChange} onKeyDown={handleOnKeyDown}/>
            </div>

        </div>
    );
}

export default IndexMain;

// 코드를 먼저 보기 전에 화면을 보면서 '어떻게 동작하고, 무엇이 필요할까?'를 먼저 고민한다.
// 그 다음 코드를 보면서, 화면과 동작을 확인한다. 