var input = [
`123 328  51 64 `+`
 45 64  387 23 `+`
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
    const rowStrings = input[i].split('\n')
    // find out max col lenght based on last line
    const homework = []
    let lenCounter = 1
    let calc = {op: rowStrings[rowStrings.length-1][0], vals: []}
    for (let c = 1; c < rowStrings[rowStrings.length-1].length; c++) {
      const char = rowStrings[rowStrings.length-1][c]
      if (char !== ' ') {
        calc.len = lenCounter-1 // -1 space separator
        homework.push(calc)
        // reset calc
        calc = {op: char, vals: []}
        lenCounter = 1
      } else {
        lenCounter++
      }
    }
    calc.len = lenCounter
    homework.push(calc)

    let hi = 0
    for (let r = 0; r < rowStrings.length-1; r++) {
      const line = rowStrings[r].split('');
      hi = 0
      for (let l = 0; l < line.length; l++) {
        homework[hi].vals.push(line.slice(l, l+homework[hi].len))
        l += homework[hi].len
        hi++
      }
    }
    // console.log(homework)
    homework.forEach((calc) => {
      calc.realVals = []
      for (let n = calc.len-1; n >=0; n--) { // parse numbers from right to left
        let numStr = ''
        for (let v = 0; v < calc.vals.length; v++) {
          numStr += calc.vals[v][n]
        }
        calc.realVals.push(Number(numStr))
      }
      calc.result = calc.realVals.reduce((a, b) => {
        if (calc.op === '+') {
          return a + b
        } else if (calc.op === '*') {
          return a * b
        }
      })
    })
    // console.log(homework)

    const result = homework.reduce((acc, calc) => acc + calc.result, 0)
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
