const widgetSource = "https://vlibras.gov.br/app";
const pluginSource = `${widgetSource}/vlibras-plugin.js`;

function buildFloatingButton() {
  if (document.querySelector(".libras-floating-button")) {
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "libras-floating-button";
  button.setAttribute("aria-label", "Abrir tradutor em Libras");
  button.setAttribute("title", "Abrir tradutor em Libras");
  button.innerHTML = `
    <img src="./images/libras.gif" alt="Tradutor em Libras" class="libras-floating-button__image">
    <span class="libras-floating-button__text">Libras</span>
  `;

  button.addEventListener("click", () => {
    const nativeButton = document.querySelector("[vw-access-button]");

    if (nativeButton) {
      nativeButton.click();
    }
  });

  document.body.appendChild(button);
}

function buildWidgetRoot() {
  if (document.querySelector("[vw].enabled")) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.setAttribute("vw", "");
  wrapper.className = "enabled";
  wrapper.innerHTML = `
    <div vw-access-button></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  `;

  document.body.appendChild(wrapper);
}

function hideNativeAccessButton() {
  const nativeButton = document.querySelector("[vw-access-button]");

  if (nativeButton) {
    nativeButton.setAttribute("aria-hidden", "true");
    nativeButton.style.opacity = "0";
    nativeButton.style.pointerEvents = "none";
    nativeButton.style.width = "1px";
    nativeButton.style.height = "1px";
    nativeButton.style.overflow = "hidden";
    nativeButton.style.position = "fixed";
    nativeButton.style.bottom = "0";
    nativeButton.style.right = "0";
  }
}

function loadVlibrasWidget() {
  if (window.VLibras) {
    new window.VLibras.Widget(widgetSource);
    window.setTimeout(hideNativeAccessButton, 400);
    return;
  }

  if (document.querySelector(`script[src="${pluginSource}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = pluginSource;
  script.onload = () => {
    if (window.VLibras) {
      new window.VLibras.Widget(widgetSource);
      window.setTimeout(hideNativeAccessButton, 400);
    }
  };

  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  buildFloatingButton();
  buildWidgetRoot();
  loadVlibrasWidget();

  const observer = new MutationObserver(() => {
    hideNativeAccessButton();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});