import styled from "styled-components";
import HeaderLogo from "../assets/HeaderLogo.svg";
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  userTokenState,
  tokenState,
  refreshTokenState,
} from "../store/atom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    if (userToken.isLoggedIn && accessToken) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.error("❌ 사용자 정보 불러오기 실패:", err);
        });
    }
  }, [userToken, accessToken]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeClick = () => {
    if (location.pathname === "/main") {
      window.location.reload();
    } else {
      navigate("/main");
    }
  };

  const handleLogout = () => {
    setUserToken({ isLoggedIn: false });
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserInfo(null);
    navigate("/");
  };

  return (
    <StyledHeader>
      <HeaderGap>
        <LogoPart>
          <Logo src={HeaderLogo} alt="HeaderLogo" onClick={handleThemeClick} />
          <Nav>
            <NavItem
              onClick={handleThemeClick}
              className={location.pathname === "/main" ? "active" : ""}
            >
              Theme
            </NavItem>
          </Nav>
        </LogoPart>

        <LoginPart>
          {userToken.isLoggedIn && userInfo ? (
            <ProfileWrapper ref={dropdownRef} onClick={() => setDropdownOpen((prev) => !prev)}>
              <UserName>{userInfo.nickName}</UserName>
              <ProfileImage
                src={userInfo.profileImageUrl}
                alt="profile"
              />
              {dropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => navigate("/mypage")}>마이페이지</DropdownItem>
                  <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                </DropdownMenu>
              )}
            </ProfileWrapper>
          ) : (
            <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
          )}
        </LoginPart>
      </HeaderGap>
    </StyledHeader>
  );
};

export default Header;

// styled-components 추가 스타일
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
  font-weight: 500;
  line-height: 50px;
  cursor: pointer;

  &.active {
    color: var(--foundation-red-normal-active, #D90206);
  }
`;

const LoginPart = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
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
  font-weight: 500;
  line-height: 30px;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const UserName = styled.div`
  color: white;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-weight: 500;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 52px;
  right: 0;
  background: #222;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;