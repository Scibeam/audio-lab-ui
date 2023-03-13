/**
 * Returns a normalized copy of the data
 *
 * @channels: Array   An array of audio channels
 * @toMin: Number     The min value to interpolate to
 * @toMax: Number     The max value to interpolate to
 */
export const interpolate = (channels: Array, toMin: Number, toMax: Number) => {
  const [min, max] = minmax(channels)

  return channels.map(channel => {
    const range = max - min
    const toRange = toMax - toMin
    return channel.map(n => toMin + toRange * ((n - min) / range))
  })
}

/**
 * Returns the global min and max for the provided channels
 *
 * @channels: Array   Array of audio channels
 */
export const minmax = (channels: Array) => {
  return channels.reduce((acc, channel) => {
    channel.forEach(n => {
      acc[0] = Math.min(acc[0], n)
      acc[1] = Math.max(acc[1], n)
    })
    return acc
  }, [Infinity, -Infinity])
}

/**
 * Returns the a normalied copy of the provided channel data
 * @channels: Array   Array of audio channels
 */
export const normalize = channels => {
  const [min, max] = minmax(channels)
  console.log(min, max)
  const range = max - min
  return channels.map(channel => channel.map(n =>  (n - min) / range))
}
