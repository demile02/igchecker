
    let followersList = [];
    let followingList = [];

    function extractUsernames(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return Array.from(doc.querySelectorAll("a"))
        .filter(a => a.href.includes("instagram.com"))
        .map(a => a.href.split("/").filter(Boolean).pop());
    }

    function processFiles() {
      const followersFile = document.getElementById("followersFile").files[0];
      const followingFile = document.getElementById("followingFile").files[0];

      if (!followersFile || !followingFile) {
        alert("Mohon unggah kedua file terlebih dahulu.");
        return;
      }

      Promise.all([
        followersFile.text(),
        followingFile.text()
      ]).then(([followersHtml, followingHtml]) => {
        followersList = extractUsernames(followersHtml);
        followingList = extractUsernames(followingHtml);

        const notFollowingBack = followingList.filter(user => !followersList.includes(user));

        let html = `<h3 style='text-align:center;'>Ditemukan ${notFollowingBack.length} akun tidak mengikuti balik</h3>`;
        html += `<table><thead><tr><th>No</th><th>Username</th><th>Link Profil</th></tr></thead><tbody>`;

        notFollowingBack.forEach((username, index) => {
          const link = `https://www.instagram.com/${username}`;
          html += `<tr><td>${index + 1}</td><td>${username}</td><td><a href="${link}" target="_blank">${link}</a></td></tr>`;
        });

        html += `</tbody></table>`;
        document.getElementById("result").innerHTML = html;
      
