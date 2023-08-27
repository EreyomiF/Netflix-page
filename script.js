const name = document.querySelector(".name");
const nameValue = name.getAttribute("data-value");

function insert(x, i, t) {
  let s = 0;
  let ss = 1;
  if (i === 0) {
    s = 20;
    ss = 1.15;
  } else if (i === 1) {
    s = 15;
    ss = 1.1;
  } else if (i === 2) {
    s = 5;
    ss = 1.03;
  } else if (i === 3) {
    s = 0;
    ss = 1;
  } else if (i === 4) {
    s = -5;
    ss = 1.03;
  } else if (i === 5) {
    s = -15;
    ss = 1.1;
  } else if (i === 6) {
    s = -20;
    ss = 1.15;
  }

  const container = document.createElement("div");
  container.classList.add("container");
  const div = document.createElement("div");
  div.textContent = x;
  div.classList.add("character");
  div.style.transform = `rotateY(${s}deg) scale(${ss})`;
  container.appendChild(div);
  name.appendChild(container);
  container.style.animation = `zoom 1.5s ${i /
    20}s cubic-bezier(.23,1.62,.65,.87) forwards`;
  div.style.animation = `long-shadow 1.5s ${i /
    20}s cubic-bezier(.23,1.62,.65,.87) forwards`;
}

function animate() {
  [...nameValue].forEach((x, i) => insert(x, i, nameValue.length));

  setTimeout(() => {
    name.style.animation = "shrink 4s ease-out forwards";
    const characters = document.querySelectorAll(".character");
    characters.forEach(c => {
      c.style.color = "red";
    });
  }, 1000);

  setTimeout(() => {
    name.innerHTML = "";
    name.style.animation = "grow 1s ease forwards";
  }, 4000);
}

animate();

// Create the animation timeline
const master_tl = gsap.timeline({ onComplete: redirectToHome });
master_tl
  .add((movement_tl), 0)
  .add((n_tl), 0.7)
  .add((e_tl), 0.8)
  .add((t_tl), 1.08)
  .add((f_tl), 1.18)
  .add((l_tl), 1.33)
  .add((i_tl), 1.63)
  .add((x_tl), 1.7)
  .add((exit_tl), 6)
  .add((master_tl), "+=6"); // Add the entire timeline again after a delay of 6 seconds

let playCount = 0;
const totalPlays = 2; // Number of times you want the animation to play

// Function to handle animation completion
function onAnimationComplete() {
  playCount++;
  if (playCount < totalPlays) {
    master_tl.play(); // Play the timeline again
  } else {
    master_tl.pause(); // Stop the animation after desired plays
  }
}

// Set the callback for animation completion
master_tl.eventCallback("onComplete", onAnimationComplete);
