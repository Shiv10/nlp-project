import React, { useRef } from 'react'

function Form() {
    const textRef =  useRef()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(textRef.current.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={textRef}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form
