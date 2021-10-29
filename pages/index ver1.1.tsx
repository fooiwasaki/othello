import type { NextPage } from 'next'
import { useState } from 'react'
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

const Blackstone = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 4px 4px;
  background-color: black;
  border-radius: 50%;
`
const Whitestone = styled.div`
  flex-direction: column;
  width: 50px;
  height: 50px;
  margin: 4px 4px;
  background-color: white;
  border: 2px solid black;
  border-radius: 50%;
`

const Home: NextPage = () => {
  // prettier-ignore
  const [board, setBoard] = useState([
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ])

  const directions = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1.0], [1, 1], [0, 1], [-1, 1]]

  const searchCells = (x: number, y: number) => {
    const turnableCells: { x: number; y: number }[] = []
    for (let i = 0; i < directions.length; i++) {
  // cellsの設定
  // boardの確認 色が1.2なら駄目
  // 

  const [currentColor, setCurrentcolor] = useState(1)
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    const turnableCells = currentColor
    for (let i = 0; i < turnableCells.rength; i++) {
      const turnableCell = turnableCells[i]
      newBoard[turnableCell.y][turnableCell.x] = currentColor
    }
    newBoard[y][x] = currentColor

    setBoard(newBoard)
    setCurrentcolor(3 - currentColor)
  }

  
 
  return (
    <Container>
      <Squarebox>
        {[...board].map((row, y) =>
          row.map((color, x) => (
            <Cell key={x + y * 8} onClick={() => onClick(x, y)}>
              {color !== 0 && (color === 1 ? <Blackstone /> : <Whitestone />)}
            </Cell>
          ))
        )}
      </Squarebox>
    </Container>
  )
}
export default Home
