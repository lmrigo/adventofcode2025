var input = [
`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const machineStrings = input[i].split(/\n/)
    const machines = machineStrings.map((val => {
      const parts = val.split(/\s+/)
      const machine = {}

      const targetLights = parts[0].split('')
      machine.targetLights = targetLights
        .slice(1, targetLights.length - 1) // remove [ ]
        .map((v) => v === '#' ? true : false)
      machine.lights = machine.targetLights.map((v) => false)

      const buttons = []
      for (let p = 1; p < parts.length - 1; p++) {
        const buttonSplit = parts[p].split(/\,|\(|\)/)
        const button = buttonSplit
          .slice(1, buttonSplit.length - 1) // remove ( )
          .map((v) => Number(v))
        buttons.push(button)
      }
      // score buttons for most useful to least useful
      // const score = function (b, lights) {
      //   return b.reduce((acc, val) => acc + (lights[val] ? 1 : 0), 0)
      // }
      // buttons.sort((a, b) => score(b, machine.targetLights) - score(a, machine.targetLights))
      machine.buttons = buttons

      const joltage = parts[parts.length - 1].split(/\,|\{|\}/)
      machine.joltage = joltage
        .slice(1, joltage.length - 1) // remove { }
        .map((v) => Number(v))

      return machine
    }))
    // console.log('machines', machines)

    const fewestButtonPresses = []

    machines.forEach((machine) => {
      // console.log('looking for solution: ', machine)

      // order doesn't matter
      let minPresses = Infinity
      const initialState = {presses: 0, lights: machine.lights.slice(), pressed: []}
      const states = [initialState]
      while (states.length > 0) {
        const st = states.pop()
        if (st.presses >= minPresses) {
          continue
        }
        const newStates = []
        machine.buttons.forEach((button, index) => {
          if (st.pressed.includes(index)) {
            return
          }
          const newSt = { presses: st.presses + 1, lights: st.lights.slice(), pressed: st.pressed.slice() }
          newSt.pressed.push(index)
          button.forEach((lightIndex) => {
            newSt.lights[lightIndex] = !newSt.lights[lightIndex]
          })
          if (newSt.lights.every((val, idx) => val === machine.targetLights[idx])) {
            if (newSt.presses < minPresses) {
              minPresses = newSt.presses
              // console.log(newSt)
            }
          } else if (newSt.presses < minPresses) {
            newStates.push(newSt)
          }
        })
        states.push(...newStates)
      }
      fewestButtonPresses.push(minPresses)
      // console.log('minPresses', minPresses)
    })

    const result = fewestButtonPresses.reduce((a, b) => a + b, 0)
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
