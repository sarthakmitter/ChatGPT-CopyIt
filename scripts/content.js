const targetNode = document.body;

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      const elements = [...document.querySelectorAll(".text-base")];
      const filteredElements = [];
      for (let i = 0; i < elements.length; i++) {
        if (i % 2 !== 0) {
          filteredElements.push(elements[i]);
        }
      }
      filteredElements.forEach((filteredElement) => {
        const childPElements = filteredElement.getElementsByTagName("p");
        const lastPElement = childPElements[childPElements.length - 1]; // get the last paragraph
        if (!lastPElement.querySelector("button")) { // check if the button is not already added
          const copyButton = document.createElement("button");
          copyButton.textContent = "Copy";
          copyButton.style.backgroundColor = "lightgray";
          copyButton.style.color = "white";
          copyButton.style.padding = "5px 10px";
          copyButton.style.marginLeft = "8px";
          copyButton.style.borderRadius = "5px";
          copyButton.style.cursor = "pointer";
          copyButton.addEventListener("click", () => {
            const paragraphs = filteredElement.getElementsByTagName("p");
            const textContent = Array.from(paragraphs).map((p) => p.textContent).join("\n\n");
            navigator.clipboard.writeText(textContent);
            
            // add copied tooltip and change button color to green
            copyButton.textContent = "Copied!";
            copyButton.style.backgroundColor = "green";
            setTimeout(() => {
              copyButton.textContent = "Copy";
              copyButton.style.backgroundColor = "lightgray";
            }, 3000);
          });
          const copyButtonContainer = document.createElement("span");
          copyButtonContainer.appendChild(copyButton);
          lastPElement.appendChild(copyButtonContainer);
        }
      });
    }
  });
});

const observerConfig = { childList: true, subtree: true };
observer.observe(targetNode, observerConfig);
