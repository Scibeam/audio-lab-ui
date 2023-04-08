/**
 * Compacts a waveform for visualization by averaging windows of audio data
 *
 * @channels: Array     A list of lists of floating point values
 * @width: Integer      The width in pixels for the visualization
 * @skipFrames: Integer The number of frames to jump by while averaging a window of samples
 * @normalize: Boolean  A boolean indicating the whether or not to normalize the result
 */
export const compactForWaveformVis = async ({channels, width, skipFrames=0, normalize=true})  => {
  return new Promise((resolve, reject) => {
    let data = []
    let max = -Infinity
    let min = Infinity

    const length = channels[0].length
    const window = Math.ceil(length / width)
    const skip = Math.min(Math.max(skipFrames, 1), window)

    for(let i = 0; i < length; i += window) {
      let sample = 0
      let sample_length = 0
      for(let j = i; j < i + window; j+=skip) {
        if(j < length) {
          for(let k = 0; k < channels.length; k++) {
            const channel = channels[k]
            sample += Math.abs(channel[j])
            sample_length += 1
          }
        }
      }

      sample /= sample_length
      max = Math.max(max, sample)
      min = Math.min(min, sample)
      data.push(sample)
    }

    if(normalize) {
      const range = max - min
      data = data.map(x => (x - min) / range)
      min = 0
      max = 1
    }

    resolve({
      data,
      length,
      max,
      min,
      window
    })
  })
}
