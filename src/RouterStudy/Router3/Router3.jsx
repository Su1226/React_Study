import React, { useEffect } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

/**
 * 경로(path) 관리
 * 이동(history) 관리  
 */

function Router3(props) {
    const location = useLocation();
    const navigate = useNavigate();
    // useNavigate()가 있으면 함수 호출로 페이지 이동이 가능하다. 

    useEffect(() => {
        console.log("경로 이동함!");
        console.log(location.pathname); // 현재 경로

        if(location.pathname === "/location/2") {
            navigate("/location/3", {
                state: {
                    name: "이수원",
                    age: 25,
                }
            }); 
            // navigate에 값을 줄 수 있는데, 이때 값은 객체{}로 넘겨줘야 한다.
            // 주소로 값을 넘겨주게 되면 정보가 노출되기 때문에,
            // 이를 통해, 데이터를 숨겨서 보낼 수 있게 된다. ㅣ
        }
[]
    }, [location.pathname]);

    useEffect(() => {
        console.log("쿼리(서치)파람 변경!!");
        console.log(decodeURI(location.search));
    }, [location.search]);

    useEffect(() => {
        console.log(location.state);
    }, [location.state]);


    // 이전의 상태로 되돌아간다.
    // 그냥 되돌아 가기 기능
    // 대신 이전의 상태 그대로를 기억하고 있어서 
    // 새로 만들어지는 것이 아니라, 그대로 이동하는 것이다. 
    const handleBackOnClick = () => {
        navigate(-1);
    }

    return (
        <div>
            <Link to={"/location/1"}>Location1</Link>
            <Link to={"/location/2"}>Location2</Link>
            <Link to={"/location/3"}>Location3-1</Link>
            <Link to={"/location/3?name=이수원"}>Location3-2</Link>
            <Link to={"/location/3?name=이수이"}>Location3-3</Link>
            <button onClick={handleBackOnClick}>뒤로가기</button>
            <Routes>
                <Route path='/location/1' element={<h1>Location 1</h1>} />
                <Route path='/location/2' element={<h1>Location 2</h1>} />
                <Route path='/location/3' element={<h1>Location 3</h1>} />
            </Routes>
        </div>
    );
}

export default Router3;