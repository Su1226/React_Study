import Props1 from "./Props1/Props1";
import Props2 from "./Props2/Props2";
import Props3 from "./Props3/Props3";

function HelloProps() {

    return <div>
        <Props1 />
        <Props2 a={"data1"} b={"data2"}/> 
        <Props2 a={"data3"} b={"data4"}/> 
        <Props2 a={10} b={20}/> 
        <Props3 chap1={<h2>Chapter01</h2>} />
        <Props3>
            <h2>Chapter01</h2>
            <h2>Chapter02</h2>
        </Props3>
    </div>
}

// Conponet를 만드는 기준은 
// 함수의 사용 이유와 똑같이, 중복을 제거하고 기능별로 분류하는 것이다. 
// 기존에 있던 태그처럼 만들어서 함수로 기능에 따라 값을 다르게 사용한다.
// 예를 들어, 네이버 화면창에서 뉴스홈의 언론사 표 안의 요소들. 

export default HelloProps;