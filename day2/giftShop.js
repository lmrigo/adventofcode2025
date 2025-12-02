var input = [
`11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const idRanges = input[i].split(/\,/)
    const ranges = idRanges.map((val => {
      const parts = val.split('-')
      return {
        from: Number(parts[0]),
        to: Number(parts[1])
      }
    }))

    const invalidIds = []
    ranges.forEach(r => {
      for (let id = r.from; id <= r.to; id++) {
        const idStr = id.toString()
        const strlen = idStr.length
        if (strlen % 2 > 0) { continue } // must be even length
        else {
          const head = idStr.substring(0, strlen / 2)
          const tail = idStr.substring(strlen / 2)
          if (head === tail) {
            invalidIds.push(id)
          }
        }
      }
    })
    console.log(invalidIds)


    const result = invalidIds.reduce((acc, val) => acc + val, 0)
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
