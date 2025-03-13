document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  const contactLinks = document.querySelectorAll(".contact-link");
  contactLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Contact link clicked");
      const openModalEvent = new CustomEvent("open-contact-modal");
      document.dispatchEvent(openModalEvent);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const benefitIcons = document.querySelectorAll(".benefit-icon svg");
  document.querySelectorAll(".highlight");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const highlight = entry.target.querySelector(".highlight");
        if (highlight) {
          const finalValue = parseInt(highlight.textContent);
          animateValue(highlight, 0, finalValue, 1500);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".benefit-card").forEach((card) => {
    observer.observe(card);
  });
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp)
        startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    };
    window.requestAnimationFrame(step);
  }
  benefitIcons.forEach((icon) => {
    const length = icon.getTotalLength ? icon.getTotalLength() : 1e3;
    icon.style.strokeDasharray = length;
    icon.style.strokeDashoffset = length;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("offerModal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  const closeModal = document.querySelector(".close-modal");
  const offerButtons = document.querySelectorAll(".offer-button");
  const offerDetails = {
    starter: {
      title: "Offre Starter",
      description: "Idéale pour les petites entreprises qui débutent avec l'automatisation.",
      features: [
        "Automatisation de 3 processus métier au choix",
        "Assistance par email sous 48h",
        "Mises à jour trimestrielles des algorithmes",
        "1 utilisateur avec accès au tableau de bord",
        "Formation initiale de 2 heures",
        "Stockage de données limité à 5 Go"
      ]
    },
    business: {
      title: "Offre Business",
      description: "Solution complète pour les PME qui souhaitent optimiser leurs opérations.",
      features: [
        "Automatisation de 10 processus métier personnalisés",
        "Support prioritaire par email et téléphone",
        "Mises à jour mensuelles des algorithmes",
        "5 utilisateurs avec accès personnalisé",
        "Formation approfondie de 8 heures",
        "Intégration avec les principaux CRM",
        "Stockage de données de 50 Go",
        "Rapports d'analyse mensuels"
      ]
    },
    enterprise: {
      title: "Offre Enterprise",
      description: "Solution sur mesure pour les grandes entreprises avec des besoins complexes.",
      features: [
        "Automatisation illimitée de processus métier",
        "Support dédié 24/7 avec temps de réponse garanti",
        "Mises à jour en temps réel des algorithmes",
        "Utilisateurs illimités avec gestion des rôles",
        "Formation personnalisée et continue",
        "Intégration complète avec tous vos systèmes",
        "Stockage de données illimité",
        "Rapports d'analyse avancés hebdomadaires",
        "Consultant IA dédié",
        "SLA avec garantie de performance"
      ]
    }
  };
  offerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tier = button.closest(".offer-card").dataset.tier;
      const details = offerDetails[tier];
      modalTitle.textContent = details.title;
      let modalContent = `<p class="modal-description">${details.description}</p>`;
      modalContent += "<h4>Fonctionnalités incluses:</h4>";
      modalContent += '<ul class="modal-features">';
      details.features.forEach((feature) => {
        modalContent += `<li>${feature}</li>`;
      });
      modalContent += "</ul>";
      modalBody.innerHTML = modalContent;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
  document.querySelector(".modal-button").addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    alert("Redirection vers le formulaire de contact...");
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".offer-card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const responses = {
    default: "Je suis désolé, je n'ai pas compris votre question. Pourriez-vous reformuler ou me demander autre chose ?",
    greeting: ["Bonjour !", "Salut ! Comment puis-je vous aider ?", "Bonjour, ravi de vous rencontrer !"],
    pricing: "Nos tarifs commencent à 99€/mois pour l'offre Starter. L'offre Business est à 249€/mois et nous proposons également des solutions Enterprise sur mesure.",
    features: "Notre IA peut automatiser vos tâches administratives, analyser vos données, générer des rapports, et bien plus encore. Que souhaitez-vous automatiser en particulier ?",
    demo: "Vous êtes en train d'utiliser notre démo ! N'hésitez pas à me poser des questions sur nos services, tarifs ou fonctionnalités.",
    contact: "Vous pouvez nous contacter par email à contact@aisolutions.fr ou par téléphone au 01 23 45 67 89. Un conseiller vous répondra dans les 24h.",
    thanks: ["De rien !", "Avec plaisir !", "Je vous en prie, n'hésitez pas si vous avez d'autres questions."],
    help: "Je peux vous renseigner sur nos services, nos tarifs, nos fonctionnalités ou vous mettre en relation avec un conseiller. Que souhaitez-vous savoir ?"
  };
  const keywords = {
    greeting: ["bonjour", "salut", "hello", "coucou", "hey"],
    pricing: ["prix", "tarif", "coût", "combien", "offre", "forfait"],
    features: ["fonctionnalité", "service", "option", "capable", "faire", "possible"],
    demo: ["démo", "essai", "tester", "exemple"],
    contact: ["contact", "email", "téléphone", "appeler", "joindre"],
    thanks: ["merci", "thanks", "remercie"],
    help: ["aide", "help", "besoin", "comment"]
  };
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : "bot"}`;
    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = text;
    const timeDiv = document.createElement("div");
    timeDiv.className = "message-time";
    timeDiv.textContent = "Maintenant";
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (!isUser) {
      contentDiv.style.opacity = "0";
      let opacity = 0;
      const interval = setInterval(() => {
        opacity += 0.1;
        contentDiv.style.opacity = opacity;
        if (opacity >= 1)
          clearInterval(interval);
      }, 50);
    }
  }
  function getBotResponse(input) {
    const text = input.toLowerCase();
    for (const [intent, keywordList] of Object.entries(keywords)) {
      for (const keyword of keywordList) {
        if (text.includes(keyword)) {
          const response = responses[intent];
          return Array.isArray(response) ? response[Math.floor(Math.random() * response.length)] : response;
        }
      }
    }
    return responses.default;
  }
  sendButton.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (text) {
      addMessage(text, true);
      userInput.value = "";
      setTimeout(() => {
        const botResponse = getBotResponse(text);
        addMessage(botResponse);
      }, 1e3);
    }
  });
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendButton.click();
    }
  });
  userInput.focus();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(document.querySelector(".demo-content"));
  document.querySelectorAll(".feature").forEach((feature, index) => {
    feature.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(feature);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".testimonial-video video");
  const playButtons = document.querySelectorAll(".play-button");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play();
        video.closest(".testimonial-video").classList.add("playing");
      } else {
        video.pause();
        video.closest(".testimonial-video").classList.remove("playing");
      }
    });
  }, { threshold: 0.6 });
  videos.forEach((video) => {
    observer.observe(video);
  });
  playButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const video = videos[index];
      const videoContainer = video.closest(".testimonial-video");
      if (video.paused) {
        video.play();
        videoContainer.classList.add("playing");
      } else {
        video.pause();
        videoContainer.classList.remove("playing");
      }
    });
  });
  const track = document.querySelector(".testimonials-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const cardWidth = cards[0].offsetWidth;
  const trackWidth = cardWidth * cards.length;
  let position = 0;
  track.style.transform = `translateX(0px)`;
  if (cards.length < 8) {
    const clones = Array.from(cards).map((card) => card.cloneNode(true));
    clones.forEach((clone) => {
      track.appendChild(clone);
    });
  }
  function scrollTestimonials() {
    position -= 1;
    if (Math.abs(position) >= trackWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(scrollTestimonials);
  }
  requestAnimationFrame(scrollTestimonials);
  const slider = document.querySelector(".testimonials-slider");
  slider.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  slider.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".toggle-icon");
    answer.style.height = "0px";
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.height = "0px";
          otherItem.querySelector(".toggle-icon").textContent = "+";
        }
      });
      if (isActive) {
        item.classList.remove("active");
        answer.style.height = "0px";
        icon.textContent = "+";
      } else {
        item.classList.add("active");
        answer.style.height = answer.scrollHeight + "px";
        icon.textContent = "−";
      }
    });
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  faqItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".blog-card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactModal = document.getElementById("contactModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const debugInfo = document.getElementById("debugInfo");
  function debugLog(message) {
    console.log(`[ContactModal Debug]: ${message}`);
    if (debugInfo) {
      debugInfo.textContent = message;
      debugInfo.style.display = "block";
    }
  }
  function openModal() {
    try {
      debugLog("Attempting to open modal");
      if (!contactModal) {
        throw new Error("Contact modal element not found");
      }
      contactModal.classList.add("active");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        contactModal.classList.add("animate-in");
        debugLog("Modal opened successfully");
      }, 10);
    } catch (error) {
      debugLog(`Error opening modal: ${error.message}`);
      console.error(error);
    }
  }
  function closeModal() {
    try {
      debugLog("Attempting to close modal");
      contactModal.classList.remove("animate-in");
      setTimeout(() => {
        contactModal.classList.remove("active");
        document.body.style.overflow = "auto";
        debugLog("Modal closed successfully");
      }, 300);
    } catch (error) {
      debugLog(`Error closing modal: ${error.message}`);
      console.error(error);
    }
  }
  document.addEventListener("open-contact-modal", (event) => {
    debugLog("Received open-contact-modal event");
    openModal();
  });
  closeModalBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  document.querySelector(".modal-container").addEventListener("click", (e) => {
    e.stopPropagation();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactModal.classList.contains("active")) {
      closeModal();
    }
  });
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      debugLog("Form submission prevented");
      closeModal();
    });
  }
});
//# sourceMappingURL=hoisted.48639e45.js.map
