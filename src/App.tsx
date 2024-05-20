import {  useState } from 'react'
import './App.css'
import { Modal, Button } from 'react-bootstrap';

function mixNumbers(array:any){ 
  let mixedNumbers=array
  for (let i = mixedNumbers.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedNumbers[i], mixedNumbers[j]] = [mixedNumbers[j], mixedNumbers[i]];
  }
  return mixedNumbers
}

const gameNumbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null]


function App() {
  const[isWin, setIsWin]=useState(false)
  const [tiles, setTiles]=useState(()=>{
    return mixNumbers(gameNumbers)
  })

  function moveTile(index:number){
    const emptyIndex=tiles.indexOf(null)
    const validMove=[emptyIndex-1,emptyIndex+1,emptyIndex-4,emptyIndex+4]
    if(validMove.includes(index)){
      const newTitles:number[]|null[]=tiles.slice()
      newTitles[emptyIndex]=tiles[index]
      newTitles[index]=null
      setTiles(newTitles)
      winChek(newTitles) 
    }
  }
  function winChek(newTiles:number[]|null[]){
    for (let i = 0; i < newTiles.length; i++) {
      if (newTiles[i] !== gameNumbers[i]) {
        return false;
      }
    }
    setIsWin(true)
    console.log(isWin);
  }
  function handleClick(){
    window.location.reload();
  }
  return (
    <>

    <div className='puzzle'>

    {
      tiles.map((tile:any, index:number) => (
        <div 
        className={`tile  ${tile===null?'empty':''}`}
        key={index}
        onClick={() => moveTile(index)}
        style={{
          top: Math.floor(index/4)*100+'px',
          left: (index%4)*100+'px',
        }}
        >
          {tile}
        </div>
      ))
    }
        {
      isWin && 
      <div
      className="modal show" style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header className='d-flex justify-content-center'>
          <Modal.Title>Congratulations! Winn</Modal.Title>
        </Modal.Header>

        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="secondary" onClick={handleClick}>Close & Restart</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    }
    </div>


    </>
  )
}

export default App
