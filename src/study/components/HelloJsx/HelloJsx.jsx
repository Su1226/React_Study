/**
 *      [[  JSX의 특징  ]]
 *  1. 태그가 열리면 꼭 닫혀야 한다. 
 *  2. input과 br 태그도 반드시 닫혀야 한다. 
 * 
 */

function HelloJsx() {

    // 1. 태그가 열리면 꼭 닫혀야 한다. 
    const jsx1 = <div>
        <p>JSX의 특징</p>
        <input type="text" />
    </div>
    // HTML 코드가 담겨 있는 것을 JSX라고 한다. 

    // 2. 두 개 이상의 JSX는 하나의 JSX로 감싸야 한다. 
    // div태그 안에 div가 2개 이상 들어갈 수 있다. 
    const jsx2 = <div> 
            <div></div>
            <div></div> 
        </div>

    // 3. 변수, 상수, 리스트, 값 등을 표현하려면 {}로 감싸서 표현한다. 
    const name = '이수원';
    const age = 25;

    const jsx3 = <div>
        <h3>이름 : {name}</h3>
        <h3>나이 : {age + 1}</h3>
    </div>

    // 4. 2번에서의 2개 이상의 jsx는 하나로 감싸야 한다고 배웠다.
    //    이때, 그룹을 만들기 위해 만들어진 태그가 있다. <> </>
    // 5. jsx 문법 내에서 주석은 {/** */}으로 한다. 
    const jsx4 = <> 
        <div></div> 
        <div></div> 
    </>

    const jsx5 = <> 
    {/** */}
        <div></div> 
        <div></div> 
    </>

    const jsx6 = <div> 
        {jsx4}
        {jsx5}
    </div>

    // 리스트 표현하기 
    const nameList = [
        <div>이수원</div>,
        <div>이수이</div>,
        <div>이수삼</div>,
        <div>이수사</div>,
    ];
    // 문자열이 아니라서 join을 할 필요도 없다. 

    const nameList2 = [
        "이수원",
        "이수이",
        "이수삼",
        "이수사",
    ];

    return <div>
        {jsx1}
        {jsx2}
        {jsx3}
        {nameList}
        {nameList2.join()}
    </div>
}

export default HelloJsx;