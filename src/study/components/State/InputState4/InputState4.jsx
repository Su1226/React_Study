import { useState } from "react";

function InputState4() {
    
    // 앞으로 함수 앞에 'use'라는 키워드가 붙으면 '훅' 함수라고 부른다.
    // 'use'가 붙지 않으면 일반 함수이다.
    // useState()가 있어야 함수가 재호출이 되면서 상태가 바뀐다. -> 화면이 바뀐다. 
    // 값이 바뀌었을 때, 화면에 반영이 되길 바랄 때 사용한다.
    const [ products, setProducts] = useState([]);      // 자료형 : 배열
    
    const productInputValueEmpty = {
        productName: "",
        price: "",
        stock: "",
    }
    
    const [ productValue, setProductValue ] = useState(productInputValueEmpty)      // 자료형 : 객체

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setProductValue((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
        
        // console.log(productValue);
        // console.log(`name : ${name} value : ${value}`);
    }
    
    const handleOnClick = () => {
       setProducts((prev) => [...prev, productValue]);

        // setProducts((prev) => {
        //     const newArray = prev;
        //     newArray.push(productValue);
        //     return newArray;
        // })
        
        // 확인 누른 다음, 초기화
        setProductValue(productInputValueEmpty);
        console.log(products)
    }

    return <div>
        <div>
            <label htmlFor="">상품명</label>
            <input type="text" name="productName" value={productValue.productName} onChange={handleOnChange}/>
        </div>
        <div>
            <label htmlFor="">가격</label>
            <input type="text" name="price" value={productValue.price} onChange={handleOnChange}/>
        </div>
        <div>
            <label htmlFor="">수량</label>
            <input type="text" name="stock" value={productValue.stock} onChange={handleOnChange}/>
        </div>
        <div>
            <button onClick={handleOnClick}>확인</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => <tr key={index}>
                            <td>{product.productName}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    
    // 배열의 key의 존재 유무에 따라 업데이트 방법이 달라진다.
    // map을 돌릴 때는 반드시 key값이 들어가도록 한다. (묶어주는 상위에만 붙여준다.)
    // 리액트는 새로운 배열을 다시 만들어 내버린다. (리액트의 특징.)
    // 그렇다면 자바스크립트도 그런가? 자바스크립트는 그렇지 않다.
    // https://react.vlpt.us/basic/11-render-array.html
}

export default InputState4;