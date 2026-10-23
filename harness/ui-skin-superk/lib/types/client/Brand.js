import { jsx as _jsx } from "react/jsx-runtime";
import { SUPERK_ICON } from "./icon.js";
/**
 * Render the SuperK icon at the size the host surface requests.
 * @param props - Host-supplied mark size.
 * @returns the SuperK app icon.
 */
export function SuperKMark({ size }) {
    return (_jsx("img", { src: SUPERK_ICON, width: size, height: size, alt: "", draggable: false, style: { display: 'block', borderRadius: Math.round(size * 0.225) } }));
}
/**
 * Render the SuperK name beside the sidebar mark.
 * @returns the SuperK wordmark.
 */
export function SuperKName() {
    return (_jsx("span", { style: { fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em', color: 'var(--dsw-alias-label-primary)' }, children: "SuperK" }));
}
/**
 * Render the SuperK icon on the empty-conversation hero. The host class only
 * positions the mark, so it is kept on a wrapper.
 * @param props - Host-supplied mark size and positioning class.
 * @returns the SuperK app icon.
 */
export function SuperKHeroMark({ size, className }) {
    return (_jsx("span", { className: className, style: { display: 'inline-flex', width: size, height: size }, children: _jsx(SuperKMark, { size: size }) }));
}
//# sourceMappingURL=Brand.js.map