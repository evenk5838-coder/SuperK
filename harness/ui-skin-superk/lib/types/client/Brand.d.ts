import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client';
/**
 * Render the SuperK icon at the size the host surface requests.
 * @param props - Host-supplied mark size.
 * @returns the SuperK app icon.
 */
export declare function SuperKMark({ size }: SidebarBrandMarkOwnerProps): import("react").JSX.Element;
/**
 * Render the SuperK name beside the sidebar mark.
 * @returns the SuperK wordmark.
 */
export declare function SuperKName(): import("react").JSX.Element;
/**
 * Render the SuperK icon on the empty-conversation hero. The host class only
 * positions the mark, so it is kept on a wrapper.
 * @param props - Host-supplied mark size and positioning class.
 * @returns the SuperK app icon.
 */
export declare function SuperKHeroMark({ size, className }: HeroBrandMarkOwnerProps): import("react").JSX.Element;
//# sourceMappingURL=Brand.d.ts.map