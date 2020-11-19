import styled from  '@emotion/styled'

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderLogo>TRON Wallets</HeaderLogo>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  width: 100%;
`

const HeaderLogo = styled.h1`
  font-size: 2rem;
  color: var(--gold);
  text-align: center;
`

