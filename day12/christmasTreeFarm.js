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
    console.log(presents, trees)

    // for each tree
    //   for each available present
    //     try to place it in the tree grid from y=0 to height-present.height, x=0 to width-present.width
    //     rotate 90º and try to place it again
    //   if all presents placed, break

    const result = 0
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
