import styled from  '@emotion/styled'

export default function Layout ({children}) {
  return (
    <PageContainer>
      {children}
    </PageContainer>
  )
}

const PageContainer = styled.div`
  margin: 0 auto;
  
  max-width: 1000px;
`