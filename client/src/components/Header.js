import React from 'react'
import styled, { css } from 'styled-components'
import Logo from '../viaplay-logo-new.png'

const HeaderWrapper = styled.header`
  color: #fff;
  height: 50px;
  background: #403e3e;
`

const StyledHeader = styled.div`
  width: 992px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr 1fr;
  align-items: center;
`

const Menu = styled.nav`
  display: grid;
  text-transform: uppercase;
  grid-template-columns: repeat(5, auto);
  font-size: 12px;
  gap: 10px;
  justify-content: start;
`

const MenuItem = styled.div`
  cursor: pointer;

  ${props => props.selected && css`
    font-weight: bold;
  `};
`

const Image = styled.div`
  img {
    height: 50px;
  }
`

const Header = props => (
  <HeaderWrapper>
    <StyledHeader>
      <Image>
        <img src={Logo} alt="Logo" />
      </Image>
      <Menu>
        <MenuItem>Serier</MenuItem>
        <MenuItem selected>Film</MenuItem>
        <MenuItem>Sport</MenuItem>
        <MenuItem>Barn</MenuItem>
        <MenuItem>Hyrbutik</MenuItem>
      </Menu>
      <div>John Doe</div>
      <div>Search</div>
    </StyledHeader>
  </HeaderWrapper>
)

export default Header
