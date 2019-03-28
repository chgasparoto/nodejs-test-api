import React from 'react'
import styled from 'styled-components'

import Logo from '../viaplay-logo-vertical.png'

const FooterWrapper = styled.footer`
  min-height: 130px;
  background: #403e3e;
  color: #fff;
  padding: 10px 0 20px;
`

const StyledFooter = styled.div`
  width: 992px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 2rem;
  align-items: center;
`

const Menu = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-size: 12px;
  gap: 10px;
`

const MenuItem = styled.div`
  p {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0;
      opacity: .5;
      margin: 5px 0;
      font-size: 14px;
      cursor: pointer;
      transition: opacity 200ms ease;

      &:hover {
        opacity: .8;
      }
    }
  }
`

const LogoImage = styled.div`
  img {
    height: 80px;
  }
`

const Footer = props => (
  <FooterWrapper>
    <StyledFooter>
      <LogoImage><img src={Logo} alt="Logo" /></LogoImage>
      <Menu>
        <MenuItem>
          <p>Viaplay</p>
          <ul>
            <li>Serier</li>
            <li>Film</li>
            <li>Sport</li>
            <li>Barn</li>
            <li>Hyrbutik</li>
          </ul>
        </MenuItem>
        <MenuItem>
          <p>OM OSS</p>
          <ul>
            <li>Press</li>
            <li>Jobb</li>
          </ul>

          <p>Viasat-kunder</p>
          <ul>
            <li>Viaplay ingar</li>
          </ul>
        </MenuItem>
        <MenuItem>
          <p>Information</p>
          <ul>
            <li>Serier</li>
            <li>Film</li>
            <li>Sport</li>
            <li>Barn</li>
            <li>Hyrbutik</li>
          </ul>
        </MenuItem>
        <MenuItem>
          <p>folj oss</p>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Linkedin</li>
            <li>Blogg</li>
          </ul>
        </MenuItem>
        <MenuItem>
          <p>tv</p>
          <ul>
            <li>TV3</li>
            <li>TV10</li>
            <li>TV6</li>
            <li>Visat Film</li>
          </ul>
        </MenuItem>
      </Menu>
    </StyledFooter>
  </FooterWrapper>
)

export default Footer
