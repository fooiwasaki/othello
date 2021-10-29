import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
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
    [1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,2,2],
    [1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,2,2],
    [1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,2,2],
    [1,1,1,1,1,1,1,2],
    [2,2,2,2,2,0,0,0],
  ])

  const directions = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ]

  const searchCells = (x: number, y: number) => {
    const turnableCells: { x: number; y: number }[] = []
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i]
      const candidateCells: { x: number; y: number }[] = []
      let length = 1
      let targetColor = board[y + direction[1]]?.[x + direction[0]]
      while (targetColor !== undefined) {
        if (targetColor === 0) {
          break
        } else if (targetColor === currentColor) {
          turnableCells.push(...candidateCells)
          break
        } else {
          candidateCells.push({ x: x + length * direction[0], y: y + length * direction[1] })
        }
        length += 1
        targetColor = board[y + direction[1] * length]?.[x + direction[0] * length]
      }
    }
    return turnableCells
  }

  const [blackCounter, setblackCounter] = useState(1)
  const [whiteCounter, setwhiteCounter] = useState(1)
  const [zeroCounter, setzeroCounter] = useState(1)
  const [currentColor, setCurrentcolor] = useState(1)
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    const turnableCells = searchCells(x, y)
    for (let i = 0; i < turnableCells.length; i++) {
      const turnableCell = turnableCells[i]
      newBoard[turnableCell.y][turnableCell.x] = currentColor
    }

    if (turnableCells.length > 0) newBoard[y][x] = currentColor
    setBoard(newBoard)
    if (turnableCells.length > 0) setCurrentcolor(3 - currentColor)

    let black = 0
    let white = 0
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const selectedColor = newBoard[y][x]
        if (selectedColor === 1) {
          black += 1
        } else if (selectedColor === 2) {
          white += 1
        }
      }
    }
    console.log(black, white)
    setzeroCounter(64 - black - white)
    setblackCounter(black)
    setwhiteCounter(white)
  }

  useEffect(() => {
    if (zeroCounter === 0) {
      if (blackCounter < whiteCounter) {
        alert(`黒が${blackCounter}個、白が${whiteCounter}個で白の勝ち！`)
      } else if (blackCounter > whiteCounter) {
        alert(`黒が${blackCounter}個、白が${whiteCounter}個で黒の勝ち！`)
      } else {
        alert(`黒が${blackCounter}個、白が${whiteCounter}個で引き分け！`)
      }
    }
  }, [zeroCounter])
  console.log(zeroCounter)
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
