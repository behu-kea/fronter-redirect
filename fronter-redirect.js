const iframe = document.querySelector("section main iframe");

document
  .querySelector("ul.l-main-content-nav")
  .addEventListener("click", () => {
    const activeLink = document.querySelector(
      "ul.l-main-content-nav > li > .active"
    );

    browser.storage.sync.set({
      activeLink: activeLink.getAttribute("href"),
    });
  });

browser.storage.sync.get("activeLink").then(({ activeLink }) => {
  console.log(activeLink);
  iframe.setAttribute("src", activeLink);
});
