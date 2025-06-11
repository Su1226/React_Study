// 자식 요소를 전달하는 방법
// 1. props 속성을 사용해서 전달. 
// 2. props에 내장 되어진 dhildren 속성을 사용해서 전달.

function Props3({chap1, children}) {
    // 비구조 할당으로 가져오는 경우
    // ({chap1, children})으로 가져온다.

    // 즉 props를 통해 외부에서 값을 가져올 수 있다.  
    // 비구조 할당 시, 해당 변수는 필요 없게 된다. 
    // const chap1 = <h2>chapter01</h2>


    // 비구조 할당 시, 아래와 같이 간단하게 코드가 작성이 된다. 
    return <div>
        <h1>자식요소 학습하기</h1>
        {/* {props.chap1}
        {props.children} */}
        {chap1}
        {children}
    </div>
}

// 가능하면 children으로 자식요소를 받아오는 것이
// 추후에 레이아웃을 나눌 때 편리하므로, 해당 방법을 추구할 것.

export default Props3;


function fx1() {
    const obj = {
        data1: "d1",
        data2: "d2",
    }

    const obj2 = obj;
    const { data1, data2 } = obj;
    // 두 변수 모두 obj라는 객체를 참조하고 있다. 

    const objData1 = obj.data1; 
    // 아래처럼 똑같이 하는게 아니라 objData1 변수명을 넣기만 하면 된다. 
    console.log(obj.data1);
    console.log(obj.data1);
    console.log(obj.data1);
    console.log(obj.data1);
    console.log(objData1);
    console.log(objData1);
    console.log(objData1);
    console.log(objData1);
    console.log(data1);     // 비구조할당으로 값을 넣을 수 있다. 

    function fx2(oData1, oData2, oData3, oData4) {
        
    }

    fx2(obj.data1, obj.data2, obj.data1, obj.data2);    // 귀찮고 더럽다. 
    fx2(obj);   // 객체 자체로 묶어서 보내버리도록 한다.
}