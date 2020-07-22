import React from "react";

const InputData = props => {
  const { type, id, placeholder, check, state, handleChange } = props;
  return (
    <div className="md-form">
      {id !== `message${check}` ? (
        <input
          type={type}
          id={id}
          className={`form-control ${state.errorType === placeholder &&
            "inp-error"}`}
          value={state[placeholder]}
          onChange={event => handleChange(event, placeholder)}
        />
      ) : (
        <textarea
          type={type}
          id={id}
          className="md-textarea form-control"
          value={state[placeholder]}
          onChange={event => handleChange(event, placeholder)}
        />
      )}
      <label htmlFor={id}>Your {`${placeholder}`}</label>
      {id !== `message${check}` &&
      state.errorType === placeholder && (
        <span className="inp-error-msg">{state.errorText}</span>
      )}
    </div>
  );
};

export default InputData;
