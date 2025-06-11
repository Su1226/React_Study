function Props1(props) {
    // 비구조할당(구조 분해)
    const { a, b } = props;

    console.log(props);

    return <div>
        <p>a - {a}</p>
        <p>b - {b}</p>
    </div>
}

// 비구조 할당이 아니었다면,
// props.a와 propos.b로 써야한다. 

export default Props1;