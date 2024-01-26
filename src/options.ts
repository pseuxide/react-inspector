import { DEFAULT_OPEN_IN_EDITOR_URL, WEBSTORM_DEFAULT_OPEN_URL } from "./constants";

const getElements = () => {
  const openInEditorUrl = document.getElementById(
    "open-in-editor-url"
  ) as HTMLInputElement;

  const openInEditorMethod = document.getElementById('open-in-editor-method') as HTMLSelectElement;

  const domain1 = document.getElementById(
    "domain1"
  ) as HTMLInputElement;

  const replacee1 = document.getElementById(
    "replacee1"
  ) as HTMLInputElement;

  const replacer1 = document.getElementById(
    "replacer1"
  ) as HTMLInputElement;

  const domain2 = document.getElementById(
    "domain2"
  ) as HTMLInputElement;

  const replacee2 = document.getElementById(
    "replacee2"
  ) as HTMLInputElement;

  const replacer2 = document.getElementById(
    "replacer2"
  ) as HTMLInputElement;

  const domain3 = document.getElementById(
    "domain3"
  ) as HTMLInputElement;

  const replacee3 = document.getElementById(
    "replacee3"
  ) as HTMLInputElement;

  const replacer3 = document.getElementById(
    "replacer3"
  ) as HTMLInputElement;

  return {openInEditorUrl, openInEditorMethod, domain1, replacee1, replacer1, domain2, replacee2, replacer2, domain3, replacee3, replacer3}
}

const initOptions = () => {

  const { openInEditorUrl, openInEditorMethod,
    domain1, replacee1, replacer1,
    domain2, replacee2, replacer2,
    domain3, replacee3, replacer3 } = getElements();
  chrome.storage.sync.get(
    {
      openInEditorUrl: DEFAULT_OPEN_IN_EDITOR_URL,
      openInEditorMethod: 'url',
      domain1: '',
      replacee1: '',
      replacer1: '',
      domain2: '',
      replacee2: '',
      replacer2: '',
      domain3: '',
      replacee3: '',
      replacer3: ''
    },
    (items) => {
      openInEditorUrl.value = items.openInEditorUrl;
      openInEditorMethod.value = items.openInEditorMethod;
      domain1.value = items.domain1;
      replacee1.value = items.replacee1;
      replacer1.value = items.replacer1;
      domain2.value = items.domain2;
      replacee2.value = items.replacee2;
      replacer2.value = items.replacer2;
      domain3.value = items.domain3;
      replacee3.value = items.replacee3;
      replacer3.value = items.replacer3;
    }
  );
}

  const saveOptions = (feedbackMsg: string) => {
    const { openInEditorUrl, openInEditorMethod, domain1, replacee1, replacer1, domain2, replacee2, replacer2, domain3, replacee3, replacer3 } = getElements();

    chrome.storage.sync.set({
      openInEditorUrl: openInEditorUrl.value,
      openInEditorMethod: openInEditorMethod.value,
      domain1: domain1.value,
      replacee1: replacee1.value,
      replacer1: replacer1.value,
      domain2: domain2.value,
      replacee2: replacee2.value,
      replacer2: replacer2.value,
      domain3: domain3.value,
      replacee3: replacee3.value,
      replacer3: replacer3.value
    }, () => {
      const status = document.getElementById("status")!;
      status.textContent = feedbackMsg;
      setTimeout(() => {
        status.textContent = "";
      }, 1000);
    });
  };

  const applyInputValue = (uri: string, method: string, domain1Value: string, replacee1Value: string, replacer1Value: string, domain2Value: string, replacee2Value: string, replacer2Value: string, domain3Value: string, replacee3Value: string, replacer3Value: string) => {
    const { openInEditorUrl, openInEditorMethod, domain1, replacee1, replacer1, domain2, replacee2, replacer2, domain3, replacee3, replacer3 } = getElements();

    openInEditorUrl.value = uri;
    openInEditorMethod.value = method;
    domain1.value = domain1Value;
    replacee1.value = replacee1Value;
    replacer1.value = replacer1Value;
    domain2.value = domain2Value;
    replacee2.value = replacee2Value;
    replacer2.value = replacer2Value;
    domain3.value = domain3Value;
    replacee3.value = replacee3Value;
    replacer3.value = replacer3Value;
  }

  document.addEventListener("DOMContentLoaded", initOptions);
  document
    .getElementById("save")!
    .addEventListener("click", () => saveOptions("Options saved."));
  document
    .getElementById("restore-default")!
    .addEventListener("click", () => applyInputValue(DEFAULT_OPEN_IN_EDITOR_URL, 'url', '', '', '', '', '', '', '', '', ''));
  document.getElementById('webstorm')!
    .addEventListener('click', () => {
      applyInputValue(WEBSTORM_DEFAULT_OPEN_URL, 'fetch', '', '', '', '', '', '', '', '', '')
    })
export {};