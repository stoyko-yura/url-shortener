const urlInput = document.getElementById("url-input");
const shortenBtn = document.getElementById("shorten-btn");
const resultDiv = document.getElementById("result");

shortenBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const originalUrl = urlInput.value;

  try {
    const response = await fetch("/api/url/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: originalUrl }),
    });

    const data = await response.json();

    if (data.success) {
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
    } else {
      resultDiv.textContent = `Error: ${data.error}`;
    }
  } catch (error) {
    resultDiv.textContent = "An error occurred. Please try again.";
  }
});
