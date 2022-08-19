import { useState } from "react";

// import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  //   const {
  //     value: enteredName,
  //     isValid: enteredNameIsValid,
  //     hasError: nameInputHasError,
  //     valueChangeHandler: nameInputChangeHandler,
  //     inputBlurHandler: nameInputBlurHandler,
  //   } = useInput((value) => value.trim() !== "");

  //-----커스텀 훅(use-input.js)로 지우는 것 가능해짐 ------
  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false); //useState(true)라고 놓으면 첫 화면부터 error문이 뜨지 않아서 맞는 것처럼 보이지만, 사실 논리적으로 보면 첫 시작 시에는 input칸이 비어있는 상태이므로 useState(false)가 맞다
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); // input칸을 건드린 상태에서 유효한지 아닌지를 판별할 수 있는 useState

  //-----커스텀 훅(use-input.js)로 지우는 것 가능해짐 ------
  //enteredNameIsValid를 useState로 관리했을 때 코딩이 장황해지는 문제를 해결하기 위해 useState대신 const로 관리함!!
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // input이 여러개인 form 전체의 유효성 관리하기
  let formIsValid = false;
  if (enteredNameIsValid) {
    // ex) if(enteredNameIsValid && enteredAgeIsValid && ...)
    formIsValid = true;
  }

  //-----커스텀 훅(use-input.js)로 지우는 것 가능해짐 ------
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  //-----커스텀 훅(use-input.js)로 지우는 것 가능해짐 ------
  // 사용자가 입력칸을 클릭하고 아무것도 입력하지 않은 채 포커스를 잃었을때,
  // 입력칸에 반드시 입력해야한다고 에러매세지를 주는 처리
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    //-----커스텀 훅(use-input.js)로 지우는 것 가능해짐 ------
    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    // setEnteredNameIsValid(true);

    console.log(enteredName);

    setEnteredName(""); // **useState로 input 초기화 (리턴 문 안 input에 value={enteredName}도 함께 써줘야함)
    setEnteredNameTouched(false); // 제출 후 에러메세지 뜨는 문제 해결

    // nameInputRef.current.value=''; 은 작동은 하지만 DOM을 직접 조작하는 방법이므로 바람직하지 않음
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
