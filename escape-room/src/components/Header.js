import styled from "styled-components";
import HeaderLogo from "../assets/HeaderLogo.svg";
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from "recoil";
import {
  userTokenState,
  tokenState,
  refreshTokenState,
} from "../store/atom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);

  const handleThemeClick = () => {
    if (location.pathname === "/main") {
      window.location.reload();
    } else {
      navigate("/main");
    }
  };

  const handleLoginLogout = () => {
    if (userToken.isLoggedIn) {
      // ✅ 로그아웃 처리
      setUserToken({ isLoggedIn: false });
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } else {
      // ✅ 로그인 페이지로 이동
      navigate("/login");
    }
  };

  return (
    <StyledHeader>
      <HeaderGap>
        <LogoPart>
          <Logo src={HeaderLogo} alt="HeaderLogo" onClick={handleThemeClick} />
          <Nav>
            <NavItem onClick={handleThemeClick} className={location.pathname === "/main" ? "active" : ""}>Theme</NavItem>
          </Nav>
        </LogoPart>
        <LoginPart>
          <LoginButton onClick={handleLoginLogout}>
            {userToken.isLoggedIn ? "Logout" : "Login"}
          </LoginButton>
        </LoginPart>
      </HeaderGap>
    </StyledHeader>
  );
};

export default Header;

// 💅 styled-components
const StyledHeader = styled.div`
  position: fixed;
  width: 1440px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  z-index: 1000;
`;

const HeaderGap = styled.div`
  width: 1034px;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 81px;
`;

const Logo = styled.img`
  width: 29px;
  height: 29px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Nav = styled.div`
  display: flex;
  gap: 64px;
`;

const NavItem = styled.div`
  color: #FFF;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px;
  cursor: pointer;
  
  &.active {
    color: var(--foundation-red-normal-active, #D90206);
  }
`;

const LoginPart = styled.div`
  gap: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoginButton = styled.div`
  display: inline-flex;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #FFF;
  color: #FFF;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  cursor: pointer;
`;