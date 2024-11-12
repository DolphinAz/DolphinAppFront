import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import toast from "react-hot-toast";
import ResetLinkRequestForm from "../ResetLinkRequestForm/ResetLinkRequestForm";
import PasswordUpdateForm from "../PasswordUpdateForm/PasswordUpdateForm";

function ResetPasswordForm() {
  const verifyResetPassUrl = "/api/auth/verify-password-resettoken";
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const resetToken = urlParams.get("token");
  const userId = urlParams.get("userId");
  const [isResetActive, setIsResetActive] = useState(false);

  useEffect(() => {
    if (resetToken && userId) {
      try {
        axios
          .post(baseUrl + verifyResetPassUrl, {
            userId: userId,
            resetToken: resetToken,
          })
          .then((res) => {
            setIsResetActive(res.data.data);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="desktop:max-w-[404px] w-full flex flex-col">
      {isResetActive ? <PasswordUpdateForm /> : <ResetLinkRequestForm />}
    </div>
  );
}

export default ResetPasswordForm;
