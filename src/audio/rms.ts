/**
 * Returns an array of RMS values over windows of audio data
 *
 * @channels: Array       Array of arrays containing audio data
 * @duration: Integer     The duration, in seconds, of the RMS analysis window
 * @hop: Integer          The distance, in seconds, to move the window
 * @sampleRate: Integer   The original sample rate of the data
 */
export default const rms = async (
  channels: Array, duration: Integer, hop: Integer, sampleRate: Integer) => {
  return new Promise((resolve, reject) => {
    const length = channels[0].length
    const summed = channels.reduce((acc, channel) => {
      channel.forEach((n, i) => {
        acc[i] += Math.abs(n)
      })
      return acc
    }, new Array(length).fill(0))

    const rms = []
    const window = duration * sampleRate
    for(let i = 0; i < length - window; i += hop * sampleRate) {
      const x = summed.slice(i, i + window)
      const power = x.reduce((acc, x) => acc + x * x, 0) / x.length
      rms.push({
        rms: Math.sqrt(power),
        at: i
      })
    }

    resolve(rms)
  })
}
