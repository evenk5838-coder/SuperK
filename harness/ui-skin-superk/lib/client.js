window.__ModuleLoader__.load({
	id: "@superk/dsh-client-ui-skin",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		let _deepseek_ai_dsh_client_ui_slots = require("@deepseek-ai/dsh-client-ui-slots");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:/Users/niannian/deepseek-harness/packages/client/ui-skin-superk/src/client/Workspace.module.css.mjs
		const css = ".j88erq_shell{font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,PingFang SC,sans-serif}.j88erq_sidebar{box-sizing:border-box;background:var(--dsw-specific-sidebar-fill);height:100%;color:var(--dsw-alias-label-primary);flex-direction:column;gap:6px;padding:22px 14px 12px;display:flex;overflow:hidden}.j88erq_brandRow{justify-content:space-between;align-items:center;min-height:54px;padding:2px 10px 22px;display:flex}.j88erq_brandRow strong{letter-spacing:-.8px;font-size:22px;font-weight:500;line-height:28px}.j88erq_brandRow small{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:18px;display:block}.j88erq_sidebar button{cursor:pointer;font:inherit;color:inherit;border-radius:var(--dsw-radius-md);background:0 0;border:0;min-height:36px;transition:background .16s,transform .16s}.j88erq_sidebar button:hover{background:var(--dsw-alias-interactive-bg-hover)}.j88erq_sidebar button:active{transform:scale(.98)}.j88erq_navRow,.j88erq_activeRow,.j88erq_newButton{text-align:left;align-items:center;gap:12px;padding:10px 13px;line-height:20px;display:flex;font-size:13px!important}.j88erq_activeRow{background:var(--dsw-alias-state-business-tertiary)!important;color:var(--dsw-alias-brand-primary)!important}.j88erq_newButton{box-shadow:var(--dsw-elevation-soft);margin-bottom:12px;background:var(--dsw-alias-bg-layer-1)!important}.j88erq_projects{flex:1;min-height:130px;margin-top:24px;overflow:auto}.j88erq_projects details{flex-direction:column;height:100%;display:flex}.j88erq_sidebar summary{cursor:pointer;color:var(--dsw-alias-label-secondary);padding:8px 12px;font-size:11px;line-height:20px}.j88erq_projectBody{height:calc(100% - 36px);min-height:180px}.j88erq_more{max-height:150px;overflow:auto}.j88erq_footer{border-top:.5px solid var(--dsw-alias-border-l1);padding-top:12px}.j88erq_mutedButton{color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;padding:8px;font-size:12px;line-height:20px}.j88erq_header{border-bottom:.5px solid var(--dsw-alias-border-l1);flex-shrink:0;justify-content:space-between;align-items:center;gap:16px;min-height:68px;padding:10px 28px;display:flex}.j88erq_nativeHeader{flex:1;align-items:center;min-width:0;display:flex}.j88erq_apiGroup{flex-shrink:0;align-items:center;gap:14px;display:flex}.j88erq_apiButton,.j88erq_balance,.j88erq_composerButton,.j88erq_plus{cursor:pointer;color:var(--dsw-alias-label-secondary);border-radius:var(--dsw-radius-sm);background:0 0;border:0;padding:7px 10px;font-size:12px;line-height:18px;transition:background .16s,transform .16s}.j88erq_apiButton{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-state-business-tertiary)}.j88erq_balance{text-align:right}.j88erq_balance small{color:var(--dsw-alias-label-secondary);font-size:10px;line-height:14px;display:block}.j88erq_composerButton:hover,.j88erq_plus:hover,.j88erq_balance:hover{background:var(--dsw-alias-interactive-bg-hover)}.j88erq_plus{align-items:center;padding:7px 3px;display:inline-flex}.j88erq_apiButton:active,.j88erq_composerButton:active,.j88erq_plus:active{transform:scale(.96)}.j88erq_hero{color:var(--dsw-alias-label-primary);letter-spacing:-1px;flex-direction:column;align-items:center;gap:15px;padding-bottom:26px;font-size:36px;font-weight:500;line-height:46px;width:auto!important;height:auto!important;display:flex!important}.j88erq_hero small{color:var(--dsw-alias-label-secondary);letter-spacing:0;font-size:13px;font-weight:400;line-height:22px}.j88erq_shell span:has(>.j88erq_hero){width:100%;height:auto}.j88erq_shell span:has(>.j88erq_hero)+span{display:none}.j88erq_page{box-sizing:border-box;background:radial-gradient(ellipse at 95% 0%,var(--dsw-alias-state-business-tertiary),transparent 45%),var(--dsw-alias-bg-base);height:100%;color:var(--dsw-alias-label-primary);padding:64px clamp(24px,5vw,80px) 32px;overflow:auto}.j88erq_pageHeading{margin-bottom:32px}.j88erq_pageHeading small{letter-spacing:2px;color:var(--dsw-alias-label-secondary);font-size:10px;line-height:20px}.j88erq_page h1{letter-spacing:-1px;margin:10px 0;font-size:32px;font-weight:500;line-height:42px}.j88erq_pageHeading p{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:22px}.j88erq_toolbar{flex-wrap:wrap;align-items:center;gap:12px;margin:14px 0;display:flex}.j88erq_toolbar input{flex:1;min-width:140px}.j88erq_stageGrid{grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin:32px 0;display:grid}.j88erq_stageCard,.j88erq_noteCard{text-align:left;cursor:pointer;color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 86%,transparent);backdrop-filter:blur(12px);border-radius:var(--dsw-radius-lg);box-shadow:var(--dsw-elevation-soft);border:0;padding:26px;transition:transform .18s,background .18s}.j88erq_stageCard{min-height:206px}.j88erq_stageCard>span{color:var(--dsw-alias-brand-primary);margin-bottom:24px;font-size:24px;font-weight:400;line-height:32px;display:block}.j88erq_stageCard h2,.j88erq_noteCard h2{margin:8px 0;font-size:16px;font-weight:500;line-height:24px}.j88erq_stageCard p,.j88erq_noteCard p{color:var(--dsw-alias-label-secondary);margin:8px 0;font-size:12px;line-height:20px}.j88erq_stageCard small,.j88erq_noteCard small{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:18px}.j88erq_stageCard:hover,.j88erq_noteCard:hover{background:var(--dsw-alias-state-business-tertiary);transform:translateY(-3px)}.j88erq_stageCard:active,.j88erq_noteCard:active{transform:scale(.985)}.j88erq_noteGrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin:24px 0;display:grid}.j88erq_noteCard p{white-space:pre-wrap;overflow-wrap:anywhere;max-height:100px;overflow:hidden}.j88erq_folderBar{flex-wrap:wrap;align-items:center;gap:8px;font-size:12px;line-height:20px;display:flex}.j88erq_folderChip{border:.5px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:var(--dsw-radius-sm);cursor:pointer;background:0 0;padding:6px 12px}.j88erq_storage{color:var(--dsw-alias-label-secondary);margin-top:32px;font-size:11px;line-height:18px}.j88erq_list{max-height:45vh;margin:14px 0;overflow:auto}.j88erq_skillRow{cursor:pointer;border-bottom:.5px solid var(--dsw-alias-border-l1);align-items:flex-start;gap:12px;padding:15px 12px;font-size:13px;line-height:20px;display:flex}.j88erq_skillRow:hover{background:var(--dsw-alias-interactive-bg-hover)}.j88erq_skillRow input{accent-color:var(--dsw-alias-brand-primary);margin-top:4px}.j88erq_skillRow span{min-width:0}.j88erq_skillRow strong{font-weight:500}.j88erq_skillRow small{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;margin-top:4px;font-size:12px;line-height:20px;display:block}.j88erq_path{font-size:10px!important}.j88erq_modal{width:min(700px,100vw - 32px);max-height:calc(100dvh - 48px);overflow:auto}.j88erq_modal textarea{box-sizing:border-box;resize:vertical;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);width:100%;min-height:180px;max-height:40vh;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:inherit;margin:16px 0;padding:14px;font-size:13px;line-height:22px;display:block}.j88erq_modal input{max-width:100%}.j88erq_hint{color:var(--dsw-alias-label-secondary);margin:12px 0;font-size:12px;line-height:21px}.j88erq_error{color:var(--dsw-alias-state-danger-primary);overflow-wrap:anywhere;margin:12px 0;font-size:12px;line-height:20px}.j88erq_empty{text-align:center;color:var(--dsw-alias-label-secondary);padding:48px 20px;font-size:13px;line-height:22px}.j88erq_fileButton{cursor:pointer;color:var(--dsw-alias-link);margin:14px 0;font-size:13px;line-height:22px;display:block}.j88erq_fileButton input{color:var(--dsw-alias-label-secondary);margin:8px 0;display:block}.j88erq_fileButton small{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:18px;display:block}.j88erq_shell button:focus-visible,.j88erq_shell summary:focus-visible,.j88erq_shell textarea:focus-visible{outline:2px solid var(--dsw-focus-ring-color);outline-offset:3px}@media (width<=1100px){.j88erq_stageGrid,.j88erq_noteGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.j88erq_header{padding:8px 16px}.j88erq_balance{display:none}}@media (width<=720px){.j88erq_page{padding:32px 20px}.j88erq_noteGrid{grid-template-columns:1fr}.j88erq_hero{font-size:28px;line-height:36px}.j88erq_apiButton{font-size:11px}.j88erq_header{gap:4px;padding:6px 10px}}@media (prefers-reduced-motion:reduce){.j88erq_shell *{transition:none!important}}.j88erq_shell [class$=_titleGroup]:has([class$=_previewBadge]){display:none}";
		const tagId = "@superk/dsh-client-ui-skin/Workspace.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@superk/dsh-client-ui-skin";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var Workspace_module_css_default = {
			"activeRow": "j88erq_activeRow",
			"apiButton": "j88erq_apiButton",
			"apiGroup": "j88erq_apiGroup",
			"balance": "j88erq_balance",
			"brandRow": "j88erq_brandRow",
			"composerButton": "j88erq_composerButton",
			"empty": "j88erq_empty",
			"error": "j88erq_error",
			"fileButton": "j88erq_fileButton",
			"folderBar": "j88erq_folderBar",
			"folderChip": "j88erq_folderChip",
			"footer": "j88erq_footer",
			"header": "j88erq_header",
			"hero": "j88erq_hero",
			"hint": "j88erq_hint",
			"list": "j88erq_list",
			"modal": "j88erq_modal",
			"more": "j88erq_more",
			"mutedButton": "j88erq_mutedButton",
			"nativeHeader": "j88erq_nativeHeader",
			"navRow": "j88erq_navRow",
			"newButton": "j88erq_newButton",
			"noteCard": "j88erq_noteCard",
			"noteGrid": "j88erq_noteGrid",
			"page": "j88erq_page",
			"pageHeading": "j88erq_pageHeading",
			"path": "j88erq_path",
			"plus": "j88erq_plus",
			"projectBody": "j88erq_projectBody",
			"projects": "j88erq_projects",
			"shell": "j88erq_shell",
			"sidebar": "j88erq_sidebar",
			"skillRow": "j88erq_skillRow",
			"stageCard": "j88erq_stageCard",
			"stageGrid": "j88erq_stageGrid",
			"storage": "j88erq_storage",
			"toolbar": "j88erq_toolbar"
		};
		//#endregion
		//#region src/client/Workspace.tsx
		/** Personal navigation and local-library views; services arrive as callbacks. */
		const stages = [
			"stage1",
			"stage2",
			"stage3",
			"stage4",
			"stage5",
			"stage6",
			"stage7",
			"stage8"
		];
		const hints = [
			"stageHint1",
			"stageHint2",
			"stageHint3",
			"stageHint4",
			"stageHint5",
			"stageHint6",
			"stageHint7",
			"stageHint8"
		];
		function Sidebar({ collapsed, toggleSidebar, startSession, selectPanel, usePanels, usePanelInfo, renderSlot, t, home, followSystem }) {
			const panels = usePanels((p) => p);
			const active = usePanelInfo((p) => p.activePanelId);
			const wide = !collapsed;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
				className: Workspace_module_css_default.sidebar,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Workspace_module_css_default.brandRow,
						children: [wide && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "SuperK" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: t("personal") })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
							label: t(wide ? "collapse" : "expand"),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								"aria-label": t(wide ? "collapse" : "expand"),
								onClick: toggleSidebar,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPanelLeftOutlineRegular, {})
							})
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: Workspace_module_css_default.newButton,
						onClick: () => startSession(),
						"aria-label": t("new"),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutlineRegular, {}), wide && t("new")]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: active === null ? Workspace_module_css_default.activeRow : Workspace_module_css_default.navRow,
						onClick: home,
						"aria-label": t("home"),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSparkleRegular, {}), wide && t("home")]
					}),
					panels.filter((p) => p.id.startsWith("superk-")).map((p) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: active === p.id ? Workspace_module_css_default.activeRow : Workspace_module_css_default.navRow,
						onClick: () => selectPanel(p.id),
						"aria-label": p.label,
						children: [renderSlot("sidebar.panellist", {
							size: 16,
							active: active === p.id
						}, { only: p.id }), wide && p.label]
					}, p.id)),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Workspace_module_css_default.projects,
						children: wide ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
							open: true,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("projects") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: Workspace_module_css_default.projectBody,
								children: renderSlot("sidebar.workspaces", {
									wide,
									expandSidebar: toggleSidebar
								})
							})]
						}) : renderSlot("sidebar.workspaces", {
							wide,
							expandSidebar: toggleSidebar
						})
					}),
					wide && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
						className: Workspace_module_css_default.more,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("more") }), panels.filter((p) => !p.id.startsWith("superk-")).map((p) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							className: Workspace_module_css_default.navRow,
							onClick: () => selectPanel(p.id),
							children: [renderSlot("sidebar.panellist", {
								size: 16,
								active: active === p.id
							}, { only: p.id }), p.label]
						}, p.id))]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Workspace_module_css_default.footer,
						children: [
							wide && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: Workspace_module_css_default.mutedButton,
								onClick: followSystem,
								children: t("theme")
							}) }),
							renderSlot("sidebar.settings", { wide }),
							renderSlot("sidebar.footer.action", { wide })
						]
					})
				]
			});
		}
		function Hero({ className, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: `${className ?? ""} ${Workspace_module_css_default.hero}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("hero") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: t("heroHint") })]
			});
		}
		function NoMark() {
			return null;
		}
		function Name() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "SuperK" });
		}
		function PanelIcon({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, { size });
		}
		function Header(props) {
			const { t, loadBalance, openAPI } = props;
			const [balance, setBalance] = (0, react.useState)();
			const [error, setError] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(false);
			const refresh = async () => {
				setBusy(true);
				try {
					setBalance(await loadBalance());
					setError("");
				} catch (e) {
					setError(String(e instanceof Error ? e.message : e));
				} finally {
					setBusy(false);
				}
			};
			(0, react.useEffect)(() => {
				refresh();
				const id = window.setInterval(() => {
					if (document.visibilityState === "visible") refresh();
				}, 3e4);
				return () => window.clearInterval(id);
			}, [loadBalance]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Workspace_module_css_default.apiGroup,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
					label: `${t("balanceHint")} ${error}`,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: Workspace_module_css_default.balance,
						onClick: () => void refresh(),
						disabled: busy,
						children: [busy ? t("querying") : balance ? balance.balance_infos.map((b) => `${b.currency === "CNY" ? "¥" : "$"}${b.total_balance}`).join(" / ") : t("noBalance"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: balance ? new Date(balance.checkedAt).toLocaleTimeString() : "DeepSeek API" })]
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: Workspace_module_css_default.apiButton,
					onClick: openAPI,
					children: t("api")
				})]
			});
		}
		function errorMessage(e) {
			return e instanceof Error ? e.message : String(e);
		}
		function Skills(props) {
			const { t, loadSkills, loadSkillContent, importSkill, insert } = props;
			const [skills, setSkills] = (0, react.useState)([]), [selected, setSelected] = (0, react.useState)([]), [query, setQuery] = (0, react.useState)(""), [error, setError] = (0, react.useState)(""), [busy, setBusy] = (0, react.useState)(false);
			const [open, setOpen] = (0, react.useState)(!props.composer), [adding, setAdding] = (0, react.useState)(!!props.initialImport), [content, setContent] = (0, react.useState)(""), [path, setPath] = (0, react.useState)("");
			const refresh = async () => {
				setBusy(true);
				try {
					const next = await loadSkills();
					setSkills(next);
					setSelected((s) => s.filter((path) => next.some((k) => k.path === path)));
					setError("");
				} catch (e) {
					setError(errorMessage(e));
				} finally {
					setBusy(false);
				}
			};
			(0, react.useEffect)(() => {
				if (open || adding) refresh();
			}, [open, adding]);
			const addToDraft = async () => {
				setBusy(true);
				try {
					insert((await loadSkillContent(selected)).map((s) => `\n[本轮 Skill：${s.name}]\n来源：${s.path}\n请遵循以下 Skill 指令，按任务需要依次或组合使用；说明每项实际使用情况。\n${s.content}\n[/Skill]\n`).join("\n"));
					setOpen(false);
					setSelected([]);
					setError("");
				} catch (e) {
					setError(errorMessage(e));
				} finally {
					setBusy(false);
				}
			};
			const body = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: Workspace_module_css_default.hint,
					children: t("skillHint")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: Workspace_module_css_default.toolbar,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
							"aria-label": t("search"),
							placeholder: t("search"),
							value: query,
							onChange: (e) => setQuery(e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "ghost",
							onClick: () => void refresh(),
							disabled: busy,
							children: t("refresh")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: () => setAdding(true),
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {}), t("plusSkill")]
						})
					]
				}),
				error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					role: "alert",
					className: Workspace_module_css_default.error,
					children: error
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: Workspace_module_css_default.list,
					children: busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("loading") }) : !skills.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: Workspace_module_css_default.empty,
						children: t("skillEmpty")
					}) : skills.filter((s) => `${s.name} ${s.description}`.toLowerCase().includes(query.toLowerCase())).map((s) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						className: Workspace_module_css_default.skillRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: selected.includes(s.path),
							onChange: (e) => {
								if (e.target.checked && selected.length >= 10) {
									setError(t("skillLimit"));
									return;
								}
								setSelected(e.target.checked ? [...selected, s.path] : selected.filter((k) => k !== s.path));
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: s.name }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: s.description }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", {
								className: Workspace_module_css_default.path,
								children: s.path
							})
						] })]
					}, s.path))
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: Workspace_module_css_default.hint,
					children: t("drafts")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "primary",
					disabled: !selected.length || busy,
					onClick: () => void addToDraft(),
					children: [
						t("select"),
						" ",
						selected.length || ""
					]
				})
			] });
			const importDialog = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: adding,
				onClose: () => setAdding(false),
				title: t("plusSkill"),
				closeLabel: t("close"),
				className: Workspace_module_css_default.modal,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: Workspace_module_css_default.hint,
						children: t("importHint")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileText, {
						t,
						onText: setContent,
						onError: setError
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
						"aria-label": t("content"),
						placeholder: t("content"),
						value: content,
						onChange: (e) => setContent(e.target.value)
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
						"aria-label": t("path"),
						placeholder: t("path"),
						value: path,
						onChange: (e) => setPath(e.target.value)
					}),
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						className: Workspace_module_css_default.error,
						children: error
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						disabled: busy || !content.trim() && !path.trim(),
						variant: "primary",
						onClick: () => {
							setBusy(true);
							importSkill(content, path.trim() || void 0).then(() => {
								setContent("");
								setPath("");
								setAdding(false);
								refresh();
							}).catch((e) => setError(errorMessage(e))).finally(() => setBusy(false));
						},
						children: t("import")
					})
				]
			});
			return props.composer ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: Workspace_module_css_default.composerButton,
					onClick: () => setOpen(true),
					children: t("skillSelect")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
					label: t("plusSkill"),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: Workspace_module_css_default.plus,
						"aria-label": t("plusSkill"),
						onClick: () => setAdding(true),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, { size: 14 })
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
					open,
					onClose: () => setOpen(false),
					title: t("skills"),
					closeLabel: t("close"),
					className: Workspace_module_css_default.modal,
					children: body
				}),
				importDialog
			] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: Workspace_module_css_default.page,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Workspace_module_css_default.pageHeading,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: t("eyebrowSkills") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: t("skills") })]
					}),
					body,
					importDialog
				]
			});
		}
		function FileText({ t, onText, onError }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: Workspace_module_css_default.fileButton,
				children: [
					t("choose"),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "file",
						accept: ".md,.txt,.json,.csv,.yaml,.yml,.html,.js,.ts",
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							if (file.size > 1e6) {
								onError(t("textLimit"));
								return;
							}
							file.text().then((text) => {
								if (text.includes("\0")) throw new Error(t("textFile"));
								onText(text);
							}).catch((e) => onError(errorMessage(e)));
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: t("fileHint") })
				]
			});
		}
		function References(props) {
			const { t, loadNotes, readPath, insert } = props;
			const [open, setOpen] = (0, react.useState)(false), [adding, setAdding] = (0, react.useState)(false), [notes, setNotes] = (0, react.useState)([]), [selected, setSelected] = (0, react.useState)([]), [content, setContent] = (0, react.useState)(""), [path, setPath] = (0, react.useState)(""), [url, setUrl] = (0, react.useState)(""), [error, setError] = (0, react.useState)(""), [busy, setBusy] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				if (open) {
					setBusy(true);
					loadNotes().then(setNotes).catch((e) => setError(errorMessage(e))).finally(() => setBusy(false));
				}
			}, [open, loadNotes]);
			const append = (text) => {
				try {
					if (!text.trim()) throw new Error(t("empty"));
					insert(`\n[本轮参考资料]\n${text}\n[/参考资料]\n`);
					setOpen(false);
					setAdding(false);
					setContent("");
					setUrl("");
					setPath("");
					setSelected([]);
					setError("");
				} catch (e) {
					setError(errorMessage(e));
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: Workspace_module_css_default.composerButton,
					onClick: () => setOpen(true),
					children: t("reference")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
					label: t("plusReference"),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: Workspace_module_css_default.plus,
						"aria-label": t("plusReference"),
						onClick: () => setAdding(true),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, { size: 14 })
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
					open,
					onClose: () => setOpen(false),
					title: t("reference"),
					closeLabel: t("close"),
					className: Workspace_module_css_default.modal,
					children: [
						busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("loading") }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: Workspace_module_css_default.list,
							children: notes.length ? notes.map((n) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: Workspace_module_css_default.skillRow,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: selected.includes(n.id),
									onChange: (e) => setSelected(e.target.checked ? [...selected, n.id] : selected.filter((id) => id !== n.id))
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [n.title, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: n.folder || t("rootFolder") })] })]
							}, n.id)) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: Workspace_module_css_default.empty,
								children: t("noNotes")
							})
						}),
						error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							className: Workspace_module_css_default.error,
							children: error
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: Workspace_module_css_default.toolbar,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								onClick: () => setAdding(true),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {}), t("plusReference")]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								disabled: !selected.length,
								onClick: () => append(notes.filter((n) => selected.includes(n.id)).map((n) => `# ${n.title}\n${n.content}`).join("\n\n")),
								children: t("select")
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
					open: adding,
					onClose: () => setAdding(false),
					title: t("plusReference"),
					closeLabel: t("close"),
					className: Workspace_module_css_default.modal,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileText, {
							t,
							onText: setContent,
							onError: setError
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
							"aria-label": t("content"),
							placeholder: t("content"),
							value: content,
							onChange: (e) => setContent(e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: Workspace_module_css_default.toolbar,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								"aria-label": t("path"),
								placeholder: t("path"),
								value: path,
								onChange: (e) => setPath(e.target.value)
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								disabled: !path.trim() || busy,
								variant: "outline",
								onClick: () => {
									setBusy(true);
									readPath(path).then((v) => setContent(v.content)).catch((e) => setError(errorMessage(e))).finally(() => setBusy(false));
								},
								children: t("read")
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
							"aria-label": t("url"),
							placeholder: "https://…",
							value: url,
							onChange: (e) => setUrl(e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: Workspace_module_css_default.hint,
							children: t("urlHint")
						}),
						error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							className: Workspace_module_css_default.error,
							children: error
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: busy || !content.trim() && !url.trim(),
							onClick: () => {
								if (url && !/^https?:\/\/\S+$/i.test(url)) {
									setError(t("invalidURL"));
									return;
								}
								append([content, url ? `参考链接（尚未读取正文）：${url}` : ""].filter(Boolean).join("\n"));
							},
							children: t("select")
						})
					]
				})
			] });
		}
		function Library(props) {
			const { t, loadNotes, saveNote, loadFolders, createFolder, readPath, insert, flow } = props;
			const [notes, setNotes] = (0, react.useState)([]), [folders, setFolders] = (0, react.useState)([]), [folder, setFolder] = (0, react.useState)(flow ? null : ""), [query, setQuery] = (0, react.useState)(""), [edit, setEdit] = (0, react.useState)(), [creating, setCreating] = (0, react.useState)(false), [folderOpen, setFolderOpen] = (0, react.useState)(false), [folderName, setFolderName] = (0, react.useState)(""), [title, setTitle] = (0, react.useState)(""), [content, setContent] = (0, react.useState)(""), [area, setArea] = (0, react.useState)(""), [path, setPath] = (0, react.useState)(""), [error, setError] = (0, react.useState)(""), [busy, setBusy] = (0, react.useState)(false);
			const refresh = async () => {
				setBusy(true);
				try {
					const [n, f] = await Promise.all([loadNotes(), loadFolders()]);
					setNotes(n);
					setFolders(f);
					setError("");
				} catch (e) {
					setError(errorMessage(e));
				} finally {
					setBusy(false);
				}
			};
			(0, react.useEffect)(() => {
				refresh();
			}, [loadNotes, loadFolders]);
			const openEditor = (note) => {
				setEdit(note);
				setTitle(note?.title ?? "");
				setContent(note?.content ?? "");
				setArea(note?.folder ?? folder ?? "");
				setPath("");
				setCreating(true);
			};
			const visible = notes.filter((n) => (!folder || n.folder === folder || n.folder.startsWith(folder + "/")) && `${n.title} ${n.content}`.toLowerCase().includes(query.toLowerCase()));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: Workspace_module_css_default.page,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Workspace_module_css_default.pageHeading,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: t(flow ? "eyebrowFlow" : "eyebrowBrain") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: t(flow ? "flow" : "brain") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t(flow ? "flowHint" : "brainHint") })
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Workspace_module_css_default.toolbar,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								"aria-label": t("search"),
								placeholder: t("search"),
								value: query,
								onChange: (e) => setQuery(e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								onClick: () => setFolderOpen(true),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {}), t("folder")]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								onClick: () => openEditor(),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {}), t("create")]
							})
						]
					}),
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						className: Workspace_module_css_default.error,
						children: error
					}),
					flow && folder === null && !query ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Workspace_module_css_default.stageGrid,
						children: stages.map((s, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							className: Workspace_module_css_default.stageCard,
							onClick: () => setFolder(t(s)),
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: String(i + 1).padStart(2, "0") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t(s) }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t(hints[i]) }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
									notes.filter((n) => n.folder === t(s) || n.folder.startsWith(t(s) + "/")).length,
									" ",
									t("items")
								] })
							]
						}, s))
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Workspace_module_css_default.folderBar,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: Workspace_module_css_default.mutedButton,
								onClick: () => setFolder(flow ? null : ""),
								children: t(flow ? "back" : "all")
							}),
							folder && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: folder }),
							folders.filter((f) => !folder || f.startsWith(folder + "/")).map((f) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: Workspace_module_css_default.folderChip,
								onClick: () => setFolder(f),
								children: f
							}, f))
						]
					}), busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: Workspace_module_css_default.empty,
						children: t("loading")
					}) : !visible.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Workspace_module_css_default.empty,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, { size: 28 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("noNotes") })]
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Workspace_module_css_default.noteGrid,
						children: visible.map((n) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							className: Workspace_module_css_default.noteCard,
							onClick: () => openEditor(n),
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: n.folder || t("rootFolder") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: n.title }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: n.content.slice(0, 130) }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: new Date(n.updated).toLocaleDateString() })
							]
						}, n.id))
					})] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: Workspace_module_css_default.storage,
						children: t("stored")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: creating,
						onClose: () => setCreating(false),
						title: t(edit ? "edit" : "create"),
						closeLabel: t("close"),
						className: Workspace_module_css_default.modal,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								"aria-label": t("title"),
								placeholder: t("title"),
								value: title,
								onChange: (e) => setTitle(e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								"aria-label": t("area"),
								placeholder: t("area"),
								value: area,
								onChange: (e) => setArea(e.target.value),
								list: "superk-folders"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("datalist", {
								id: "superk-folders",
								children: [...stages.map((s) => t(s)), ...folders].map((f) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", { value: f }, f))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileText, {
								t,
								onText: setContent,
								onError: setError
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: Workspace_module_css_default.toolbar,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
									"aria-label": t("path"),
									placeholder: t("path"),
									value: path,
									onChange: (e) => setPath(e.target.value)
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									disabled: !path.trim() || busy,
									variant: "outline",
									onClick: () => {
										setBusy(true);
										readPath(path).then((v) => {
											setContent(v.content);
											if (!title) setTitle(v.title);
										}).catch((e) => setError(errorMessage(e))).finally(() => setBusy(false));
									},
									children: t("read")
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
								"aria-label": t("content"),
								placeholder: t("content"),
								value: content,
								onChange: (e) => setContent(e.target.value)
							}),
							error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: Workspace_module_css_default.error,
								children: error
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: Workspace_module_css_default.toolbar,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "primary",
										disabled: busy || !title.trim(),
										onClick: () => {
											setBusy(true);
											saveNote({
												...edit ? { id: edit.id } : {},
												title,
												folder: area,
												content
											}).then(() => {
												setCreating(false);
												refresh();
											}).catch((e) => setError(errorMessage(e))).finally(() => setBusy(false));
										},
										children: t("save")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "outline",
										disabled: !content.trim(),
										onClick: () => {
											try {
												insert(`\n[参考知识：${title}]\n${content}\n[/参考知识]\n`);
												setCreating(false);
											} catch (e) {
												setError(errorMessage(e));
											}
										},
										children: t("select")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "ghost",
										onClick: () => {
											const url = URL.createObjectURL(new Blob([`# ${title}\n\n${content}`], { type: "text/markdown" }));
											const a = document.createElement("a");
											a.href = url;
											a.download = `${title || "SuperK"}.md`;
											a.click();
											setTimeout(() => URL.revokeObjectURL(url), 1e3);
										},
										children: t("export")
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: folderOpen,
						onClose: () => setFolderOpen(false),
						title: t("folder"),
						closeLabel: t("close"),
						className: Workspace_module_css_default.modal,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("folderHint") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								"aria-label": t("folderName"),
								value: folderName,
								onChange: (e) => setFolderName(e.target.value)
							}),
							error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: Workspace_module_css_default.error,
								children: error
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								disabled: !folderName.trim() || busy,
								onClick: () => {
									setBusy(true);
									createFolder(folderName).then(() => {
										setFolderOpen(false);
										setFolderName("");
										refresh();
									}).catch((e) => setError(errorMessage(e))).finally(() => setBusy(false));
								},
								children: t("save")
							})
						]
					})
				]
			});
		}
		function SettingsLauncher({ wide, openSettings, bind, t }) {
			(0, react.useEffect)(() => bind(openSettings), [bind, openSettings]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
				variant: "ghost",
				onClick: openSettings,
				"aria-label": t("settings"),
				children: wide ? t("settings") : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSparkleRegular, {})
			});
		}
		//#endregion
		//#region src/client/palette.ts
		const BLUE = {
			light: "#2879ed",
			dark: "#aa87f5"
		};
		/** macOS system colors laid over the Harness alias tokens. */
		const MAC_PALETTE = {
			"--dsw-alias-bg-base": {
				light: "#ffffff",
				dark: "#101015"
			},
			"--dsw-alias-bg-layer-1": {
				light: "#ffffff",
				dark: "#18181f"
			},
			"--dsw-alias-bg-layer-2": {
				light: "#ffffff",
				dark: "#202029"
			},
			"--dsw-alias-bg-layer-3": {
				light: "#ffffff",
				dark: "#30303c"
			},
			"--dsw-alias-bg-overlay": {
				light: "#ececee",
				dark: "#30303c"
			},
			"--dsw-alias-bg-module-platform": {
				light: "#f5f5f7",
				dark: "#202029"
			},
			"--dsw-alias-bg-document-preview": {
				light: "#f5f5f7",
				dark: "#101015"
			},
			"--dsw-alias-bg-multi-select": {
				light: "#f5f5f7",
				dark: "#202029"
			},
			"--dsw-alias-border-l1": {
				light: "rgba(0, 0, 0, 0.05)",
				dark: "rgba(255, 255, 255, 0.06)"
			},
			"--dsw-alias-border-l2": {
				light: "rgba(0, 0, 0, 0.1)",
				dark: "rgba(255, 255, 255, 0.12)"
			},
			"--dsw-alias-label-primary": {
				light: "#1d1d1f",
				dark: "#f5f5f7"
			},
			"--dsw-alias-label-secondary": {
				light: "#6e6e73",
				dark: "#a1a1a6"
			},
			"--dsw-alias-label-tertiary": {
				light: "#a1a1a6",
				dark: "#6e6e73"
			},
			"--dsw-alias-brand-primary": BLUE,
			"--dsw-alias-button-primary-fill": BLUE,
			"--dsw-alias-button-primary-hover": {
				light: "#1766d5",
				dark: "#ba9bf8"
			},
			"--dsw-alias-button-primary-dimmed": {
				light: "rgba(0, 122, 255, 0.35)",
				dark: "rgba(170, 135, 245, 0.4)"
			},
			"--dsw-alias-label-primary-inverted": {
				light: "#ffffff",
				dark: "#ffffff"
			},
			"--dsw-alias-link": BLUE,
			"--dsw-alias-state-business-primary": BLUE,
			"--dsw-alias-state-business-tertiary": {
				light: "rgba(0, 122, 255, 0.12)",
				dark: "rgba(170, 135, 245, 0.16)"
			},
			"--dsw-focus-ring-color": BLUE,
			"--dsw-alias-interactive-bg-hover": {
				light: "rgba(0, 0, 0, 0.05)",
				dark: "rgba(255, 255, 255, 0.07)"
			},
			"--dsw-alias-interactive-bg-active": {
				light: "rgba(0, 0, 0, 0.09)",
				dark: "rgba(255, 255, 255, 0.12)"
			},
			"--dsw-alias-interactive-bg-hover-accent": {
				light: "rgba(0, 0, 0, 0.12)",
				dark: "rgba(255, 255, 255, 0.18)"
			},
			"--dsw-alias-interactive-bg-hover-solid": {
				light: "#f0f0f2",
				dark: "#30303c"
			},
			"--dsw-specific-sidebar-fill": {
				light: "#f2f5fa",
				dark: "#15151c"
			},
			"--dsw-specific-bubble": {
				light: "#ececf0",
				dark: "#30303c"
			},
			"--dsw-specific-input-major": {
				light: "#ffffff",
				dark: "#202029"
			},
			"--dsw-specific-selector": {
				light: "#ececf0",
				dark: "#30303c"
			}
		};
		//#endregion
		//#region src/client/locales.ts
		/** Copy owned by the personal skin. */
		const zh = {
			textLimit: "请选择小于 1 MB 的文本文件",
			textFile: "请选择文本文件",
			invalidURL: "请输入完整的 http 或 https 链接",
			items: "份内容",
			eyebrowFlow: "PRODUCT JOURNEY",
			eyebrowBrain: "SECOND BRAIN",
			eyebrowSkills: "TOOLS",
			settings: "设置",
			brand: "SuperK",
			personal: "个人工作台",
			home: "工作台",
			new: "新对话",
			projects: "项目与会话",
			more: "更多工具",
			collapse: "收起侧栏",
			expand: "展开侧栏",
			flow: "产品 0 → 1",
			flowHint: "从问题到迭代，让每一份思考找到位置",
			brain: "外置大脑",
			brainHint: "收集、整理，再把知识带回工作",
			skills: "Skill 工具台",
			api: "API / 模型设置",
			apiHint: "选择服务商、配置 API Key 和切换模型",
			balance: "DeepSeek API 余额",
			balanceHint: "使用 DEEPSEEK_API_KEY 查询；每 30 秒刷新，不代表其他服务商或订阅额度",
			refresh: "刷新",
			querying: "查询中",
			noBalance: "余额暂不可用",
			hero: "把想法，推进一步。",
			heroHint: "在这里思考、创作，把知识变成行动",
			skillSelect: "选择 Skill",
			reference: "引用知识",
			plusSkill: "添加 Skill",
			plusReference: "添加引用",
			skillHint: "只显示本机实际存在的 Skill，可多选。加入本轮后先检查草稿，再发送。",
			skillEmpty: "还没有可用 Skill，点击 ＋ 导入 SKILL.md",
			skillAdded: "已加入本轮指令",
			skillLimit: "一次最多选择 10 个 Skill",
			select: "加入本轮",
			close: "关闭",
			cancel: "取消",
			loading: "正在读取",
			retry: "重试",
			search: "搜索名称或内容",
			noResults: "没有符合条件的内容",
			noNotes: "还没有笔记，创建一份或导入文本开始积累",
			create: "新建笔记",
			folder: "新建文件夹",
			folderHint: "例如：用户研究/访谈，可自由创建子文件夹",
			all: "全部内容",
			title: "标题",
			content: "正文 / 粘贴内容",
			save: "保存",
			saved: "已保存到本机",
			edit: "编辑笔记",
			choose: "选择文件",
			fileHint: "支持文本、Markdown；PDF、图片等使用对话原生附件 ＋",
			path: "本地文件或文件夹路径",
			read: "读取路径",
			url: "网页链接",
			urlHint: "链接将作为来源加入草稿，未自动抓取网页正文",
			import: "导入 Skill",
			importHint: "上传 SKILL.md、粘贴完整内容，或读取本地文件路径；同名文件不会覆盖",
			empty: "内容不能为空",
			folderName: "文件夹名称",
			rootFolder: "未分类",
			area: "所属文件夹",
			back: "返回分类",
			stage1: "问题定义",
			stage2: "用户研究",
			stage3: "竞品分析",
			stage4: "立项与优先级",
			stage5: "产品设计",
			stage6: "开发与验证",
			stage7: "上线与迭代",
			stage8: "其他",
			stageHint1: "场景 · 问题 · 目标",
			stageHint2: "访谈 · 观察 · 证据",
			stageHint3: "对比 · 差异 · 机会",
			stageHint4: "取舍 · 范围 · 决策",
			stageHint5: "流程 · 原型 · PRD",
			stageHint6: "实验 · 评测 · 验证",
			stageHint7: "发布 · 指标 · 复盘",
			stageHint8: "暂存 · 灵感 · 待整理",
			stored: "本机保存 · 保留历史版本",
			drafts: "所选内容会插入当前对话草稿，不会自动发送",
			startFirst: "先打开项目中的对话，再引用到当前工作",
			theme: "跟随系统外观",
			export: "导出 Markdown"
		};
		const en = { ...zh };
		//#endregion
		//#region src/client/index.ts
		const inject = [
			"slots",
			"theme",
			"locale",
			"layout",
			"uiWorkspace",
			"shortcuts",
			"sessions",
			"conversation"
		];
		async function api(action, data) {
			const response = await fetch(`/api/superk?action=${action}`, {
				method: data ? "POST" : "GET",
				...data ? {
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data)
				} : {},
				credentials: "same-origin",
				signal: AbortSignal.timeout(15e3)
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "读取失败，请重试");
			return result.value;
		}
		function install(ctx) {
			ctx.effect(() => ctx.theme.overrideTokens("@superk/dsh-client-ui-skin", MAC_PALETTE), "superk: theme");
			ctx.effect(() => ctx.locale.register("superk", {
				zh,
				en
			}), "superk: copy");
			let lastSession;
			let settingsOpen;
			const bind = (open) => {
				settingsOpen = open;
				return () => {
					if (settingsOpen === open) settingsOpen = void 0;
				};
			};
			const openAPI = () => {
				settingsOpen?.();
			};
			const followSystem = () => ctx.theme.setTheme("system");
			const actions = (sessionId) => ({
				loadSkills: () => api("skills"),
				loadSkillContent: (paths) => api("skill-content", { paths }),
				importSkill: (content, path) => api("import-skill", {
					content,
					...path ? { path } : {}
				}),
				loadNotes: () => api("notes"),
				saveNote: (note) => api("save-note", note),
				loadFolders: () => api("folders"),
				createFolder: (name) => api("folder", { name }),
				readPath: (path) => api("read-path", { path }),
				loadBalance: () => api("balance"),
				openAPI,
				followSystem,
				insert: (text) => {
					const id = sessionId ?? lastSession;
					const actx = id ? ctx.sessions.scope(id) : void 0;
					if (!actx) throw new Error(zh.startFirst);
					const input = ctx.conversation.input.for(actx);
					const { draftRev } = input.state.getSnapshot();
					if (!actx.bail(actx, "slash/input-insert-text", {
						text,
						span: {
							start: 0,
							end: 0,
							draftRev
						}
					})) throw new Error("当前对话暂时不能接收内容，请稍后重试");
					ctx.layout.selectPanel(null);
					input.focus();
				}
			});
			const common = actions();
			const panels = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)([]);
			const sync = () => panels.set(ctx.slots.entriesOfSlot("sidebar.panellist").map(({ options }) => ({
				id: options.id,
				order: options.order ?? 0,
				label: (0, _deepseek_ai_dsh_client_ui_slots.resolveSlotLabel)(options.label) ?? String(options.id)
			})).sort((a, b) => a.order - b.order));
			ctx.effect(() => ctx.slots.subscribe("sidebar.panellist", sync), "superk: navigation");
			ctx.effect(() => ctx.locale.subscribe(sync), "superk: navigation copy");
			ctx.slots.inject("sidebar", () => ctx.slots.register({
				name: "sidebar",
				priority: -50,
				locale: "superk",
				children: {
					"sidebar.brand.mark": {
						kind: "single",
						scope: "root"
					},
					"sidebar.brand.name": {
						kind: "single",
						scope: "root"
					},
					"sidebar.toggle.badge": {
						kind: "single",
						scope: "root"
					},
					"sidebar.panellist": {
						kind: "list",
						scope: "root"
					},
					"sidebar.workspaces": {
						kind: "single",
						scope: "root"
					},
					"sidebar.settings": {
						kind: "single",
						scope: "root"
					},
					"sidebar.footer.action": {
						kind: "list",
						scope: "root"
					}
				},
				inject: () => ({
					startSession: () => ctx.uiWorkspace.startSession(),
					toggleSidebar: () => ctx.layout.toggleSidebar(),
					selectPanel: (id) => ctx.layout.selectPanel(id),
					home: () => ctx.layout.selectPanel(null),
					openAPI,
					followSystem,
					hooks: {
						panels,
						shortcuts: ctx.shortcuts.catalog
					}
				})
			}, Sidebar));
			ctx.slots.inject("settings.launcher", () => ctx.slots.register({
				name: "settings.launcher",
				priority: -50,
				locale: "superk",
				inject: () => ({ bind })
			}, SettingsLauncher));
			ctx.slots.inject("sidebar.brand.mark", () => ctx.slots.register({
				name: "sidebar.brand.mark",
				priority: -50
			}, NoMark));
			ctx.slots.inject("sidebar.brand.name", () => ctx.slots.register({
				name: "sidebar.brand.name",
				priority: -50
			}, Name));
			ctx.slots.inject("conversation.hero.brand.mark", () => ctx.slots.register({
				name: "conversation.hero.brand.mark",
				priority: -50,
				locale: "superk"
			}, Hero));
			ctx.slots.inject("conversation.header.leading", () => ctx.slots.register({
				name: "conversation.header.leading",
				priority: -50,
				locale: "superk",
				inject: () => common
			}, Header));
			for (const [key, label, order] of [
				[
					"superk-brain",
					"brain",
					10
				],
				[
					"superk-flow",
					"flow",
					20
				],
				[
					"superk-skills",
					"skills",
					30
				]
			]) {
				ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
					name: "sidebar.panellist",
					id: key,
					order,
					label: () => ctx.locale.bind("superk")(label)
				}, PanelIcon));
				ctx.slots.inject("main", () => ctx.slots.register({
					name: "main",
					key,
					locale: "superk",
					inject: () => ({
						...common,
						...key === "superk-flow" ? { flow: true } : {}
					})
				}, key === "superk-skills" ? Skills : Library));
			}
			ctx.slots.inject("conversation.input.left", function* () {
				yield ctx.slots.register({
					name: "conversation.input.left",
					id: "superk-skills",
					order: 10,
					locale: "superk",
					inject: (id) => {
						lastSession = id;
						return {
							...actions(id),
							composer: true
						};
					}
				}, Skills);
				yield ctx.slots.register({
					name: "conversation.input.left",
					id: "superk-references",
					order: 20,
					locale: "superk",
					inject: (id) => actions(id)
				}, References);
			});
			sync();
			ctx.effect(() => {
				const previous = document.title;
				document.body.classList.add(Workspace_module_css_default.shell);
				const pin = () => {
					if (document.title !== "SuperK") document.title = "SuperK";
				};
				pin();
				const observer = new MutationObserver(pin);
				observer.observe(document.head, {
					childList: true,
					subtree: true,
					characterData: true
				});
				return () => {
					observer.disconnect();
					document.title = previous;
					document.body.classList.remove(Workspace_module_css_default.shell);
				};
			}, "superk: page identity");
		}
		function apply(ctx) {
			try {
				install(ctx);
			} catch (error) {
				console.error("SuperK skin activation:", error);
				throw error;
			}
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map