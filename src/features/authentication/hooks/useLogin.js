import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginAPI } from "../../../services/apiAuthentication";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: loginAPI,

    onSuccess: (user) => {
      navigate("/", { replace: "true" });
      queryClient.setQueryData(["user"], user.user);
    },
  });

  return { login, isPending, isSuccess, isError };
}
