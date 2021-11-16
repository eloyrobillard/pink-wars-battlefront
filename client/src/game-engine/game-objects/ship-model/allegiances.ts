interface Allegiances {
  [key: string]: string[];
}

const allegiances: Allegiances = {
  rebels: [
    'x-wing',
    'xWing'
  ],
  separatists: [
    'droid-fighter',
    'droidFighter'
  ],
  empire: [
    'tie-fighter',
    'tieFighter'
  ],
  triangles: [
    'default',
    'triangle'
  ]
}

export default allegiances;