var input = [
`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`
 ,puzzleInput
]

let grid

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const numberStrings = input[i].split(/\s+/)
    let minX = Infinity
    let minY = Infinity
    let maxX = 0
    let maxY = 0
    const redTiles = numberStrings.map((val => {
      const splitted = val.split(',')
      let x = Number(splitted[0])
      // if (i === 1) { x = Math.floor(x / 1000) }
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      let y = Number(splitted[1])
      // if (i === 1) { y = Math.floor(y / 1000) }
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
      return {x: x, y: y}
    }))
    minX--
    maxX+=2
    minY--
    maxY+=2

    // grid = []
    // for (let y = 0; y < maxY; y++) {
    //   if (!grid[y]) { grid[y] = [] }
    //   for (let x = 0; x < maxX; x++) {
    //     grid[y][x] = '.'
    //   }
    // }
    // redTiles.forEach(tile => {
    //   grid[tile.y][tile.x] = '#'
    // })
    // printGrid()
    let maxArea = 0
    redTiles.forEach(a => {
      redTiles.forEach(b => {
        let area = 0
        // +1 to include starting position
        if (a.x <= b.x) {
          if (a.y <= b.y) {
            area = ((b.x - a.x)+1) * ((b.y - a.y)+1)
          } else {
            area = ((b.x - a.x)+1) * ((a.y - b.y)+1)
          }
        } else {
          if (a.y <= b.y) {
            area = ((a.x - b.x)+1) * ((b.y - a.y)+1)
          } else {
            area = ((a.x - b.x)+1) * ((a.y - b.y)+1)
          }
        }
        // maxArea = Math.max(maxArea, area)
        if (area > maxArea) {
          // console.log(`new max area ${area} from (${a.x},${a.y}) to (${b.x},${b.y})`)
          maxArea = area
        }
      })
    })

    const result = maxArea
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

const printGrid = function() {
  let str = ''
  for (let y = 0; y < grid.length; y++) {
    if (grid[y]) {
      str += grid[y].join('') + '\n'
    }
  }
  console.log(str)
}

