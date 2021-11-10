import React, { useRef, useState } from 'react'

function Form() {
    const textRef =  useRef();
    const [resp, setResp] = useState("");
    const [disabled, setDisabled] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setResp("");
        const d = {
            text: textRef.current.value
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(d)
        }; 
        let res = await fetch('http://localhost:3001/predict', requestOptions);
        res = await res.text();
        setResp(res);
        setDisabled(false);        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={textRef}/>
                <button type="submit" disabled={disabled}>Submit</button>
            </form>
            <br/>
            <h3>{resp}</h3>
        </div>
    )
}

export default Form
