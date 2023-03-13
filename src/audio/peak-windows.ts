/**
 * Returns a list of audio peak window
 *
 * @rms: Array        The rms values of the analysed audio (result of computeRMS)
 * @length: Integer   The length of the entire sample
 * @duration: Number  The duration of the peak windows in seconds
 * @numPeask: Integer The number of peak windows to return
 */
export const getAudioPeakWindows = async(rms: Array,
                                         length: Integer,
                                         duration: Number,
                                         sampleRate: Integer,
                                         numPeaks: Integer)  => {
  return new Promise((resolve, reject) => {
    const clonedRMS = [...rms]
    const peaks = clonedRMS.sort((a, b) => b.rms - a.rms).slice(0, numPeaks)

    peaks.forEach(peak => {
      peak.start = peak.at / length
      peak.end = (peak.at - duration * sampleRate) / length
    })

    resolve(peaks)
  })
}
