import {turquoise} from '@/utils/colors.ts'

interface AmplitudeRender {
  color: Number,
  ctx: CanvasRenderingContext2D
  data: Array
  height: Integer
  x: Integer
  y: Integer
}

export default {
  amplitudes: (amp: AmplitudeRender) => {
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
