var input = [
`123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +  `
 ,puzzleInput
]

let grid
var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const rowStrings = input[i].split('\n')
    grid = rowStrings.map((row => {
      const numbers = row.trim().split(/\s+/).map((val) => {
        const n = Number(val)
        return Number.isNaN(n) ? val : n
      })
      return numbers
    }))
    // console.log(grid)

    let colTotals = []
    for (let col = 0; col < grid[0].length; col++) {
      const op = grid[grid.length-1][col]
      let acc = grid[0][col]
      for (let row = 1; row < grid.length-1; row++) {
        if (op === '+') {
          acc += grid[row][col]
        } else if (op === '*') {
          acc *= grid[row][col]
        }
      }
      // console.log(acc)
      colTotals.push(acc)
    }
    // console.log(colTotals)

    // 3035790425 too low
    const result = colTotals.reduce((a, b) => a + b, 0)
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
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