var part2 = function () {

  for (let i = 0; i < input.length; i++) {
    const numberStrings = input[i].split(/\s+/)
    const minMaxXperRowY = []
    const minMaxYperColX = []
    let redTiles = numberStrings.map((val => {
      const splitted = val.split(',')
      const x = Number(splitted[0])
      const y = Number(splitted[1])
      return {x: x, y: y}
    }))
    // there's always 2 per row an column
    // let xs = {}
    // let ys = {}
    // redTiles.forEach((val => {
      // xs[x] = xs[x] ? xs[x]+1 : 1
      // ys[y] = ys[y] ? ys[y]+1 : 1
    // }))
    // console.log(xs, ys)

    // map to small numbers
    let xi = 0
    const redTilesXs = redTiles.map(tile => tile.x).sort((a,b) => a - b)
    const xMap = {}
    const xReverseMap = {}
    redTilesXs.forEach(val => {
      if (xMap[val] === undefined) {
        xMap[val] = xi
        xReverseMap[xi] = val
        xi++
      }
    })
    const redTilesYs = redTiles.map(tile => tile.y).sort((a,b) => a - b)
    const yMap = {}
    const yReverseMap = {}
    let yi = 0
    redTilesYs.forEach(val => {
      if (yMap[val] === undefined) {
        yMap[val] = yi
        yReverseMap[yi] = val
        yi++
      }
    })
    const newRedTiles = redTiles.map(tile => ({x: xMap[tile.x], y: yMap[tile.y]}))
    // console.log(redTilesXs, redTilesYs, newRedTiles)
    redTiles = newRedTiles
    // const unmappedRedTiles = newRedTiles.map(tile => ({x: xReverseMap[tile.x], y: yReverseMap[tile.y]}))
    // console.log(redTiles, newRedTiles, unmappedRedTiles)

    // set min/max per row/column
    redTiles.forEach((val => {
      const x = val.x
      const y = val.y
      if (!minMaxXperRowY[y]) minMaxXperRowY[y] = {min: Infinity, max: 0}
      minMaxXperRowY[y].min = Math.min(minMaxXperRowY[y].min, x)
      minMaxXperRowY[y].max = Math.max(minMaxXperRowY[y].max, x)
      if (!minMaxYperColX[x]) minMaxYperColX[x] = {min: Infinity, max: 0}
      minMaxYperColX[x].min = Math.min(minMaxYperColX[x].min, y)
      minMaxYperColX[x].max = Math.max(minMaxYperColX[x].max, y)
    }))

    // create polygon grid

    // init grid
    grid = []
    let minY = minMaxYperColX.reduce((acc, val) => Math.min(acc, val.min), Infinity)
    let maxY = minMaxYperColX.reduce((acc, val) => Math.max(acc, val.max), 0)
    let minX = minMaxXperRowY.reduce((acc, val) => Math.min(acc, val.min), Infinity)
    let maxX = minMaxXperRowY.reduce((acc, val) => Math.max(acc, val.max), 0)
    for (let y = minY; y <= maxY; y++) {
      if (!grid[y]) { grid[y] = [] }
      for (let x = minX; x <= maxX; x++) {
        grid[y][x] = '.'
      }
    }
    // fill red tiles
    redTiles.forEach(tile => {
      let tileY = tile.y
      let tileX = tile.x
      if (!grid[tileY]) { grid[tileY] = [] }
      grid[tileY][tileX] = '#'
    })

    // fill the shape edge by edge
    for (let t = 0; t < redTiles.length; t++) {
      const tile = redTiles[t]
      const nextTile = redTiles[(t+1) % redTiles.length]
      if (tile.x === nextTile.x) {
        const minY = Math.min(tile.y, nextTile.y)
        const maxY = Math.max(tile.y, nextTile.y)
        for (let y = minY+1; y <= maxY-1; y++) {
          grid[y][tile.x] = 'X'
        }
      } else if (tile.y === nextTile.y) {
        const minX = Math.min(tile.x, nextTile.x)
        const maxX = Math.max(tile.x, nextTile.x)
        for (let x = minX+1; x <= maxX-1; x++) {
          grid[tile.y][x] = 'X'
        }
      } else {
        console.log ('should not happen')
      }
    }
    // printGrid()

    // fill grid
    // start from somewhere inside and spread
    // this works only for the current input
    const initialState = {x: Math.floor(grid[0].length/2), y: Math.floor(grid.length/2)}
    if (i === 0) initialState.y--
    // if a generic code is needed, here there would be a logic to look for a point inside the shape
    // while (grid[initialState.y][initialState.x] !== '.') {
    //   initialState.x++
    //   initialState.y++
    // }
    // console.log('starting fill at', initialState)

    const states = [initialState]
    while (states.length > 0) {
      const st = states.shift()
      if (grid[st.y][st.x] === '.' ) {
        grid[st.y][st.x] = 'X'
        // genNextStates
        const newStates = []
        if (grid[st.y][st.x-1] === '.') { // left
          newStates.push({x: st.x-1, y: st.y})
        }
        if (grid[st.y][st.x+1] === '.') { // right
          newStates.push({x: st.x+1, y: st.y})
        }
        if (grid[st.y-1][st.x] === '.') { // up
          newStates.push({x: st.x, y: st.y-1})
        }
        if (grid[st.y+1][st.x] === '.') { // down
          newStates.push({x: st.x, y: st.y+1})
        }
        states.push(...newStates)
      }
    }
    // printGrid()

    const validAreas = []
    let maxArea = 0
    redTiles.forEach(a => {
      redTiles.forEach(b => {
        if (a === b) { return } // skip same tile, though is valid
        // to be a valid area, the other 2 corners (c,d) must be inside the perimeter
        // a-c
        // d-b
        const c = {x: a.x, y: b.y}
        const d = {x: b.x, y: a.y}
        let cValid = false
        let dValid = false
        if (grid[c.y] && grid[c.y][c.x] === 'X'
          || grid[c.y] && grid[c.y][c.x] === '#' ) {
            cValid = true
        } else {
          return // skip invalid c
        }
        if (grid[d.y] && grid[d.y][d.x] === 'X'
          || grid[d.y] && grid[d.y][d.x] === '#' ) {
            dValid = true
        } else {
          return // skip invalid d
        }

        if (cValid && dValid) { // if corners are valid
          let validEdges = true
          // Check vertical edges
          for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) {
            if (grid[y][a.x] !== 'X' && grid[y][a.x] !== '#') {
              validEdges = false
              break
            }
            if (grid[y][b.x] !== 'X' && grid[y][b.x] !== '#') {
              validEdges = false
              break
            }
          }
          if (validEdges) {
            // Check horizontal edges
            for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) {
              if (grid[a.y][x] !== 'X' && grid[a.y][x] !== '#') {
                validEdges = false
                break
              }
              if (grid[b.y][x] !== 'X' && grid[b.y][x] !== '#') {
                validEdges = false
                break
              }
            }

            let area = calcArea(a, b)
            validAreas.push({from: a, to: b, area: area})
            if (area > maxArea) {
              // console.log(`new max area ${area} from (${a.x},${a.y}) to (${b.x},${b.y})`)
              maxArea = area
            }
          }
        }
      })
    })
    validAreas.sort((a,b) => b.area - a.area)
    // console.log(validAreas)
    // unmap to original coordinates
    const unmappedAreas = validAreas.map(area => {
      const newArea = {
        from: { x: xReverseMap[area.from.x], y: yReverseMap[area.from.y]},
        to: {x: xReverseMap[area.to.x], y: yReverseMap[area.to.y]},
      }
      newArea.area = calcArea(newArea.from, newArea.to)
      return newArea
    })
    unmappedAreas.sort((a,b) => b.area - a.area)
    let unmappedMaxArea = unmappedAreas[0]

    // 1429596008 target
    // 4667093750 too high
    const result = unmappedMaxArea.area
    // console.log(result)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

function calcArea(a, b) {
  let area = 1
  // +1 to include starting position
  if (a.x <= b.x) {
    if (a.y <= b.y) {
      area = ((b.x - a.x)+1) * ((b.y - a.y)+1)
    } else {
      area = ((b.x - a.x)+1) * ((a.y - b.y)+1)
    }
  } else {
    if (a.y <= b.y) {
      area = ((a.x - b.x)+1) * ((b.y - a.y)+1)
    } else {
      area = ((a.x - b.x)+1) * ((a.y - b.y)+1)
    }
  }
  return area
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
