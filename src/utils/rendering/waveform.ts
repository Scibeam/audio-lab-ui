interface AmplitudeRenderParams {
  // The color of the rendering
  color: Number,
  // The context object to draw into
  ctx: CanvasRenderingContext2D
  // An array of audio sample data
  data: Array
  // The max height of an amplitude
  height: Integer
  // The x coordinate to begin rendering
  x: Integer
  // The y coordinate to begin rendering
  y: Integer
}

export default {
  /**
   * Renders amplitudes as a series of 1px wide rectangles, creating
   * a fairly typical waveform.
   *
   * Note: The width of the render is implicitly the number of samples
   * in the data, as each sample spans one pixel.
   *
   * @param amp: AmplitudeRender
   */
  amplitudes: (amp: AmplitudeRenderParams) => {
    const {color, ctx, data, height, x, y} = amp
    ctx.fillStyle = 'transparent'
    ctx.clearRect(x, y, data.length, height)

    ctx.globalAlpha = 1.0
    ctx.fillStyle = color
    ctx.fillRect(0, height * 0.5 - 0.5, data.length, 1)

    data.forEach((amp, xpos) => {
      const h = (height) * amp
      const ypos = y + (height - h) * 0.5
      ctx.fillStyle = color
      ctx.fillRect(x + xpos, y + ypos, 1, h)
    })
  }
}
