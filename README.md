# pseuxide's fork - react inspector for docker users

A version which applied shitty workaround of docker path problem for my personal use. It's a dumb way but I'd b ok as long as it works.

As [this issue](https://github.com/hand-dot/react-inspector/issues/3) from original repo states, when u involve docker in ur development, react-inspector might misunderstand the file path depend on ur Dockerfile setting.

I integrated an ugly UI to dynamically correct erroneous docker paths. This ensures path accuracy by substituting incorrect paths with the correct one u specified which effectively solves the docker path problem. up to 3 currently btw.

Specifying the domain, the replacing only takes place when current tab contains that domain in the URL.

This image is an example of my configuration which will alter the part `/app` with `/Users/pseuxide/works/instabase` of the file path only when im working on `*instabase.host*`.

<img width="538" alt="image" src="https://github.com/pseuxide/react-inspector/assets/33578715/1cc7674e-3112-4c25-acf2-fa2d0dc27e8e">

# React Inspector

YOU CAN TRY 👉 https://chrome.google.com/webstore/detail/react-inspector/gkkcgbepkkhfnnjolcaggogkjodmlpkh

Easily detect React components source code from Chrome!

![CleanShot 2022-09-02 at 18 08 23](https://user-images.githubusercontent.com/24843808/188106077-ff409aeb-0145-4977-9be2-16d04809cc78.gif)

The Inspector launch with Ctrl+Shift+X (Command+Shift+X on Mac).  
You can detect and open the React component source code easily.

1. Run the Dev server and Open your react app.
2. Press Ctrl+Shift+X (Command+Shift+X on Mac) on Chrome.
3. Inspect your react components and click it.

---

You can edit the open in editor URL on the options page. If you are not VSCode user, you can edit it to your favorite editor URL-schemes.

![CleanShot 2022-09-12 at 13 11 18](https://user-images.githubusercontent.com/24843808/189572510-a54463ff-1f11-4c92-a19f-007ad113009b.png)

![CleanShot 2022-09-12 at 13 10 27](https://user-images.githubusercontent.com/24843808/189572514-0c7993b4-0067-4984-8ee2-89ba978907ed.png)



## Requirements

- Installed [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- Works only with development builds.
- Source code must be stored on local disk

## How it works

The React Inspector accesses the `__REACT_DEVTOOLS_GLOBAL_HOOK__` set globally by the React Devtools and finds the [React Fiber](https://reactjs.org/docs/faq-internals.html#what-is-react-fiber) in the HTML element that the inspector hovered over.
The React Fiber contains information about the source code that will be added during development, so we use that information to open the VSCode.

Reference
- https://github.com/facebook/react/tree/main/packages/react-devtools#faq
- https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source
- https://github.com/facebook/react/blob/f0efa1164b7ca8523b081223954d05c88e92053b/packages/react-reconciler/src/ReactInternalTypes.js#L193
