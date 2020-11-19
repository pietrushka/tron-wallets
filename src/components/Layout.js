import styled from  '@emotion/styled'

export default function Layout ({children}) {
  return (
    <PageContainer>
      {children}
    </PageContainer>
  )
}

const PageContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`