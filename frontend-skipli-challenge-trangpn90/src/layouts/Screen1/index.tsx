import React, { FormEvent, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGlobalContext } from "../../contexts/GlobalContext";
import axios from "axios";
import { IFormInput } from "../../utils/models";
import useLocalStorage from "../../hooks/useLocalStorage";

const Screen1 = (): React.ReactElement => {
  const { setState } = useGlobalContext();
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(true);
  const [invalidaccessCode, setInvalidaccessCode] = useState(true);
  const [disableAccessCode, setDisableAccessCode] = useState(true);
  const { setItem } = useLocalStorage();

  const {
    register,
    formState,
    formState: { errors, dirtyFields },
    handleSubmit,
    watch,
  } = useForm<IFormInput>({ mode: "onChange" });
  const rePhoneNumber = register("phoneNumber", {
    required: { value: true, message: "Phone number is required!" },
    maxLength: { value: 15, message: "Max length 15 character!" },
    pattern: {
      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
      message: "Ex: +84983264835",
    },
  });
  const reAccessCode = register("accessCode", {
    required: { value: true, message: "Access code is required!" },
    maxLength: { value: 6, message: "Max length 6 cheracter!" },
    pattern: {
      value: /^[0-9]{6}$/i,
      message: "Ex: 987263",
    },
  });
  const phoneNumber = watch("phoneNumber");

  // check validate form data
  useEffect(() => {
    if (!formState.errors.phoneNumber && dirtyFields.phoneNumber === true) {
      setInvalidPhoneNumber(false);
    } else {
      setInvalidPhoneNumber(true);
    }

    if (!formState.errors.accessCode && dirtyFields.accessCode === true) {
      setInvalidaccessCode(false);
    } else {
      setInvalidaccessCode(true);
    }
  }, [formState]);

  const handlePostPhoneNumber = (e: FormEvent) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3600/api/user",
      data: {
        phoneNumber
      },
    })
      .then(function () {
        setDisableAccessCode(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onLogin: SubmitHandler<IFormInput> = ({phoneNumber, accessCode}) => {
    axios({
      method: "post",
      url: "http://localhost:3600/api/user/validate",
      data: {
        phoneNumber, valAccessCode: accessCode
      },
    })
      .then(function (response) {
        const {code, message} = response.data;
        if (code === '2200') {
          setState(preState => ({...preState, user: phoneNumber, isAuth: true, isShowToast: true, contentToast: message, typeToast: "Success"}));
          setItem("user", phoneNumber);
        } else if (code === '2403') {
          setState(preState => ({...preState, user: null, isAuth: false, isShowToast: true, contentToast: message, typeToast: "Danger"}));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container py-3">
      <div className="p-3 pb-md-4 mx-auto text-center">
        <h2 className="display-4 fw-normal text-danger mb-4">SMS OTP</h2>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="form-floating mt-4 col-4 mx-auto">
            <input
              type="text"
              className="form-control"
              id="txtPhoneNumber"
              placeholder="Ex: +84983264835"
              {...rePhoneNumber}
            />
            <label htmlFor="txtPhoneNumber">Phone Number</label>
            {errors.phoneNumber && (
              <div className="text-danger">{errors.phoneNumber.message}</div>
            )}
          </div>

          <div className="d-grid gap-2 col-4 mx-auto">
            <button
              type="button"
              className="btn btn-primary btn-block mt-4 mb-4"
              onClick={(e) => handlePostPhoneNumber(e)}
              disabled={invalidPhoneNumber}
            >
              Submit
            </button>
          </div>
          <div className="form-floating col-4 mx-auto">
            <input
              type="text"
              className="form-control"
              id="txtAccessCode"
              placeholder="Ex: 689122"
              disabled={disableAccessCode}
              {...reAccessCode}
            />
            <label htmlFor="txtAccessCode">Access Code</label>
            {errors.accessCode && (
              <div className="text-danger">{errors.accessCode.message}</div>
            )}
          </div>
          <div className="d-grid gap-2 col-4 mx-auto">
            <button
              type="submit"
              className="btn btn-danger btn-block mt-4 mb-4"
              disabled={invalidaccessCode}
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Screen1;
