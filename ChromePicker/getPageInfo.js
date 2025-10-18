var pageInfo = {
    "title": document.title,
    "url": window.location.href,
    "source": document.head.innerHTML,
    "lastModified": document.lastModified
};

chrome.extension.sendRequest(pageInfo);