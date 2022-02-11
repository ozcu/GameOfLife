import './style.css'
import p5 from "p5"

const sketch = p5 => {

  // Variables scoped within p5
  const canvasWidth = p5.windowWidth
  const canvasHeight = p5.windowHeight

  console.log(canvasWidth,canvasHeight)

  // make library globally available
  window.p5 = p5

  //Grid
  let grid,cols,rows
  let resolution = 10

  cols = 1520/resolution
  rows = 720/resolution

  //Array
  function make2DArray(cols,rows){
    let arr = new Array(cols)
    for(let i=0;i<arr.length;i++){
      arr[i] = new Array(rows)
    }
    return arr
  }

  //Count Neighbors
  function countNeighbors(grid,x,y){
    let sum =0
    for(let i =-1 ; i<2 ;i++){
      for(let j =-1; j<2 ;j++){

        let col = (x+i+cols) % cols
        let row = (y+j+rows) % rows

        sum += grid[col][row]
      }
    }
    
    sum -= grid[x][y]     
    return sum
  }


  // Setup function

  p5.setup = () => {

    p5.createCanvas(canvasWidth,canvasHeight)

    //Initialization
    grid  = make2DArray(cols,rows)
    for(let i = 0 ; i<cols;i++){
      for(let j = 0; j <rows;j++){
        grid[i][j] = p5.floor(p5.random(2))
      }
    }
  }


  // Draw function
  p5.draw = () => {
    p5.background(0)
    
    //Draw first Gen
    for(let i = 0 ; i<cols; i++){
      for(let j = 0; j<rows; j++){
        let x = i * resolution
        let y = j * resolution

        if(grid[i][j] == 1){
          p5.fill(255)
          p5.stroke(0)
          p5.rect(x,y,resolution-1,resolution-1)
        }
      }
    }



    //Compute next based on grid
    
    let next = make2DArray(cols,rows)

    for(let i = 1 ; i<cols ;i++){
      for(let j = 1; j<rows ;j++){

        let state = grid[i][j]

        //Count neighbors
        let neighbors =  countNeighbors(grid,i,j)
        
        //Rules
        if( state == 0 && neighbors == 3 ){
          next[i][j] = 1
        }else if( state == 1 && (neighbors < 2 || neighbors > 3) ){
          next[i][j] = 0
        }else {
          next[i][j] = state
        }

        } 
     }
      // nexGen to become prevGen
      grid=next
   }
}


new p5(sketch)

export default sketch

p5.windowResized = () => {
    resizeCanvas(canvasWidth, canvasHeight)
    
}
