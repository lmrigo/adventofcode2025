var input = [
`3-5
10-14
16-20
12-18

1
5
8
11
17
32`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const inputParts = input[i].split('\n\n') // separate
    const ingredientIdRanges = inputParts[0].split('\n').map(line => {
      const parts = line.split('-')
      return {
        from: Number(parts[0]),
        to: Number(parts[1])
      }
    })
    const availableIngredients = inputParts[1].split('\n').map(line => Number(line))

    ingredientIdRanges.sort((a, b) => {
      if (a.from === b.from) {
        return a.to - b.to
      }
      return a.from - b.from
    })

    let freshIngredients = 0
    availableIngredients.forEach(id => {
      let isFresh = false
      ingredientIdRanges.forEach(range => {
        if (range.from <= id && id <= range.to) {
          isFresh = true
          return false // break
        }
      })
      if (isFresh) {
        freshIngredients++
        return false // break
      }
    })

    const result = freshIngredients
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
