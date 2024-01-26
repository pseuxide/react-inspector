import {
  checkDevtoolsGlobalHook,
  findFiberByHostInstance,
  getEditorLink,
} from "./utils";
import Overlay from "./Overlay";
import { DEFAULT_OPEN_IN_EDITOR_URL } from "./constants";

let overlay: Overlay | null = null;
let inspecting = false;
let openInEditorUrl = DEFAULT_OPEN_IN_EDITOR_URL;
const mousePos = { x: 0, y: 0 };
let openInEditorMethod = 'url';
let domain1 = '';
let replacee1 = '';
let replacer1 = '';
let domain2 = '';
let replacee2 = '';
let replacer2 = '';
let domain3 = '';
let replacee3 = '';
let replacer3 = '';

const parseFilename = (filename: string | undefined, currentTabUrl: string) => {

  if (!filename) {
    return filename;
  }

  let parsedFilename = filename;

  const replacements = [
    { domain: domain1, replacee: replacee1, replacer: replacer1 },
    { domain: domain2, replacee: replacee2, replacer: replacer2 },
    { domain: domain3, replacee: replacee3, replacer: replacer3 },
  ];

  if (domain1 === '' && replacee1 && replacer1) {
    if (filename.startsWith(replacee1)) {
      parsedFilename = parsedFilename.replace(replacee1, replacer1);
    }
  } else {
    replacements.forEach(({ domain, replacee, replacer }) => {
      if (currentTabUrl.includes(domain) && filename.startsWith(replacee)) {
        parsedFilename = parsedFilename.replace(replacee, replacer);
      }
    });
  }

  return parsedFilename;
};


const getInspectName = (element: HTMLElement) => {
  const fiber = findFiberByHostInstance(element);
  if (!fiber) return "Source code could not be identified.";
  const { fileName, columnNumber, lineNumber } = fiber._debugSource;
  const path = (fileName || "").split("/");

  return `${path.at(-3) || ""}/${path.at(-2) || ""}/${path.at(-1)}:${
    lineNumber || 0
  }:${columnNumber || 0}`;
};

const startInspectorMode = () => {
  inspecting = true;
  if (!overlay) {
    overlay = new Overlay();
  }
  const element = document.elementFromPoint(
    mousePos.x,
    mousePos.y
  ) as HTMLElement | null;
  if (element) {
    // highlight the initial point.
    overlay.inspect([element], getInspectName(element));
  }

  window.addEventListener("pointerover", handleElementPointerOver, true);
  window.addEventListener("click", handleInspectorClick, true);
};

const exitInspectorMode = () => {
  inspecting = false;
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
  window.removeEventListener("pointerover", handleElementPointerOver, true);
  window.removeEventListener("click", handleInspectorClick, true);
};

const handleElementPointerOver = (e: PointerEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target || !overlay) return;
  overlay.inspect([target], getInspectName(target));
};

const handleInspectorClick = async (e: MouseEvent) => {
  e.preventDefault();
  exitInspectorMode();
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const fiber = findFiberByHostInstance(target);
  if (!fiber) {
    alert("This element cannot be opened in React Inspector.");
    return;
  }

  const tmpId = "_TMP";
  document.getElementById(tmpId)?.removeAttribute("id");
  target.id = tmpId;
  window.postMessage("inspected", "*");

  fiber._debugSource.fileName = parseFilename(fiber._debugSource.fileName, window.location.href);
  const deepLink = getEditorLink(openInEditorUrl, fiber._debugSource)
  if(openInEditorMethod === 'fetch'){
    fetch(deepLink);
  }else{
    window.open(deepLink);
  }
};

window.addEventListener("message", ({ data }) => {
  if (data !== "inspect" && data.type !== "options") return;

  if (data === "inspect") {
    if (!checkDevtoolsGlobalHook()) {
      alert(`This page is not available to use the React Inspector.
  Make sure React Developer Tools is installed and enabled.`);
      return;
    }
    if (inspecting) {
      exitInspectorMode();
    } else {
      startInspectorMode();
    }
  }

  if (data.type === "options" && data.openInEditorUrl) {
    openInEditorUrl = data.openInEditorUrl;
    openInEditorMethod = data.openInEditorMethod;
    domain1 = data.domain1;
    replacee1 = data.replacee1;
    replacer1 = data.replacer1;
    domain2 = data.domain2;
    replacee2 = data.replacee2;
    replacer2 = data.replacer2;
    domain3 = data.domain3;
    replacee3 = data.replacee3;
    replacer3 = data.replacer3;
  }
});

const handleInspectElement = (e: KeyboardEvent) => {
  if (e.key?.toLowerCase() === "escape") {
    e.preventDefault();
    exitInspectorMode();
  }
};

window.addEventListener("keydown", handleInspectElement);

window.addEventListener("mousemove", (e: MouseEvent) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
});

export {};
