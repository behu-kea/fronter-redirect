const iframe = document.querySelector("section main iframe");

document
  .querySelector("ul.l-main-content-nav")
  .addEventListener("click", (clickEvent) =>
    chrome.storage.sync.set({
      activeLink: clickEvent.target.getAttribute("href"),
    })
  );

chrome.storage.sync
  .get("activeLink")
  .then(({ activeLink }) => iframe.setAttribute("src", activeLink));
