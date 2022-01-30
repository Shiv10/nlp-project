import React, { useRef, useState } from "react";

function Form() {
	const textRef = useRef();
	const [resp, setResp] = useState("");
	const [disabled, setDisabled] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisabled(true);
		setResp("");
		const d = {
			text: textRef.current.value,
		};
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(d),
		};
		let res = await fetch("https://api.myserenity.live/predict", requestOptions);
		res = await res.text();
		setResp(res);
		setDisabled(false);
	};
	return (
		<div>
			<form onSubmit={handleSubmit} className="form">
				<textarea className="inp" ref={textRef} placeholder="Enter text" />
				{/* <input className="inp" type="" ref={textRef} />
				<br /> */}
				<button className="btn" type="submit" disabled={disabled}>
					Submit
				</button>
			</form>
			<div className="res">{resp}</div>
		</div>
	);
}

export default Form;
