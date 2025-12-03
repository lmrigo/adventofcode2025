var input = [
`987654321111111
811111111111119
234234234234278
818181911112111`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const bankStrings = input[i].split(/\s+/)
    const banks = bankStrings.map((val => {
      return val.split('').map(Number)
    }))

    let totalJoltage = 0
    banks.forEach(bank => {
      let highestJoltage
      // find first digit
      let firstDigit = 0
      let firstDigitIndex = 0
      for (let i = 0; i < bank.length-1; i++) {
        if (bank[i] > firstDigit) {
          firstDigit = bank[i]
          firstDigitIndex = i
        }
      }
      // find second digit
      let secondDigit = 0
      let secondDigitIndex = 0
      for (let j = firstDigitIndex+1 ; j < bank.length; j++) {
        if (bank[j] > secondDigit) {
          secondDigit = bank[j]
          secondDigitIndex = j
        }
      }
      highestJoltage = '' + firstDigit + '' + secondDigit
      // console.log('highestJoltage', highestJoltage)
      totalJoltage += Number(highestJoltage)
    });

    const result = totalJoltage
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (let i = 0; i < input.length; i++) {
    const bankStrings = input[i].split(/\s+/)
    const banks = bankStrings.map((val => {
      return val.split('').map(Number)
    }))

    let totalJoltage = 0
    banks.forEach(bank => {
      let highestJoltage
      let digit = 12
      const digits = [] // length = 12
      let prevDigitIndex = -1
      while (digit > 0) {
        // find nth digit
        let nthDigit = 0
        let nthDigitIndex = 0
        for (let i = prevDigitIndex+1; i < bank.length-(digit-1); i++) {
          if (bank[i] > nthDigit) {
            nthDigit = bank[i]
            nthDigitIndex = i
          }
          if (nthDigit === 9) {
            break
          }
        }
        digits.push(nthDigit)
        prevDigitIndex = nthDigitIndex
        digit--
      }

      highestJoltage = digits.join('')
      // console.log('highestJoltage', highestJoltage)
      totalJoltage += Number(highestJoltage)
    });

    const result = totalJoltage
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
