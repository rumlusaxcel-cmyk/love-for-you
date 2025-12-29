let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener("mousemove", (e) => {
      if (!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);

      if (dirLength > 0 && this.rotating) {
        const dirNormalizedX = dirX / dirLength;
        const dirNormalizedY = dirY / dirLength;

        const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
        let degrees = (180 * angle) / Math.PI;
        degrees = (360 + Math.round(degrees)) % 360;
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform =
          `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener("mousedown", (e) => {
      if (this.holdingPaper) return;

      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      
      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;

      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = document.querySelectorAll(".paper");
papers.forEach((paper) => {
  new Paper().init(paper);
});

// Lyrics (tanpa redirect error)
document.addEventListener("DOMContentLoaded", () => {
  const lyrics = Array(20).fill(" ");
  const delay = 41;
  const lyricsElement = document.getElementById("lyrics");

  async function displayLyrics() {
    for (const line of lyrics) {
      for (const char of line) {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animation = "glow 2s ease-in-out";
        span.style.fontSize = "30px";
        lyricsElement.appendChild(span);

        await new Promise((r) => setTimeout(r, delay));
      }

      lyricsElement.appendChild(document.createElement("br"));
      await new Promise((r) => setTimeout(r, delay * 25));
      lyricsElement.textContent = "";
      await new Promise((r) => setTimeout(r, delay * 35));
    }
  }

  displayLyrics();
});
