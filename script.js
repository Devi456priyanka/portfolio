
document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.setAttribute(
      "aria-expanded",
      String(navLinks.classList.contains("open"))
    );
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // Animate sections when they enter the screen
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Project information shown when a card is selected
  const projectDetails = {
    plantcare: {
      title: "PlantCare AI",
      kicker: "AI / COMPUTER VISION",
      description: "A plant health assistant designed to help users explore possible plant leaf diseases and learn useful plant-care guidance.",
      features: [
        "Upload a leaf image for analysis.",
        "Display a predicted plant or disease label when supported by the model.",
        "Show symptoms, possible causes and care suggestions.",
        "Use a simple Streamlit interface."
      ],
      technologies: ["Python", "Streamlit", "Computer Vision", "Image Classification"]
    },
    assistant: {
      title: "Multilingual Voice & Text Assistant",
      kicker: "LANGUAGE TECHNOLOGY",
      description: "A multilingual assistant project concept that combines text or voice input with translated text and generated speech.",
      features: [
        "Accept text input and voice input when configured.",
        "Translate between selected supported languages.",
        "Display translated text.",
        "Generate speech output using text-to-speech."
      ],
      technologies: ["Python", "Gradio", "Translation", "Text-to-Speech"]
    },
    mehndi: {
      title: "Mehndi Magic",
      kicker: "FRONTEND DEVELOPMENT",
      description: "A responsive mehndi design gallery concept for exploring designs by style, occasion and hand coverage.",
      features: [
        "Browse Arabic, bridal, floral and mandala categories.",
        "Filter designs by occasion and coverage.",
        "Search and save favourite designs in the interface.",
        "Explore booking and care-guide sections."
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    }
  };

  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalKicker = document.getElementById("modalKicker");
  const modalDescription = document.getElementById("modalDescription");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalTags = document.getElementById("modalTags");
  let lastFocusedElement = null;

  function openModal(projectKey) {
    const project = projectDetails[projectKey];
    if (!project || !modal) return;

    lastFocusedElement = document.activeElement;
    modalTitle.textContent = project.title;
    modalKicker.textContent = project.kicker;
    modalDescription.textContent = project.description;

    modalFeatures.replaceChildren();
    project.features.forEach(feature => {
      const item = document.createElement("li");
      item.textContent = feature;
      modalFeatures.appendChild(item);
    });

    modalTags.replaceChildren();
    project.technologies.forEach(technology => {
      const tag = document.createElement("span");
      tag.textContent = technology;
      modalTags.appendChild(tag);
    });

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocusedElement?.focus();
  }

  document.querySelectorAll("[data-project]").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.project));
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.querySelectorAll("[data-close]").forEach(element => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal?.classList.contains("open")) {
      closeModal();
    }
  });
});
