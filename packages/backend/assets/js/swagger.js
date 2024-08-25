// Function to be triggered when the element with class 'swagger-container' appears
let swaggerContainerAdded = false;

function onSwaggerContainerAdded() {
  if (swaggerContainerAdded) return;
  swaggerContainerAdded = true;
  const summaries = document.querySelectorAll(".opblock-summary-description");

  summaries.forEach(summary => {
    const text = summary.textContent;
    const data = extractBadges(text);
    summary.textContent = data.stringWithoutBadges;
    data.badges.forEach(role => {
      const roleValue = role.title;
      const span = document.createElement("span");
      span.classList.add("role-badge");
      span.textContent = roleValue;
      //summary.textContent = summary.textContent.replace(role[0], "");
      summary.appendChild(span);
    });
  });
}

// Create a MutationObserver to observe changes in the DOM
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // Check if the added nodes contain the element with class 'swagger-container'
      mutation.addedNodes.forEach(node => {
        if (node.classList && node.classList.contains("swagger-container")) {
          onSwaggerContainerAdded();
          observer.disconnect(); // Stop observing if you only need to detect the element once
        }
      });
    }
  }
});

// Start observing the document's body for changes
observer.observe(document.body, { childList: true, subtree: true });

function extractBadges(input) {
  const badgeRegex = /\[([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+)\]/g;
  let match;
  const badges = [];
  let stringWithoutBadges = input;

  // Extract all badges
  while ((match = badgeRegex.exec(input)) !== null) {
    badges.push({ name: match[1], title: match[2] });
  }

  // Remove all badge instances from the string
  stringWithoutBadges = stringWithoutBadges.replace(badgeRegex, "").trim();

  return {
    stringWithoutBadges,
    badges,
  };
}
