console.log("Script initialised");

const iframe = document.querySelector("section main iframe");
// For fronterroom save the latest visited link
const actionUrl = document
    .querySelector("#aspnetForm").getAttribute("action");
const fronterRoomId = actionUrl.split("./ContentArea.aspx?LocationID=")[1].split("&LocationType")[0];

document
    .querySelector("ul.l-main-content-nav")
    .addEventListener("click", (clickEvent) => {
        const clickedHref = clickEvent.target.getAttribute("href");

        browser.storage.sync
            .get(fronterRoomId)
            .then((lastClickedLink) => {
                lastClickedLink[fronterRoomId] = clickedHref;

                browser.storage.sync.set(lastClickedLink);
            });
    });

//browser.storage.sync.remove('fronterRoomLinks');

browser.storage.sync
    .get(fronterRoomId)
    .then(lastClickedLink => {
        if (lastClickedLink) {
            iframe.setAttribute("src", lastClickedLink[fronterRoomId]);
        }
    });




