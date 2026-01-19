fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;

    // Now that the footer is loaded, set the year
    const copyrightEl = document.getElementById("copyright");
    if (copyrightEl) {
      const year = new Date().getFullYear();
      copyrightEl.textContent = year;
    }
  })
  .catch((error) => console.error("Error loading footer:", error));
