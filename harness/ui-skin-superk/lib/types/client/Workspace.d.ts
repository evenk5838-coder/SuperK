import type { InjectFace, PropsRuntime, PropsRenderSlots, PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import type { SidebarRootInjected } from '@deepseek-ai/dsh-client-ui-sidebar/client';
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
export interface Note {
    id: string;
    title: string;
    folder: string;
    content: string;
    updated: string;
}
export interface Skill {
    name: string;
    description: string;
    path: string;
    content?: string;
}
export interface Balance {
    checkedAt: string;
    balance_infos: {
        currency: string;
        total_balance: string;
    }[];
}
export interface Actions {
    loadSkills(): Promise<Skill[]>;
    loadSkillContent(paths: string[]): Promise<Skill[]>;
    importSkill(content: string, path?: string): Promise<Skill>;
    loadNotes(): Promise<Note[]>;
    saveNote(note: Omit<Note, 'id' | 'updated'> & {
        id?: string;
    }): Promise<Note>;
    loadFolders(): Promise<string[]>;
    createFolder(name: string): Promise<void>;
    readPath(path: string): Promise<{
        title: string;
        content: string;
    }>;
    loadBalance(): Promise<Balance>;
    openAPI(): void;
    followSystem(): void;
    insert(text: string): void;
}
type Copy = PropsLocale<'superk'>;
export type ViewProps = Copy & InjectFace<Actions>;
export type SideProps = PropsRuntime<'sidebar'> & PropsRenderSlots<'sidebar.brand.mark' | 'sidebar.brand.name' | 'sidebar.toggle.badge' | 'sidebar.panellist' | 'sidebar.workspaces' | 'sidebar.settings' | 'sidebar.footer.action'> & Copy & InjectFace<SidebarRootInjected> & {
    home(): void;
    openAPI(): void;
    followSystem(): void;
};
export declare function Sidebar({ collapsed, toggleSidebar, startSession, selectPanel, usePanels, usePanelInfo, renderSlot, t, home, followSystem }: SideProps): import("react").JSX.Element;
export declare function Hero({ className, t }: HeroBrandMarkOwnerProps & Copy): import("react").JSX.Element;
export declare function NoMark(): null;
export declare function Name(): import("react").JSX.Element;
export declare function PanelIcon({ size }: {
    size: number;
}): import("react").JSX.Element;
export declare function Header(props: PropsRuntime<'conversation.header.leading'> & ViewProps): import("react").JSX.Element;
export declare function Skills(props: ViewProps & {
    composer?: boolean;
    initialImport?: boolean;
}): import("react").JSX.Element;
export declare function References(props: ViewProps): import("react").JSX.Element;
export declare function Library(props: ViewProps & {
    flow?: boolean;
}): import("react").JSX.Element;
export declare function SettingsLauncher({ wide, openSettings, bind, t }: import('@deepseek-ai/dsh-client-ui-settings/client').SettingsLauncherOwnerProps & Copy & {
    bind(open: () => void): () => void;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=Workspace.d.ts.map