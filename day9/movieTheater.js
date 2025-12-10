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

    // this only works with convex shapes
    minMaxYperColX.forEach((val1, x) => {
      minMaxXperRowY.forEach((val2, y) => {
        if (y < val1.min || y > val1.max) { return } // only within the vertical range
        if (x < val2.min ) { val2.min = x }
        if (x > val2.max ) { val2.max = x }
      })
    })
    minMaxXperRowY.forEach((val1, y) => {
      minMaxYperColX.forEach((val2, x) => {
        if (x < val1.min || x > val1.max) { return } // only within the horizontal range
        if (y < val2.min ) { val2.min = y }
        if (y > val2.max ) { val2.max = y }
      })
    })

    // console.log(minMaxXperRowY, minMaxYperColX, redTiles)

    // uncomment to print filled grid
    // grid = []
    // const isPuzzle = (i === 1)
    // const scale = 1
    // let minY = 0, maxY = 8, minX = 0, maxX = 16
    // if (isPuzzle) {
    //   minY = minMaxYperColX.reduce((acc, val) => Math.min(acc, val.min), Infinity)
    //   minY = Math.floor(minY / scale)
    //   maxY = minMaxYperColX.reduce((acc, val) => Math.max(acc, val.max), 0)
    //   maxY = Math.floor(maxY / scale)
    //   minX = minMaxXperRowY.reduce((acc, val) => Math.min(acc, val.min), Infinity)
    //   minX = Math.floor(minX / scale)
    //   maxX = minMaxXperRowY.reduce((acc, val) => Math.max(acc, val.max), 0)
    //   maxX = Math.floor(maxX / scale)
    // }
    // for (let y = minY; y <= maxY; y++) {
    //   if (!grid[y]) { grid[y] = [] }
    //   for (let x = 0; x <= maxX; x++) {
    //     grid[y][x] = '.'
    //   }
    // }
    // minMaxYperColX.forEach((val, x) => {
    //   let minY = isPuzzle ? Math.floor(val.min / scale) : val.min
    //   let maxY = isPuzzle ? Math.floor(val.max / scale) : val.max
    //   let colX = isPuzzle ? Math.floor(x / scale) : x
    //   for (let y = minY; y <= maxY; y++) {
    //     grid[y][colX] = 'X'
    //   }
    // })
    // minMaxXperRowY.forEach((val, y) => {
    //   let minX = isPuzzle ? Math.floor(val.min / scale) : val.min
    //   let maxX = isPuzzle ? Math.floor(val.max / scale) : val.max
    //   let rowY = isPuzzle ? Math.floor(y / scale) : y
    //   for (let x = minX; x <= maxX; x++) {
    //     grid[rowY][x] = 'X'
    //   }
    // })
    // redTiles.forEach(tile => {
    //   let tileY = isPuzzle ? Math.floor(tile.y / scale) : tile.y
    //   let tileX = isPuzzle ? Math.floor(tile.x / scale) : tile.x
    //   if (!grid[tileY]) { grid[tileY] = [] }
    //   grid[tileY][tileX] = '#'
    // })
    // printGrid()
    // continue


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
        if (minMaxYperColX[c.x] && minMaxXperRowY[c.y]) {
          if (c.x >= minMaxXperRowY[c.y].min && c.x <= minMaxXperRowY[c.y].max
            && c.y >= minMaxYperColX[c.x].min && c.y <= minMaxYperColX[c.x].max) {
            cValid = true
          } else {
            cValid = false
          }
        } else { // should not happen
          console.log('no row/column for c', c)
        }
        if (minMaxYperColX[d.x] && minMaxXperRowY[d.y]) {
          if (d.x >= minMaxXperRowY[d.y].min && d.x <= minMaxXperRowY[d.y].max
            && d.y >= minMaxYperColX[d.x].min && d.y <= minMaxYperColX[d.x].max) {
            dValid = true
          } else {
            dValid = false
          }
        } else { // should not happen
          console.log('no row/column for d', d)
        }
        // console.log(cValid, dValid, a, b, c, d)

        if (cValid && dValid) {
          let area = calcArea(a, b)
          validAreas.push({from: a, to: b, area: area})
          if (area > maxArea) {
            // console.log(`new max area ${area} from (${a.x},${a.y}) to (${b.x},${b.y})`)
            maxArea = area
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
  // part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
