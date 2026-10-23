#!/bin/bash
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
APP="$HOME/Applications/SuperK.app"
ICON_SRC="$HERE/icon.png"

rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
cp "$HERE/superk.sh" "$APP/Contents/MacOS/SuperK"
chmod +x "$APP/Contents/MacOS/SuperK"

cat > "$APP/Contents/Info.plist" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>SuperK</string>
  <key>CFBundleDisplayName</key><string>SuperK</string>
  <key>CFBundleIdentifier</key><string>local.niannian.superk</string>
  <key>CFBundleExecutable</key><string>SuperK</string>
  <key>CFBundleIconFile</key><string>SuperK</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleShortVersionString</key><string>0.1</string>
  <key>LSUIElement</key><true/>
</dict>
</plist>
PLIST

if [ -f "$ICON_SRC" ]; then
  SET="$(mktemp -d)/SuperK.iconset"
  mkdir -p "$SET"
  for size in 16 32 128 256 512; do
    sips -s format png -z $size $size "$ICON_SRC" --out "$SET/icon_${size}x${size}.png" >/dev/null
    double=$((size * 2))
    sips -s format png -z $double $double "$ICON_SRC" --out "$SET/icon_${size}x${size}@2x.png" >/dev/null
  done
  iconutil -c icns "$SET" -o "$APP/Contents/Resources/SuperK.icns"
fi

touch "$APP"
echo "$APP"
