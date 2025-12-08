var input = [
`.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const rows = input[i].split(/\n/)
    let grid = rows.map((val => val.split('')))
    const start = {y: 0, x: grid[0].indexOf('S')}
    grid[start.y][start.x] = '.'
    // console.log(start,grid)

    const fall = function(y, x) {
      let splitCount = 0
      if (y >= grid.length) {
        return splitCount
      } else {
        if (grid[y][x] === '^') {
          const leftSplits = fall(y, x-1)
          grid[y][x-1] = '|'
          const rightSplits = fall(y, x+1)
          grid[y][x+1] = '|'
          splitCount += 1 + leftSplits + rightSplits
        } else if (grid[y][x] === '.') {
          grid[y][x] = '|'
          splitCount += fall(y+1, x)
        } // else if (grid[y][x] === '^') { it's already traversed
        return splitCount
      }
    }

    const totalSplits = fall(start.y, start.x)
    // printGrid(grid)

    const result = totalSplits
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

function printGrid(grid) {
  let str = ''
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      str += grid[y][x]
    }
    str += '\n'
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
