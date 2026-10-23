/** SuperK overlays the shipped UI through documented reversible slots. */
import type { Context } from '@deepseek-ai/cordis';
import type { Key } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        superk: Key;
    }
}
export declare const inject: string[];
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map