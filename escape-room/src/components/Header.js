import styled from "styled-components";
import HeaderLogo from "../assets/HeaderLogo.svg";

const Header = () => {
  return (
    <StyledHeader>
      <HeaderGap>
        <LogoPart>
          <Logo src={HeaderLogo} alt="HeaderLogo" />
          <Nav>
            <NavItem>Theme</NavItem>
            <NavItem>Social Matching</NavItem>
            <NavItem>Crew</NavItem>
            <NavItem>Tier</NavItem>
          </Nav>
        </LogoPart>
        <LoginPart>
          <NavItem>My Page</NavItem>
          <LoginButton>Login</LoginButton>
        </LoginPart>
      </HeaderGap>
    </StyledHeader>
  )
};

const StyledHeader = styled.div`
  width: 1440px;
  height: 56px;
  flex-shrink: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Logo = styled.div`
  width: 29px;
  height: 29px;
  flex-shrink: 0;
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
  line-height: 50px;
`;

export default Header;