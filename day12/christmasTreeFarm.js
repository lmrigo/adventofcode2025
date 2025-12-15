var input = [
`0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const inputParts = input[i].split(/\n\n/)
    console.log(inputParts)
    const presents = []
    for (let p = 0; p < inputParts.length - 1; p++) {
      const lines = inputParts[p].split(/\n/)
      const idx = Number(lines[0].split(':')[0])
      const shape = lines.slice(1).map((val) => {return val.split('')})
      presents[idx] = shape
    }
    const treeStrings = inputParts[inputParts.length - 1].split(/\n/)
    const trees = treeStrings.map((val) => {
      const parts = val.split(/\s+/)
      const sizeParts = parts[0].split(/x|:/)
      return {
        width: Number(sizeParts[0]),
        height: Number(sizeParts[1]),
        presents: parts.slice(1).map((v) => {return Number(v)})
      }
    })
    // console.log(presents, trees)
    const presentsR90 = presents.map(rotateRight)
    const presentsR180 = presentsR90.map(rotateRight)
    const presentsR270 = presentsR180.map(rotateRight)

    // wip. Works but is incredibly inneficient.
    let possibleCount = 0
    trees.forEach((tree) => {
      const ps = [] // presents indexes to fit
      tree.presents.forEach((val, idx) => {
        for (let p=0; p < val; p++) {
          ps.push(idx)
        }
      })
      //   for each available present
      //     try to place it in the tree grid from y=0 to height-present.height, x=0 to width-present.width
      //     rotate 90º and try to place it again
      //   if all presents placed, break

      let initPidx = 0
      const initialPresent = ps[initPidx]
      const rotations = [presents[initialPresent], presentsR90[initialPresent], presentsR180[initialPresent], presentsR270[initialPresent]]
      let initialStates = [
        {p: rotations[0], treefill: [], nextP: initPidx+1},
        {p: rotations[1], treefill: [], nextP: initPidx+1},
        {p: rotations[2], treefill: [], nextP: initPidx+1},
        {p: rotations[3], treefill: [], nextP: initPidx+1}
      ]
      let states = [...initialStates]
      let isPossible = false
      while (!isPossible && states.length > 0) {
        const st = states.pop()
        const shape = st.p

        // try to fit
        const treeGrid = []
        for (let y = 0; y <= tree.height - shape.length; y++) {
          for (let x = 0; x <= tree.width - shape[0].length; x++) {

            // try to fit at x,y
            let canFit = false
            for (let sy = 0; sy < shape.length; sy++) {
              const row = y+sy
              treeGrid[row] = []
              for (let sx = 0; sx < shape[0].length; sx++) {
                const col = x+sx
                if (shape[sy][sx] === '#') {
                  if (st.treefill[row] && st.treefill[row][col]) {
                    treeGrid[row][col] = st.treefill[row][col] // already filled by previous shape
                  }

                  if (treeGrid[row] && treeGrid[row][col]) {
                    canFit = false
                    break  // if can't fit, skip
                  } else {
                    canFit = true
                  }
                } else {
                  canFit = true
                }
              }
              if (!canFit) { break } // if can't fit, skip
            }
            if (canFit) { // if fitted, gen next states with the current shape at current position
              const newTreefill = st.treefill.slice().map(a => a.slice()) // deep copy
              for (let sy = 0; sy < shape.length; sy++) {
                for (let sx = 0; sx < shape[0].length; sx++) {
                  if (shape[sy][sx] === '#') {
                    if (!newTreefill[y+sy]) {
                      newTreefill[y+sy] = []
                    }
                    newTreefill[y+sy][x+sx] = (st.nextP-1) +'' //cast to string
                  }
                }
              }
              if (ps[st.nextP] === undefined) {
                console.log('all placed!', st)
                printTreeGrid(newTreefill, tree.width, tree.height)
                isPossible = true
                break
              }
              const nextPidx = ps[st.nextP]
              const rotations = [presents[nextPidx], presentsR90[nextPidx], presentsR180[nextPidx], presentsR270[nextPidx]]
              const newStates = [
                {p: rotations[0], treefill: newTreefill.slice().map(a => a.slice()), nextP: st.nextP+1},
                {p: rotations[1], treefill: newTreefill.slice().map(a => a.slice()), nextP: st.nextP+1},
                {p: rotations[2], treefill: newTreefill.slice().map(a => a.slice()), nextP: st.nextP+1},
                {p: rotations[3], treefill: newTreefill.slice().map(a => a.slice()), nextP: st.nextP+1}
              ]
              states.push(...newStates)
            }
            if (isPossible) { break }
            // proceed to the next starting possition
          } // for x
          if (isPossible) { break }
        } //for y
        if (isPossible) { break }
      }
      possibleCount = isPossible ? possibleCount + 1 : possibleCount
    })

    const result = possibleCount
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

const rotateRight = function(shape){
  const matrix = shape.map(row => row.slice())
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
}

const printTreeGrid = function(treefill, width, height) {
  let str = ''
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (treefill[y] && treefill[y][x] !== undefined) {
        str += treefill[y][x]
      } else {
        str += '.'
      }
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
