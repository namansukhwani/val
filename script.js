function showMessage(response) {
  let videoPlayed = false;
  if (response === "No") {
    const noButton = document.getElementById("no-button");
    const card = document.querySelector('.Mainprompt');
    if (card) {
      card.style.position = card.style.position || 'relative';
    }
    // Compute bounds within the card if available, otherwise fallback to viewport center
    const padding = 16;
    const boundsWidth = card ? Math.max(0, card.clientWidth - noButton.offsetWidth - padding * 2) : 0;
    const boundsHeight = card ? Math.max(0, card.clientHeight - noButton.offsetHeight - padding * 2) : 0;

    // Set the button position to absolute
    noButton.style.position = "absolute";
    noButton.style.zIndex="1000";
    // Emphasize button visuals: add border and reduce transparency
    noButton.style.border = "2px solid rgba(233, 30, 99, 0.6)";
    noButton.style.backgroundColor = "rgba(233, 30, 99, 0.28)";
    noButton.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";

    // Change the image source to "gun.gif"
    document.getElementsByClassName("image")[0].src = "images/gun.gif";

    // Place the button within safe bounds

    // Apply the new coordinates to the button within card or center fallback
    if (card && boundsWidth > 0 && boundsHeight > 0) {
      const randX = padding + Math.floor(Math.random() * boundsWidth);
      const randY = padding + Math.floor(Math.random() * boundsHeight);
      noButton.style.left = randX + "px";
      noButton.style.top = randY + "px";
    } else {
      // Center of the page fallback
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      noButton.style.left = Math.max(0, (vw - noButton.offsetWidth) / 2) + 'px';
      noButton.style.top = Math.max(0, (vh - noButton.offsetHeight) / 2) + 'px';
    }

    // Update text content and hide the name message
    document.getElementById("question").textContent =
      "Choose wisely";
    document.getElementById("name").style.display = "none";

    // Add a mouseover event listener to the "No" button
    noButton.addEventListener("mouseover", () => {
      if (!videoPlayed) {
        const noMsg = document.getElementById("no-message");
        if (noMsg) {
          const p = noMsg.querySelector("p");
          if (p) {
            p.textContent = "i am herting babe, there is no escape";
          } else {
            noMsg.textContent = "i am herting babe, there is no escape";
          }
          noMsg.style.display = "block";
        } else {
          // Fallback: change main question text if no-message is missing
          const q = document.getElementById("question");
          if (q) q.textContent = "i am herting babe, there is no escape";
        }
        // Ensure we only show once
        videoPlayed = true;
      }

      // Generate new random coordinates within the card (or keep centered fallback)
      if (card && boundsWidth > 0 && boundsHeight > 0) {
        const randX = padding + Math.floor(Math.random() * boundsWidth);
        const randY = padding + Math.floor(Math.random() * boundsHeight);
        noButton.style.left = randX + "px";
        noButton.style.top = randY + "px";
      } else {
        // keep it centered if no card bounds available
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        noButton.style.left = Math.max(0, (vw - noButton.offsetWidth) / 2) + 'px';
        noButton.style.top = Math.max(0, (vh - noButton.offsetHeight) / 2) + 'px';
      }
      noButton.style.zIndex = "1000";
    });
  }

  if (response === "Yes") {
    // Remove the name message and the "No" button
    document.getElementById("name").remove();
    document.getElementById("no-button").remove();
    const noMsg = document.getElementById("no-message");
    if (noMsg) {
      noMsg.style.display = "none";
    }

    // Create an audio element to play the sound
    const audioElement = document.createElement("audio");
    audioElement.src = "./Minions Cheering.mp4"; // match existing file extension
    audioElement.setAttribute('type', 'audio/mp4');
    audioElement.preload = "auto"; // Preloading the audio
    // try playing as soon as it's ready
    const tryPlay = () => audioElement.play().catch(e => console.error("Audio playback failed:", e));
    audioElement.addEventListener('canplay', tryPlay, { once: true });
    tryPlay();

    // Update the text content, display the message, and change the image to "dance.gif"
    const yesMessage = document.getElementById("question");
    yesMessage.textContent = "See you on the 14th my princess";
    yesMessage.style.display = "block";
    yesMessage.style.fontStyle = "normal";
    document.getElementsByClassName("image")[0].src = "images/dance.gif";

    // Remove the "Yes" button
    document.getElementById("yesButton").remove();
  }

}
