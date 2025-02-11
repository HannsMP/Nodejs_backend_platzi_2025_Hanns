let Utils = {
  randInt(range_min, range_max) {
    return Math.floor(range_min + (Math.random() * (range_max - range_min)))
  },
  random(range_min, range_max) {
    return range_min + (Math.random() * (range_max - range_min))
  }
}

module.exports = Utils;