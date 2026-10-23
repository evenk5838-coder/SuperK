import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/** Personal navigation and local-library views; services arrive as callbacks. */
import { useEffect, useState } from 'react';
import { Button, Modal, Input, IconPlusOutlineRegular, IconFolderCloseRegular, IconSparkleRegular, IconPanelLeftOutlineRegular, IconNewChatOutlineRegular, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './Workspace.module.css';
const stages = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8'];
const hints = ['stageHint1', 'stageHint2', 'stageHint3', 'stageHint4', 'stageHint5', 'stageHint6', 'stageHint7', 'stageHint8'];
export function Sidebar({ collapsed, toggleSidebar, startSession, selectPanel, usePanels, usePanelInfo, renderSlot, t, home, followSystem }) {
    const panels = usePanels(p => p);
    const active = usePanelInfo(p => p.activePanelId);
    const wide = !collapsed;
    return _jsxs("aside", { className: css.sidebar, children: [_jsxs("div", { className: css.brandRow, children: [wide && _jsxs("div", { children: [_jsx("strong", { children: "SuperK" }), _jsx("small", { children: t('personal') })] }), _jsx(Tooltip, { label: t(wide ? 'collapse' : 'expand'), children: _jsx("button", { "aria-label": t(wide ? 'collapse' : 'expand'), onClick: toggleSidebar, children: _jsx(IconPanelLeftOutlineRegular, {}) }) })] }), _jsxs("button", { className: css.newButton, onClick: () => startSession(), "aria-label": t('new'), children: [_jsx(IconNewChatOutlineRegular, {}), wide && t('new')] }), _jsxs("button", { className: active === null ? css.activeRow : css.navRow, onClick: home, "aria-label": t('home'), children: [_jsx(IconSparkleRegular, {}), wide && t('home')] }), panels.filter(p => p.id.startsWith('superk-')).map(p => _jsxs("button", { className: active === p.id ? css.activeRow : css.navRow, onClick: () => selectPanel(p.id), "aria-label": p.label, children: [renderSlot('sidebar.panellist', { size: 16, active: active === p.id }, { only: p.id }), wide && p.label] }, p.id)), _jsx("div", { className: css.projects, children: wide ? _jsxs("details", { open: true, children: [_jsx("summary", { children: t('projects') }), _jsx("div", { className: css.projectBody, children: renderSlot('sidebar.workspaces', { wide, expandSidebar: toggleSidebar }) })] }) : renderSlot('sidebar.workspaces', { wide, expandSidebar: toggleSidebar }) }), wide && _jsxs("details", { className: css.more, children: [_jsx("summary", { children: t('more') }), panels.filter(p => !p.id.startsWith('superk-')).map(p => _jsxs("button", { className: css.navRow, onClick: () => selectPanel(p.id), children: [renderSlot('sidebar.panellist', { size: 16, active: active === p.id }, { only: p.id }), p.label] }, p.id))] }), _jsxs("div", { className: css.footer, children: [wide && _jsx(_Fragment, { children: _jsx("button", { className: css.mutedButton, onClick: followSystem, children: t('theme') }) }), renderSlot('sidebar.settings', { wide }), renderSlot('sidebar.footer.action', { wide })] })] });
}
export function Hero({ className, t }) { return _jsxs("span", { className: `${className ?? ''} ${css.hero}`, children: [_jsx("span", { children: t('hero') }), _jsx("small", { children: t('heroHint') })] }); }
export function NoMark() { return null; }
export function Name() { return _jsx("span", { children: "SuperK" }); }
export function PanelIcon({ size }) { return _jsx(IconFolderCloseRegular, { size: size }); }
export function Header(props) {
    const { t, loadBalance, openAPI } = props;
    const [balance, setBalance] = useState();
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const refresh = async () => { setBusy(true); try {
        setBalance(await loadBalance());
        setError('');
    }
    catch (e) {
        setError(String(e instanceof Error ? e.message : e));
    }
    finally {
        setBusy(false);
    } };
    useEffect(() => { void refresh(); const id = window.setInterval(() => { if (document.visibilityState === 'visible')
        void refresh(); }, 30_000); return () => window.clearInterval(id); }, [loadBalance]);
    return _jsxs("div", { className: css.apiGroup, children: [_jsx(Tooltip, { label: `${t('balanceHint')} ${error}`, children: _jsxs("button", { className: css.balance, onClick: () => void refresh(), disabled: busy, children: [busy ? t('querying') : balance ? balance.balance_infos.map(b => `${b.currency === 'CNY' ? '¥' : '$'}${b.total_balance}`).join(' / ') : t('noBalance'), _jsx("small", { children: balance ? new Date(balance.checkedAt).toLocaleTimeString() : 'DeepSeek API' })] }) }), _jsx("button", { className: css.apiButton, onClick: openAPI, children: t('api') })] });
}
function errorMessage(e) { return e instanceof Error ? e.message : String(e); }
export function Skills(props) {
    const { t, loadSkills, loadSkillContent, importSkill, insert } = props;
    const [skills, setSkills] = useState([]), [selected, setSelected] = useState([]), [query, setQuery] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    const [open, setOpen] = useState(!props.composer), [adding, setAdding] = useState(!!props.initialImport), [content, setContent] = useState(''), [path, setPath] = useState('');
    const refresh = async () => { setBusy(true); try {
        const next = await loadSkills();
        setSkills(next);
        setSelected(s => s.filter(path => next.some(k => k.path === path)));
        setError('');
    }
    catch (e) {
        setError(errorMessage(e));
    }
    finally {
        setBusy(false);
    } };
    useEffect(() => { if (open || adding)
        void refresh(); }, [open, adding]);
    const addToDraft = async () => { setBusy(true); try {
        const items = await loadSkillContent(selected);
        insert(items.map(s => `\n[本轮 Skill：${s.name}]\n来源：${s.path}\n请遵循以下 Skill 指令，按任务需要依次或组合使用；说明每项实际使用情况。\n${s.content}\n[/Skill]\n`).join('\n'));
        setOpen(false);
        setSelected([]);
        setError('');
    }
    catch (e) {
        setError(errorMessage(e));
    }
    finally {
        setBusy(false);
    } };
    const body = _jsxs(_Fragment, { children: [_jsx("p", { className: css.hint, children: t('skillHint') }), _jsxs("div", { className: css.toolbar, children: [_jsx(Input, { "aria-label": t('search'), placeholder: t('search'), value: query, onChange: e => setQuery(e.target.value) }), _jsx(Button, { variant: "ghost", onClick: () => void refresh(), disabled: busy, children: t('refresh') }), _jsxs(Button, { variant: "outline", onClick: () => setAdding(true), children: [_jsx(IconPlusOutlineRegular, {}), t('plusSkill')] })] }), error && _jsx("p", { role: "alert", className: css.error, children: error }), _jsx("div", { className: css.list, children: busy ? _jsx("p", { children: t('loading') }) : !skills.length ? _jsx("p", { className: css.empty, children: t('skillEmpty') }) : skills.filter(s => `${s.name} ${s.description}`.toLowerCase().includes(query.toLowerCase())).map(s => _jsxs("label", { className: css.skillRow, children: [_jsx("input", { type: "checkbox", checked: selected.includes(s.path), onChange: e => { if (e.target.checked && selected.length >= 10) {
                                setError(t('skillLimit'));
                                return;
                            } setSelected(e.target.checked ? [...selected, s.path] : selected.filter(k => k !== s.path)); } }), _jsxs("span", { children: [_jsx("strong", { children: s.name }), _jsx("small", { children: s.description }), _jsx("small", { className: css.path, children: s.path })] })] }, s.path)) }), _jsx("p", { className: css.hint, children: t('drafts') }), _jsxs(Button, { variant: "primary", disabled: !selected.length || busy, onClick: () => void addToDraft(), children: [t('select'), " ", selected.length || ''] })] });
    const importDialog = _jsxs(Modal, { open: adding, onClose: () => setAdding(false), title: t('plusSkill'), closeLabel: t('close'), className: css.modal, children: [_jsx("p", { className: css.hint, children: t('importHint') }), _jsx(FileText, { t: t, onText: setContent, onError: setError }), _jsx("textarea", { "aria-label": t('content'), placeholder: t('content'), value: content, onChange: e => setContent(e.target.value) }), _jsx(Input, { "aria-label": t('path'), placeholder: t('path'), value: path, onChange: e => setPath(e.target.value) }), error && _jsx("p", { role: "alert", className: css.error, children: error }), _jsx(Button, { disabled: busy || (!content.trim() && !path.trim()), variant: "primary", onClick: () => { setBusy(true); void importSkill(content, path.trim() || undefined).then(() => { setContent(''); setPath(''); setAdding(false); void refresh(); }).catch(e => setError(errorMessage(e))).finally(() => setBusy(false)); }, children: t('import') })] });
    return props.composer ? _jsxs(_Fragment, { children: [_jsx("button", { className: css.composerButton, onClick: () => setOpen(true), children: t('skillSelect') }), _jsx(Tooltip, { label: t('plusSkill'), children: _jsx("button", { className: css.plus, "aria-label": t('plusSkill'), onClick: () => setAdding(true), children: _jsx(IconPlusOutlineRegular, { size: 14 }) }) }), _jsx(Modal, { open: open, onClose: () => setOpen(false), title: t('skills'), closeLabel: t('close'), className: css.modal, children: body }), importDialog] }) : _jsxs("section", { className: css.page, children: [_jsxs("div", { className: css.pageHeading, children: [_jsx("small", { children: t('eyebrowSkills') }), _jsx("h1", { children: t('skills') })] }), body, importDialog] });
}
function FileText({ t, onText, onError }) { return _jsxs("label", { className: css.fileButton, children: [t('choose'), _jsx("input", { type: "file", accept: ".md,.txt,.json,.csv,.yaml,.yml,.html,.js,.ts", onChange: e => { const file = e.target.files?.[0]; if (!file)
                return; if (file.size > 1_000_000) {
                onError(t('textLimit'));
                return;
            } void file.text().then(text => { if (text.includes('\0'))
                throw new Error(t('textFile')); onText(text); }).catch(e => onError(errorMessage(e))); e.target.value = ''; } }), _jsx("small", { children: t('fileHint') })] }); }
export function References(props) {
    const { t, loadNotes, readPath, insert } = props;
    const [open, setOpen] = useState(false), [adding, setAdding] = useState(false), [notes, setNotes] = useState([]), [selected, setSelected] = useState([]), [content, setContent] = useState(''), [path, setPath] = useState(''), [url, setUrl] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    useEffect(() => { if (open) {
        setBusy(true);
        void loadNotes().then(setNotes).catch(e => setError(errorMessage(e))).finally(() => setBusy(false));
    } }, [open, loadNotes]);
    const append = (text) => { try {
        if (!text.trim())
            throw new Error(t('empty'));
        insert(`\n[本轮参考资料]\n${text}\n[/参考资料]\n`);
        setOpen(false);
        setAdding(false);
        setContent('');
        setUrl('');
        setPath('');
        setSelected([]);
        setError('');
    }
    catch (e) {
        setError(errorMessage(e));
    } };
    return _jsxs(_Fragment, { children: [_jsx("button", { className: css.composerButton, onClick: () => setOpen(true), children: t('reference') }), _jsx(Tooltip, { label: t('plusReference'), children: _jsx("button", { className: css.plus, "aria-label": t('plusReference'), onClick: () => setAdding(true), children: _jsx(IconPlusOutlineRegular, { size: 14 }) }) }), _jsxs(Modal, { open: open, onClose: () => setOpen(false), title: t('reference'), closeLabel: t('close'), className: css.modal, children: [busy ? _jsx("p", { children: t('loading') }) : _jsx("div", { className: css.list, children: notes.length ? notes.map(n => _jsxs("label", { className: css.skillRow, children: [_jsx("input", { type: "checkbox", checked: selected.includes(n.id), onChange: e => setSelected(e.target.checked ? [...selected, n.id] : selected.filter(id => id !== n.id)) }), _jsxs("span", { children: [n.title, _jsx("small", { children: n.folder || t('rootFolder') })] })] }, n.id)) : _jsx("p", { className: css.empty, children: t('noNotes') }) }), error && _jsx("p", { role: "alert", className: css.error, children: error }), _jsxs("div", { className: css.toolbar, children: [_jsxs(Button, { variant: "outline", onClick: () => setAdding(true), children: [_jsx(IconPlusOutlineRegular, {}), t('plusReference')] }), _jsx(Button, { variant: "primary", disabled: !selected.length, onClick: () => append(notes.filter(n => selected.includes(n.id)).map(n => `# ${n.title}\n${n.content}`).join('\n\n')), children: t('select') })] })] }), _jsxs(Modal, { open: adding, onClose: () => setAdding(false), title: t('plusReference'), closeLabel: t('close'), className: css.modal, children: [_jsx(FileText, { t: t, onText: setContent, onError: setError }), _jsx("textarea", { "aria-label": t('content'), placeholder: t('content'), value: content, onChange: e => setContent(e.target.value) }), _jsxs("div", { className: css.toolbar, children: [_jsx(Input, { "aria-label": t('path'), placeholder: t('path'), value: path, onChange: e => setPath(e.target.value) }), _jsx(Button, { disabled: !path.trim() || busy, variant: "outline", onClick: () => { setBusy(true); void readPath(path).then(v => setContent(v.content)).catch(e => setError(errorMessage(e))).finally(() => setBusy(false)); }, children: t('read') })] }), _jsx(Input, { "aria-label": t('url'), placeholder: "https://\u2026", value: url, onChange: e => setUrl(e.target.value) }), _jsx("p", { className: css.hint, children: t('urlHint') }), error && _jsx("p", { role: "alert", className: css.error, children: error }), _jsx(Button, { variant: "primary", disabled: busy || (!content.trim() && !url.trim()), onClick: () => { if (url && !/^https?:\/\/\S+$/i.test(url)) {
                            setError(t('invalidURL'));
                            return;
                        } append([content, url ? `参考链接（尚未读取正文）：${url}` : ''].filter(Boolean).join('\n')); }, children: t('select') })] })] });
}
export function Library(props) {
    const { t, loadNotes, saveNote, loadFolders, createFolder, readPath, insert, flow } = props;
    const [notes, setNotes] = useState([]), [folders, setFolders] = useState([]), [folder, setFolder] = useState(flow ? null : ''), [query, setQuery] = useState(''), [edit, setEdit] = useState(), [creating, setCreating] = useState(false), [folderOpen, setFolderOpen] = useState(false), [folderName, setFolderName] = useState(''), [title, setTitle] = useState(''), [content, setContent] = useState(''), [area, setArea] = useState(''), [path, setPath] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    const refresh = async () => { setBusy(true); try {
        const [n, f] = await Promise.all([loadNotes(), loadFolders()]);
        setNotes(n);
        setFolders(f);
        setError('');
    }
    catch (e) {
        setError(errorMessage(e));
    }
    finally {
        setBusy(false);
    } };
    useEffect(() => { void refresh(); }, [loadNotes, loadFolders]);
    const openEditor = (note) => { setEdit(note); setTitle(note?.title ?? ''); setContent(note?.content ?? ''); setArea(note?.folder ?? folder ?? ''); setPath(''); setCreating(true); };
    const visible = notes.filter(n => (!folder || n.folder === folder || n.folder.startsWith(folder + '/')) && `${n.title} ${n.content}`.toLowerCase().includes(query.toLowerCase()));
    return _jsxs("section", { className: css.page, children: [_jsxs("div", { className: css.pageHeading, children: [_jsx("small", { children: t(flow ? 'eyebrowFlow' : 'eyebrowBrain') }), _jsx("h1", { children: t(flow ? 'flow' : 'brain') }), _jsx("p", { children: t(flow ? 'flowHint' : 'brainHint') })] }), _jsxs("div", { className: css.toolbar, children: [_jsx(Input, { "aria-label": t('search'), placeholder: t('search'), value: query, onChange: e => setQuery(e.target.value) }), _jsxs(Button, { variant: "outline", onClick: () => setFolderOpen(true), children: [_jsx(IconPlusOutlineRegular, {}), t('folder')] }), _jsxs(Button, { variant: "primary", onClick: () => openEditor(), children: [_jsx(IconPlusOutlineRegular, {}), t('create')] })] }), error && _jsx("p", { role: "alert", className: css.error, children: error }), flow && folder === null && !query ? _jsx("div", { className: css.stageGrid, children: stages.map((s, i) => _jsxs("button", { className: css.stageCard, onClick: () => setFolder(t(s)), children: [_jsx("span", { children: String(i + 1).padStart(2, '0') }), _jsx("h2", { children: t(s) }), _jsx("p", { children: t(hints[i]) }), _jsxs("small", { children: [notes.filter(n => n.folder === t(s) || n.folder.startsWith(t(s) + '/')).length, " ", t('items')] })] }, s)) }) : _jsxs(_Fragment, { children: [_jsxs("div", { className: css.folderBar, children: [_jsx("button", { className: css.mutedButton, onClick: () => setFolder(flow ? null : ''), children: t(flow ? 'back' : 'all') }), folder && _jsx("span", { children: folder }), folders.filter(f => !folder || f.startsWith(folder + '/')).map(f => _jsx("button", { className: css.folderChip, onClick: () => setFolder(f), children: f }, f))] }), busy ? _jsx("p", { className: css.empty, children: t('loading') }) : !visible.length ? _jsxs("div", { className: css.empty, children: [_jsx(IconFolderCloseRegular, { size: 28 }), _jsx("p", { children: t('noNotes') })] }) : _jsx("div", { className: css.noteGrid, children: visible.map(n => _jsxs("button", { className: css.noteCard, onClick: () => openEditor(n), children: [_jsx("small", { children: n.folder || t('rootFolder') }), _jsx("h2", { children: n.title }), _jsx("p", { children: n.content.slice(0, 130) }), _jsx("small", { children: new Date(n.updated).toLocaleDateString() })] }, n.id)) })] }), _jsx("p", { className: css.storage, children: t('stored') }), _jsxs(Modal, { open: creating, onClose: () => setCreating(false), title: t(edit ? 'edit' : 'create'), closeLabel: t('close'), className: css.modal, children: [_jsx(Input, { "aria-label": t('title'), placeholder: t('title'), value: title, onChange: e => setTitle(e.target.value) }), _jsx(Input, { "aria-label": t('area'), placeholder: t('area'), value: area, onChange: e => setArea(e.target.value), list: "superk-folders" }), _jsx("datalist", { id: "superk-folders", children: [...stages.map(s => t(s)), ...folders].map(f => _jsx("option", { value: f }, f)) }), _jsx(FileText, { t: t, onText: setContent, onError: setError }), _jsxs("div", { className: css.toolbar, children: [_jsx(Input, { "aria-label": t('path'), placeholder: t('path'), value: path, onChange: e => setPath(e.target.value) }), _jsx(Button, { disabled: !path.trim() || busy, variant: "outline", onClick: () => { setBusy(true); void readPath(path).then(v => { setContent(v.content); if (!title)
                                    setTitle(v.title); }).catch(e => setError(errorMessage(e))).finally(() => setBusy(false)); }, children: t('read') })] }), _jsx("textarea", { "aria-label": t('content'), placeholder: t('content'), value: content, onChange: e => setContent(e.target.value) }), error && _jsx("p", { role: "alert", className: css.error, children: error }), _jsxs("div", { className: css.toolbar, children: [_jsx(Button, { variant: "primary", disabled: busy || !title.trim(), onClick: () => { setBusy(true); void saveNote({ ...(edit ? { id: edit.id } : {}), title, folder: area, content }).then(() => { setCreating(false); void refresh(); }).catch(e => setError(errorMessage(e))).finally(() => setBusy(false)); }, children: t('save') }), _jsx(Button, { variant: "outline", disabled: !content.trim(), onClick: () => { try {
                                    insert(`\n[参考知识：${title}]\n${content}\n[/参考知识]\n`);
                                    setCreating(false);
                                }
                                catch (e) {
                                    setError(errorMessage(e));
                                } }, children: t('select') }), _jsx(Button, { variant: "ghost", onClick: () => { const url = URL.createObjectURL(new Blob([`# ${title}\n\n${content}`], { type: 'text/markdown' })); const a = document.createElement('a'); a.href = url; a.download = `${title || 'SuperK'}.md`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }, children: t('export') })] })] }), _jsxs(Modal, { open: folderOpen, onClose: () => setFolderOpen(false), title: t('folder'), closeLabel: t('close'), className: css.modal, children: [_jsx("p", { children: t('folderHint') }), _jsx(Input, { "aria-label": t('folderName'), value: folderName, onChange: e => setFolderName(e.target.value) }), error && _jsx("p", { role: "alert", className: css.error, children: error }), _jsx(Button, { variant: "primary", disabled: !folderName.trim() || busy, onClick: () => { setBusy(true); void createFolder(folderName).then(() => { setFolderOpen(false); setFolderName(''); void refresh(); }).catch(e => setError(errorMessage(e))).finally(() => setBusy(false)); }, children: t('save') })] })] });
}
export function SettingsLauncher({ wide, openSettings, bind, t }) {
    useEffect(() => bind(openSettings), [bind, openSettings]);
    return _jsx(Button, { variant: "ghost", onClick: openSettings, "aria-label": t('settings'), children: wide ? t('settings') : _jsx(IconSparkleRegular, {}) });
}
//# sourceMappingURL=Workspace.js.map