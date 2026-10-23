ObjC.import("AppKit")

function run(argv) {
  const source = $.NSImage.alloc.initWithContentsOfFile(argv[0])
  const rep = $.NSBitmapImageRep.imageRepWithData(source.TIFFRepresentation)
  const width = rep.pixelsWide
  const height = rep.pixelsHigh

  const dark = (x, y) => {
    const color = rep.colorAtXY(x, y)
    return color.redComponent + color.greenComponent + color.blueComponent < 2.35
  }
  const midX = Math.floor(width / 2)
  const midY = Math.floor(height / 2)
  let left = 0, right = width - 1, top = 0, bottom = height - 1
  while (left < width && !dark(left, midY)) left++
  while (right > 0 && !dark(right, midY)) right--
  while (top < height && !dark(midX, top)) top++
  while (bottom > 0 && !dark(midX, bottom)) bottom--

  const size = 1024
  const inner = 824
  const offset = (size - inner) / 2
  const out = $.NSBitmapImageRep.alloc.initWithBitmapDataPlanesPixelsWidePixelsHighBitsPerSampleSamplesPerPixelHasAlphaIsPlanarColorSpaceNameBytesPerRowBitsPerPixel(
    null, size, size, 8, 4, true, false, $.NSDeviceRGBColorSpace, 0, 0,
  )
  $.NSGraphicsContext.saveGraphicsState
  $.NSGraphicsContext.setCurrentContext($.NSGraphicsContext.graphicsContextWithBitmapImageRep(out))
  $.NSGraphicsContext.currentContext.imageInterpolation = $.NSImageInterpolationHigh

  const target = $.NSMakeRect(offset, offset, inner, inner)
  $.NSBezierPath.bezierPathWithRoundedRectXRadiusYRadius(target, inner * 0.225, inner * 0.225).addClip

  const bleed = inner * 0.01
  const fromRect = $.NSMakeRect(left, height - 1 - bottom, right - left + 1, bottom - top + 1)
  source.drawInRectFromRectOperationFraction(
    $.NSMakeRect(offset - bleed, offset - bleed, inner + bleed * 2, inner + bleed * 2),
    fromRect,
    $.NSCompositingOperationSourceOver,
    1,
  )
  $.NSGraphicsContext.restoreGraphicsState

  out.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $({})).writeToFileAtomically(argv[1], true)
  return `ok ${left} ${top} ${right} ${bottom}`
}
