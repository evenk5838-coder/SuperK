import { createSnapshotStore } from '@deepseek-ai/dsh-client-store';
import { resolveSlotLabel } from '@deepseek-ai/dsh-client-ui-slots';
import { Sidebar, Header, Hero, NoMark, Name, PanelIcon, Library, Skills, References, SettingsLauncher } from "./Workspace.js";
import { MAC_PALETTE } from "./palette.js";
import { zh, en } from "./locales.js";
import css from './Workspace.module.css';
export const inject = ['slots', 'theme', 'locale', 'layout', 'uiWorkspace', 'shortcuts', 'sessions', 'conversation'];
async function api(action, data) {
    const response = await fetch(`/api/superk?action=${action}`, { method: data ? 'POST' : 'GET', ...(data ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) } : {}), credentials: 'same-origin', signal: AbortSignal.timeout(15_000) });
    const result = await response.json();
    if (!response.ok)
        throw new Error(result.error ?? '读取失败，请重试');
    return result.value;
}
function install(ctx) {
    ctx.effect(() => ctx.theme.overrideTokens('@superk/dsh-client-ui-skin', MAC_PALETTE), 'superk: theme');
    ctx.effect(() => ctx.locale.register('superk', { zh, en }), 'superk: copy');
    let lastSession;
    let settingsOpen;
    const bind = (open) => { settingsOpen = open; return () => { if (settingsOpen === open)
        settingsOpen = undefined; }; };
    const openAPI = () => { settingsOpen?.(); };
    const followSystem = () => ctx.theme.setTheme('system');
    const actions = (sessionId) => ({
        loadSkills: () => api('skills'), loadSkillContent: paths => api('skill-content', { paths }), importSkill: (content, path) => api('import-skill', { content, ...path ? { path } : {} }),
        loadNotes: () => api('notes'), saveNote: note => api('save-note', note), loadFolders: () => api('folders'), createFolder: name => api('folder', { name }), readPath: path => api('read-path', { path }), loadBalance: () => api('balance'), openAPI, followSystem,
        insert: text => {
            const id = sessionId ?? lastSession;
            const actx = id ? ctx.sessions.scope(id) : undefined;
            if (!actx)
                throw new Error(zh.startFirst);
            const input = ctx.conversation.input.for(actx);
            const { draftRev } = input.state.getSnapshot();
            const accepted = actx.bail(actx, 'slash/input-insert-text', { text, span: { start: 0, end: 0, draftRev } });
            if (!accepted)
                throw new Error('当前对话暂时不能接收内容，请稍后重试');
            ctx.layout.selectPanel(null);
            input.focus();
        },
    });
    const common = actions();
    const panels = createSnapshotStore([]);
    const sync = () => panels.set(ctx.slots.entriesOfSlot('sidebar.panellist').map(({ options }) => ({ id: options.id, order: options.order ?? 0, label: resolveSlotLabel(options.label) ?? String(options.id) })).sort((a, b) => a.order - b.order));
    ctx.effect(() => ctx.slots.subscribe('sidebar.panellist', sync), 'superk: navigation');
    ctx.effect(() => ctx.locale.subscribe(sync), 'superk: navigation copy');
    ctx.slots.inject('sidebar', () => ctx.slots.register({ name: 'sidebar', priority: -50, locale: 'superk', children: {
            'sidebar.brand.mark': { kind: 'single', scope: 'root' }, 'sidebar.brand.name': { kind: 'single', scope: 'root' }, 'sidebar.toggle.badge': { kind: 'single', scope: 'root' }, 'sidebar.panellist': { kind: 'list', scope: 'root' }, 'sidebar.workspaces': { kind: 'single', scope: 'root' }, 'sidebar.settings': { kind: 'single', scope: 'root' }, 'sidebar.footer.action': { kind: 'list', scope: 'root' },
        }, inject: () => ({ startSession: () => ctx.uiWorkspace.startSession(), toggleSidebar: () => ctx.layout.toggleSidebar(), selectPanel: (id) => ctx.layout.selectPanel(id), home: () => ctx.layout.selectPanel(null), openAPI, followSystem, hooks: { panels, shortcuts: ctx.shortcuts.catalog } }) }, Sidebar));
    ctx.slots.inject('settings.launcher', () => ctx.slots.register({ name: 'settings.launcher', priority: -50, locale: 'superk', inject: () => ({ bind }) }, SettingsLauncher));
    ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.register({ name: 'sidebar.brand.mark', priority: -50 }, NoMark));
    ctx.slots.inject('sidebar.brand.name', () => ctx.slots.register({ name: 'sidebar.brand.name', priority: -50 }, Name));
    ctx.slots.inject('conversation.hero.brand.mark', () => ctx.slots.register({ name: 'conversation.hero.brand.mark', priority: -50, locale: 'superk' }, Hero));
    ctx.slots.inject('conversation.header.leading', () => ctx.slots.register({ name: 'conversation.header.leading', priority: -50, locale: 'superk', inject: () => common }, Header));
    for (const [key, label, order] of [['superk-brain', 'brain', 10], ['superk-flow', 'flow', 20], ['superk-skills', 'skills', 30]]) {
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id: key, order, label: () => ctx.locale.bind('superk')(label) }, PanelIcon));
        ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key, locale: 'superk', inject: () => ({ ...common, ...key === 'superk-flow' ? { flow: true } : {} }) }, key === 'superk-skills' ? Skills : Library));
    }
    ctx.slots.inject('conversation.input.left', function* () {
        yield ctx.slots.register({ name: 'conversation.input.left', id: 'superk-skills', order: 10, locale: 'superk', inject: id => { lastSession = id; return { ...actions(id), composer: true }; } }, Skills);
        yield ctx.slots.register({ name: 'conversation.input.left', id: 'superk-references', order: 20, locale: 'superk', inject: id => actions(id) }, References);
    });
    sync();
    ctx.effect(() => {
        const previous = document.title;
        document.body.classList.add(css.shell);
        const pin = () => { if (document.title !== 'SuperK')
            document.title = 'SuperK'; };
        pin();
        const observer = new MutationObserver(pin);
        observer.observe(document.head, { childList: true, subtree: true, characterData: true });
        return () => { observer.disconnect(); document.title = previous; document.body.classList.remove(css.shell); };
    }, 'superk: page identity');
}
export function apply(ctx) { try {
    install(ctx);
}
catch (error) {
    console.error("SuperK skin activation:", error);
    throw error;
} }
//# sourceMappingURL=index.js.map