function CountButton( { text, value, onClick }) {
    console.log("CountButton Lendering");
    return <button value={value} onClick={onClick}>{text}</button>
}

export default CountButton;