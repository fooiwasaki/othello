import type { NextPage } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: green;
  background-size: cover;
`

const Squarebox = styled.div`
  width: 480px;
  height: 480px;
  background: white;
`
const Cell = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  vertical-align: bottom;
  border: 1px solid black;
`

const Home: NextPage = () => {
  return (
    <Container>
      <Squarebox>
        {[...Array(64)].map((_, i) => (
          <Cell key={i}></Cell>
        ))}
      </Squarebox>
    </Container>
  )
}

export default Home
