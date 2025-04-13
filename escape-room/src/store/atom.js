import { atom } from "recoil";

export const userTokenState = atom({
  key: "userTokenState",
  default: {
    isLoggedIn: !!localStorage.getItem("accessToken"), // ✅ 저장된 토큰이 있으면 로그인 상태
  },
});

export const tokenState = atom({
  key: "token",
  default: null,
});

export const refreshTokenState = atom({
  key: "refreshToken",
  default: null,
});

export const codeState = atom({
  key: "code",
  default: null,
});
