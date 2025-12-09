var input = [
`162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`
 ,puzzleInput
]


var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const numberStrings = input[i].split(/\n/)
    const junctions = numberStrings.map((row => {
      const vals = row.split(',').map(val => Number(val))
      return {x: vals[0], y: vals[1], z: vals[2]}
    }))
    // console.log(junctions)
    const allDistances = []
    for (let ji = 0; ji < junctions.length; ji++) {
      const a = junctions[ji]
      a.id = ji
      a.cidx = -1
      a.closestDist ??= Infinity
      a.closestJunction ??= -1
      for (let jj = ji + 1; jj < junctions.length; jj++) {
        const b = junctions[jj]
        const dist = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
        allDistances.push({from: ji, to: jj, dist: dist})
        if (dist < a.closestDist) {
          a.closestDist = dist
          a.closestJunction = jj
          if (b.closestDist === undefined || dist < b.closestDist) {
            b.closestDist = dist
            b.closestJunction = ji
          }
        }
      }
    }
    // console.log(junctions)
    allDistances.sort((a, b) => a.dist - b.dist)
    // console.log('allDistances', allDistances)

    const cluster = []
    let part1Counter = i === 0 ? 10 : 1000
    allDistances.forEach(d => {
      if (part1Counter-- <= 0) {
        return
      }
      const jFrom = junctions[d.from]
      const jTo = junctions[d.to]

      if (jFrom.cidx < 0 && jTo.cidx < 0) { // new circuit
        const circuit = [jFrom, jTo]
        const len = cluster.push(circuit)
        jFrom.cidx = len - 1
        jTo.cidx = len - 1
      } else if (jFrom.cidx >= 0 && jTo.cidx < 0) {
        cluster[jFrom.cidx].push(jTo)
        jTo.cidx = jFrom.cidx
      } else if (jFrom.cidx < 0 && jTo.cidx >= 0) {
        cluster[jTo.cidx].push(jFrom)
        jFrom.cidx = jTo.cidx
      } else { // both exist separately, merge
        if (jFrom.cidx !== jTo.cidx) {
          cluster[jFrom.cidx].push(...cluster[jTo.cidx]) // merge
          cluster[jTo.cidx] = [] // remove old
          cluster[jFrom.cidx].forEach(j => { // update index
            j.cidx = jFrom.cidx
          })
        }
      }
    })

    cluster.push(...junctions.filter(j => j.cidx < 0))
    // console.log('clusters', cluster)
    cluster.sort((a, b) => b.length - a.length)

    const result = cluster[0].length * cluster[1].length * cluster[2].length
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

/*
    let sortedJunctions = junctions.slice().sort((a, b) => a.closestDist - b.closestDist)
    console.log('sorted', sortedJunctions)

    const cluster = []
    let part1Counter = junctions.length/2
    while (sortedJunctions.length > 0 && part1Counter-- > 0) {
      const j = sortedJunctions[0]
      const jCircuit = cluster.find(circuit => {
        return circuit.some(cj => cj.id === j.closestJunction)
      })
      if (jCircuit) {
        jCircuit.push(j)
        sortedJunctions = sortedJunctions.filter(jun => jun.id !== j.id)
      } else {
        const circuit = [j, junctions[j.closestJunction]]
        cluster.push(circuit)
        sortedJunctions = sortedJunctions.filter(jun => jun.id !== j.id)
      }
    }
    console.log('clusters', cluster)
    */