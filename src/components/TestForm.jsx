import { useRef } from "react";

const TestForm = () => {
    let inputRef = useRef({
        name: "",
        age: ""
    });

    const handleSubmit= (e)=>{
        e.preventDefault();
        console.log(inputRef.current.name.value);
    }

  return (
    <form onSubmit={handleSubmit}>
        <input name="name" ref={(el)=>{ inputRef.current.name = el}}></input>
        <input name="age" ref={(el)=>{ inputRef.current.age = el}}></input>
        <button>Submit</button>
    </form>
  )
}

export default TestForm