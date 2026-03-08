(function () {
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);

  var links = {
    facebook: "https://www.facebook.com/sharer/sharer.php?u=" + url,
    twitter: "https://twitter.com/intent/tweet?url=" + url + "&text=" + title,
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + url,
    whatsapp: "https://wa.me/?text=" + title + "%20" + url,
    email: "mailto:?subject=" + title + "&body=" + url
  };

  document.querySelectorAll(".share-btn").forEach(function(btn) {
    var network = btn.dataset.network;
    if (!links[network]) return;
    btn.href = links[network];
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });
})();
