console.log("Script initialised");
const iframe = document.querySelector("section main iframe");

// For fronterroom save the latest visited link
const actionUrl = document
    .querySelector("#aspnetForm").getAttribute("action");
const fronterRoomId = getLocationId(actionUrl);

document
    .querySelector("ul.l-main-content-nav")
    .addEventListener("click", (clickEvent) => {
        console.log('Link clicked');
        const clickedHref = clickEvent.target.getAttribute("href");
        chrome.storage.sync
            .get(fronterRoomId)
            .then((lastClickedLink) => {
                lastClickedLink[fronterRoomId] = clickedHref;

                chrome.storage.sync.set(lastClickedLink);
            });
    });

//chrome.storage.sync.remove('fronterRoomLinks');

chrome.storage.sync
    .get(fronterRoomId)
    .then(lastClickedLink => {
        // firefox returns undefined chrome an empty object
        if (lastClickedLink && Object.keys(lastClickedLink).length !== 0) {
            iframe.setAttribute("src", lastClickedLink[fronterRoomId]);
        }
    });


function getLocationId(actionString) {
    actionString = actionString.toLowerCase();
    const regex = /locationid=(\d*)/gm;

    let matchedLocationId;
    let m;

    while ((m = regex.exec(actionString)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            matchedLocationId = match;
        });
    }

    return matchedLocationId;
}

