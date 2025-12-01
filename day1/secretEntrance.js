var input = [
`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const rotationStrings = input[i].split(/\s+/)
    const rotations = rotationStrings.map((val => {
      return {
        direction: val.charAt(0),
        distance: Number(val.slice(1)) % 100
      }
    }))

    let dial = 50 // initial position
    let zeroPosCount = 0

    rotations.forEach(r => {
      if (r.direction === 'L') {
        dial -= r.distance
        if (dial < 0) dial += 100
      } else {
        dial += r.distance
        dial %= 100
      }
      if (dial === 0) {
        zeroPosCount++
      }
      // console.log(dial)
    })

    const result = zeroPosCount
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
