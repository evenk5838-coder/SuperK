const state = {
  meta: null,
  products: [],
  current: null,
  docs: [],
  docName: null,
  previewOpen: localStorage.getItem("superk.preview") !== "closed",
  sending: false,
}

const $ = (id) => document.getElementById(id)

async function api(url, options) {
  const response = await fetch(url, options)
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || "请求失败")
  return data
}

function postJson(url, body) {
  return api(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function modeTitle(id) {
  return state.meta.modes.find((mode) => mode.id === id)?.title || id
}

function renderSidebar() {
  $("sidebar-empty").classList.toggle("hidden", state.products.length > 0)
  $("product-list").innerHTML = state.products
    .map((product) => {
      const active = state.current?.id === product.id ? " active" : ""
      return `<li><button type="button" class="product-row${active}" data-id="${product.id}"><strong>${escapeHtml(product.name)}</strong><span>${escapeHtml(product.stageTitle)}</span></button></li>`
    })
    .join("")
}

function renderToolbar() {
  const product = state.current
  $("product-title").textContent = product ? product.name : "SuperK"
  $("mode-seg").classList.toggle("hidden", !product)
  $("toggle-preview").classList.toggle("hidden", !product)
  $("toggle-preview").classList.toggle("on", state.previewOpen)
  if (!product) return
  $("mode-seg").innerHTML = state.meta.modes
    .map((mode) => `<button type="button" role="radio" aria-checked="${mode.id === product.mode}" class="${mode.id === product.mode ? "on" : ""}" data-mode="${mode.id}" title="${escapeHtml(mode.detail)}">${mode.title}</button>`)
    .join("")
}

function renderTranscript() {
  const transcript = $("transcript")
  transcript.innerHTML = state.current.messages
    .map((message) => message.role === "user"
      ? `<div class="message"><div class="bubble">${escapeHtml(message.text)}</div></div>`
      : `<div class="note">${escapeHtml(message.text)}</div>`)
    .join("")
  transcript.scrollTop = transcript.scrollHeight
}

function composerHint(product) {
  const stage = state.meta.stages[product.stageIndex].title
  if (product.mode === "confirm") return `当前阶段：${stage} · 做完回复「继续」`
  if (product.mode === "single") return `只做「${stage}」 · 右键左侧产品可换阶段`
  return `当前阶段：${stage} · 自动推进等 Skill 接入`
}

function render() {
  const product = state.current
  renderSidebar()
  renderToolbar()
  $("empty").classList.toggle("hidden", Boolean(product))
  $("chat").classList.toggle("hidden", !product)
  $("preview").classList.toggle("hidden", !product || !state.previewOpen)
  if (!product) return
  renderTranscript()
  $("composer-hint").textContent = composerHint(product)
}

function renderMarkdown(source) {
  const inline = (text) => escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/（还没有）|\(还没有\)/g, '<span class="muted">还没有</span>')
  const out = []
  let list = false
  for (const raw of source.split("\n")) {
    const line = raw.trimEnd()
    const heading = line.match(/^(#{1,3})\s+(.*)$/)
    const item = line.match(/^\s*[-*]\s+(.*)$/)
    if (!item && list) {
      out.push("</ul>")
      list = false
    }
    if (heading) out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`)
    else if (item) {
      if (!list) out.push("<ul>")
      list = true
      out.push(`<li>${inline(item[1])}</li>`)
    } else if (line.trim()) out.push(`<p>${inline(line)}</p>`)
  }
  if (list) out.push("</ul>")
  return out.join("")
}

async function loadDocs() {
  if (!state.current) return
  state.docs = await api(`/api/products/${state.current.id}/docs`)
  const stageDoc = state.meta.stages[state.current.stageIndex].doc
  if (!state.docs.some((doc) => doc.name === state.docName)) {
    state.docName = state.docs.some((doc) => doc.name === stageDoc) ? stageDoc : state.docs[0]?.name || null
  }
  const order = state.meta.stages.map((stage) => stage.doc)
  const sorted = [...state.docs].sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
  $("doc-tabs").innerHTML = sorted
    .map((doc) => `<button type="button" class="${doc.name === state.docName ? "on" : ""}" data-doc="${escapeHtml(doc.name)}">${escapeHtml(doc.name.replace(/\.md$/, ""))}</button>`)
    .join("")
  if (!state.docName) {
    $("doc-view").innerHTML = '<p class="muted">还没有文档</p>'
    return
  }
  const doc = await api(`/api/products/${state.current.id}/docs?name=${encodeURIComponent(state.docName)}`)
  $("doc-view").innerHTML = renderMarkdown(doc.content)
}

async function refreshList() {
  state.products = await api("/api/products")
  renderSidebar()
}

async function openProduct(id) {
  state.current = await api(`/api/products/${id}`)
  state.docName = null
  render()
  await loadDocs()
  $("draft").focus()
}

async function afterChange(product) {
  state.current = product
  render()
  await Promise.all([loadDocs(), refreshList()])
}

function setPreview(open) {
  state.previewOpen = open
  localStorage.setItem("superk.preview", open ? "open" : "closed")
  render()
}

function autosize() {
  const draft = $("draft")
  draft.style.height = "auto"
  draft.style.height = `${Math.min(draft.scrollHeight, 200)}px`
  $("send").disabled = !draft.value.trim() || state.sending
}

async function send() {
  const text = $("draft").value.trim()
  if (!text || !state.current || state.sending) return
  state.sending = true
  $("draft").value = ""
  autosize()
  try {
    await afterChange(await postJson(`/api/products/${state.current.id}/messages`, { text }))
  } catch (error) {
    $("draft").value = text
    $("composer-hint").textContent = error.message
  } finally {
    state.sending = false
    autosize()
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(",")[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function uploadFiles(files) {
  if (!state.current) return
  for (const file of files) {
    try {
      const product = await postJson(`/api/products/${state.current.id}/evidence`, {
        kind: "file",
        filename: file.name,
        dataBase64: await fileToBase64(file),
      })
      await afterChange(product)
    } catch (error) {
      $("composer-hint").textContent = `${file.name}：${error.message}`
    }
  }
}

function closeMenu() {
  $("context-menu").classList.add("hidden")
}

function openMenu(product, x, y) {
  const single = product.mode === "single"
  const stages = state.meta.stages
    .map((stage, index) => `<button type="button" class="${index === product.stageIndex ? "check" : "indent"}" data-menu="stage" data-index="${index}" ${single ? "" : "disabled"}>${stage.title}</button>`)
    .join("")
  const menu = $("context-menu")
  menu.innerHTML = `
    <div class="label">${single ? "切换阶段" : "切换阶段（仅「只做当前阶段」可用）"}</div>
    ${stages}
    <hr>
    <button type="button" class="danger" data-menu="delete">删除「${escapeHtml(product.name)}」</button>`
  menu.dataset.id = product.id
  menu.classList.remove("hidden")
  const { width, height } = menu.getBoundingClientRect()
  menu.style.left = `${Math.min(x, innerWidth - width - 6)}px`
  menu.style.top = `${Math.min(y, innerHeight - height - 6)}px`
}

async function deleteProduct(id) {
  const product = state.products.find((item) => item.id === id)
  if (!product || !confirm(`删除「${product.name}」？\n\n它的对话和 Markdown 都会一起删掉。`)) return
  await api(`/api/products/${id}`, { method: "DELETE" })
  if (state.current?.id === id) state.current = null
  render()
  await refreshList()
}

function renderModeOptions() {
  $("mode-options").innerHTML = state.meta.modes
    .map((mode) => `
      <label>
        <input type="radio" name="mode" value="${mode.id}" ${mode.id === state.meta.defaultMode ? "checked" : ""}>
        <span>${mode.title}</span>
        <small>${mode.detail}</small>
      </label>`)
    .join("")
}

function openSheet(open) {
  $("sheet").classList.toggle("hidden", !open)
  $("create-error").textContent = ""
  if (!open) return
  $("create-form").reset()
  renderModeOptions()
  $("product-name").focus()
}

$("product-list").addEventListener("click", (event) => {
  const row = event.target.closest(".product-row")
  if (row) openProduct(row.dataset.id)
})

$("product-list").addEventListener("contextmenu", (event) => {
  const row = event.target.closest(".product-row")
  if (!row) return
  event.preventDefault()
  const product = state.products.find((item) => item.id === row.dataset.id)
  if (product) openMenu(product, event.clientX, event.clientY)
})

$("context-menu").addEventListener("click", async (event) => {
  const item = event.target.closest("[data-menu]")
  if (!item || item.disabled) return
  const id = $("context-menu").dataset.id
  closeMenu()
  if (item.dataset.menu === "delete") await deleteProduct(id)
  if (item.dataset.menu === "stage") {
    try {
      if (state.current?.id !== id) await openProduct(id)
      state.docName = null
      await afterChange(await postJson(`/api/products/${id}/stage`, { stageIndex: Number(item.dataset.index) }))
    } catch (error) {
      $("composer-hint").textContent = error.message
    }
  }
})

document.addEventListener("click", (event) => {
  if (!event.target.closest("#context-menu")) closeMenu()
  if (event.target.closest('[data-action="open-new"]')) openSheet(true)
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu()
    openSheet(false)
  }
  if (event.metaKey && event.key.toLowerCase() === "n") {
    event.preventDefault()
    openSheet(true)
  }
})

$("new-product").addEventListener("click", () => openSheet(true))
$("cancel-create").addEventListener("click", () => openSheet(false))
$("sheet").addEventListener("mousedown", (event) => {
  if (event.target.id === "sheet") openSheet(false)
})

$("create-form").addEventListener("submit", async (event) => {
  event.preventDefault()
  const selected = document.querySelector('input[name="mode"]:checked')
  try {
    const product = await postJson("/api/products", {
      name: $("product-name").value,
      idea: $("product-idea").value,
      mode: selected?.value || state.meta.defaultMode,
    })
    openSheet(false)
    await refreshList()
    await openProduct(product.id)
  } catch (error) {
    $("create-error").textContent = error.message
  }
})

$("mode-seg").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-mode]")
  if (!button || button.dataset.mode === state.current.mode) return
  await afterChange(await postJson(`/api/products/${state.current.id}/mode`, { mode: button.dataset.mode }))
})

$("toggle-preview").addEventListener("click", () => setPreview(!state.previewOpen))
$("close-preview").addEventListener("click", () => setPreview(false))

$("doc-tabs").addEventListener("click", async (event) => {
  const tab = event.target.closest("[data-doc]")
  if (!tab) return
  state.docName = tab.dataset.doc
  await loadDocs()
})

$("draft").addEventListener("input", autosize)
$("draft").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault()
    send()
  }
})
$("composer").addEventListener("submit", (event) => {
  event.preventDefault()
  send()
})

$("attach").addEventListener("click", () => $("file-input").click())
$("file-input").addEventListener("change", async () => {
  await uploadFiles([...$("file-input").files])
  $("file-input").value = ""
})

let dragDepth = 0
$("chat").addEventListener("dragenter", (event) => {
  if (!event.dataTransfer.types.includes("Files")) return
  dragDepth += 1
  $("drop-veil").classList.remove("hidden")
})
$("chat").addEventListener("dragleave", () => {
  dragDepth = Math.max(0, dragDepth - 1)
  if (!dragDepth) $("drop-veil").classList.add("hidden")
})
$("chat").addEventListener("dragover", (event) => event.preventDefault())
$("chat").addEventListener("drop", async (event) => {
  event.preventDefault()
  dragDepth = 0
  $("drop-veil").classList.add("hidden")
  await uploadFiles([...event.dataTransfer.files])
})

async function boot() {
  state.meta = await api("/api/meta")
  await refreshList()
  if (state.products[0]) await openProduct(state.products[0].id)
  else render()
}

boot()
