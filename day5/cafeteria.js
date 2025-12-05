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
    const inputParts = input[i].split('\n\n') // separate
    const ingredientIdRanges = inputParts[0].split('\n').map(line => {
      const parts = line.split('-')
      return {
        from: Number(parts[0]),
        to: Number(parts[1])
      }
    })

    ingredientIdRanges.sort((a, b) => {
      if (a.from === b.from) {
        return a.to - b.to
      }
      return a.from - b.from
    })

    let freshRanges = ingredientIdRanges.slice(0)
    let mergeCount = -1
    while (mergeCount !== 0) {
      mergeCount = 0
      let newRanges = []
      freshRanges.forEach(fr1 => {
        // insert in correct place
        if (newRanges.length === 0) {
          newRanges.push(fr1)
          return true // continue
        }
        let insertIdx = newRanges.findIndex(fr => fr.from > fr1.from)
        if (insertIdx < 0) {
          insertIdx = newRanges.length
        }
        // check overlap with previous
        if (insertIdx > 0) {
          const prevRange = newRanges[insertIdx - 1]
          // 12-14 and 10-13
          if (prevRange.to >= fr1.from) { // merge
            mergeCount++
            const newRange = {
              from: Math.min(fr1.from, prevRange.from),
              to: Math.max(fr1.to, prevRange.to)
            }
            newRanges.splice(insertIdx - 1, 1, newRange)
            return true // continue
          }
        }
        // check overlap with next
        if (insertIdx < newRanges.length) {
          const nextRange = newRanges[insertIdx]
          // 12-16 and 14-16
          if (fr1.to === nextRange.to) { // merge
            mergeCount++
            const newRange = {
              from: Math.min(fr1.from, nextRange.from), // Min(12,14)
              to: fr1.to // 16
            }
            newRanges.splice(insertIdx, 1, newRange)
            return true // continue
          }
          // 10-14 and 10-16
          if (fr1.from === nextRange.from) { // merge
            mergeCount++
            const newRange = {
              from: fr1.from, // 10
              to: Math.max(fr1.to, nextRange.to) // Max(14,16)
            }
            newRanges.splice(insertIdx, 1, newRange)
            return true // continue
          }
          // 12-16 and 14-18
          if (nextRange.from <= fr1.to) { // merge
            mergeCount++
            const newRange = {
              from: Math.min(fr1.from, nextRange.from),
              to: Math.max(fr1.to, nextRange.to)
            }
            newRanges.splice(insertIdx, 1, newRange)
            return true // continue
          }
        }
        // else just insert
        newRanges.splice(insertIdx, 0, fr1)
      })
      freshRanges = newRanges.slice()
      // console.log(freshRanges)
    }

    const result = freshRanges.reduce((acc, range) => {
      return acc + (range.to - range.from + 1)
    },0)
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
