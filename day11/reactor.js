var input = [
`aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const deviceStrings = input[i].split(/\n/)
    const devices = {}
    deviceStrings.forEach((val => {
      const splitted = val.split(': ')
      const src = splitted[0]
      devices[src] = {}
      const dests = splitted[1].split(/\s+/)
      dests.forEach((dest) => {
        devices[src][dest] = true
      })
    }))
    // console.log(devices)

    const initialState = {d:'you'}
    let pathCount = 0
    const states = [initialState]
    while (states.length > 0) {
      const st = states.shift()
      if (st.d === 'out') {
        pathCount++
        continue
      } else {
        const newStates = Object.keys(devices[st.d]).map(d => {return {d: d}})
        states.push(...newStates)
      }
    }

    const result = pathCount
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
