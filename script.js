
      document.getElementById("followersFile").addEventListener("change", function () {
        if (this.files.length > 0) {
          const label = document.getElementById("followersLabel");
          label.classList.add("success");
          label.innerHTML = "✅ followers_1.html terpilih";
        }
      });

      document.getElementById("followingFile").addEventListener("change", function () {
        if (this.files.length > 0) {
          const label = document.getElementById("followingLabel");
          label.classList.add("success");
          label.innerHTML = "✅ following.html terpilih";
        }
      });

      function resetUploadButtons() {
        const followersLabel = document.getElementById("followersLabel");
        const followingLabel = document.getElementById("followingLabel");
      
        followersLabel.classList.remove("success");
        followersLabel.innerHTML = "📂 Unggah followers_1.html";
        followingLabel.classList.remove("success");
        followingLabel.innerHTML = "📂 Unggah following.html";

        document.getElementById("followersFile").value = "";
        document.getElementById("followingFile").value = "";
      }
  
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
      
        resetUploadButtons();

        document.getElementById("tutorial").style.display = "none";
  
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
        });
      }
  
    window.onload = () => {
      const carousel = document.getElementById("carousel");
      const images = carousel.querySelectorAll("img");
      const dotsContainer = document.getElementById("dots");

      images.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
      });
  
      carousel.addEventListener("scroll", () => {
        const scrollPos = carousel.scrollLeft;
        const slideWidth = images[0].offsetWidth + 16; // 16px gap
        const maxIndex = images.length - 1;
    
        let rawIndex = scrollPos / slideWidth;
        let index = Math.floor(rawIndex);
      
        if (rawIndex - index >= 0.4) {
          index++;
        }
  
      // 🛡️ Extra safety: kalau sudah mendekati ujung, pastikan tidak melebihi maxIndex
        if (scrollPos >= carousel.scrollWidth - carousel.clientWidth - 5) {
          index = maxIndex;
        }
  
      // Update dot
        document.querySelectorAll(".dot").forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      });
    };
