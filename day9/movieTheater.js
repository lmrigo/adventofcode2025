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
      const x = Number(splitted[0])
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      const y = Number(splitted[1])
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
          console.log(`new max area ${area} from (${a.x},${a.y}) to (${b.x},${b.y})`)
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
    str += grid[y].join('') + '\n'
  }
  console.log(str)
}

var part2 = function () {

  for (let i = 0; i < input.length; i++) {
    const numberStrings = input[i].split(/\s+/)
    const numbers = numberStrings.map((val => {return Number(val)}))

    const result = 0
    // console.log(result)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
