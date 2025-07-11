"use strict";

// =======================
// Scroll Restoration: Always start at top on reload
// =======================
if ("scrollRestoration" in history) {
  history.scrollRestoration = "auto"; // Let browser restore scroll position
}
// FIX: Only scroll to top if there is no hash in the URL
window.addEventListener("DOMContentLoaded", function () {
  if (!window.location.hash && window.scrollY > 0) {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }
});

// =======================
// Navbar Toggle Script
// =======================
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("navbar-toggle");
  const links = document.getElementById("navbar-links");

  function toggleMenu() {
    links.classList.toggle("active");
    toggle.classList.toggle("active");
  }

  if (toggle && links) {
    toggle.addEventListener("click", toggleMenu);

    toggle.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        toggleMenu();
      }
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 700) {
          links.classList.remove("active");
          toggle.classList.remove("active");
        }
      });
    });
  }
});

// =======================
// Clients Carousel Auto-Scroll
// =======================
const clientsTrack = document.querySelector(".clients-track");
if (clientsTrack) {
  clientsTrack.innerHTML += clientsTrack.innerHTML;

  let scrollAmount = 0;
  let animationFrame;

  function autoScroll() {
    scrollAmount += 1;
    if (scrollAmount >= clientsTrack.scrollWidth / 2) {
      scrollAmount = 0;
    }
    clientsTrack.style.transform = `translateX(-${scrollAmount}px)`;
    animationFrame = requestAnimationFrame(autoScroll);
  }

  autoScroll();

  clientsTrack.addEventListener("mouseenter", () => {
    cancelAnimationFrame(animationFrame);
  });
  clientsTrack.addEventListener("mouseleave", () => {
    animationFrame = requestAnimationFrame(autoScroll);
  });
}

// =======================
// Animate Hero and Main Section on Page Load
// =======================
window.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero__content");
  if (heroContent) {
    heroContent.classList.add("animate-fade-in-up");
  }

  const heroMediaLeft = document.querySelector(".hero-media-left");
  if (heroMediaLeft) {
    setTimeout(() => {
      heroMediaLeft.classList.add("animate-fade-in-left");
    }, 200);
  }

  const heroMediaRight = document.querySelector(".hero-media-right");
  if (heroMediaRight) {
    setTimeout(() => {
      heroMediaRight.classList.add("animate-fade-in-right");
    }, 400);
  }

  const heroVideoWrapper = document.querySelector(".hero-video-wrapper");
  if (heroVideoWrapper) {
    setTimeout(() => {
      heroVideoWrapper.classList.add("animate-fade-in-up");
    }, 300);
  }
});

// =======================
// Fade-in Sections on Scroll
// =======================
document.querySelectorAll("section, .clients-section").forEach((section) => {
  section.classList.add("fade-section");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-section-visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-section").forEach((section) => {
  observer.observe(section);
});

// =======================
// Services Section Interactivity
// =======================
document.addEventListener("DOMContentLoaded", function () {
  const serviceList = document.querySelector(".services-list");
  const serviceGroups = document.querySelectorAll(".services-image-group");
  if (!serviceList || !serviceGroups.length) return;

  function showGroup(service) {
    serviceGroups.forEach((group) => {
      group.classList.toggle("active", group.dataset.service === service);
    });
  }

  const firstLi = serviceList.querySelector("li");
  if (firstLi) {
    firstLi.classList.add("active");
    showGroup(firstLi.dataset.service);
  }

  serviceList.addEventListener("click", function (e) {
    const li = e.target.closest("li[data-service]");
    if (!li) return;
    serviceList
      .querySelectorAll("li")
      .forEach((el) => el.classList.remove("active"));
    li.classList.add("active");
    showGroup(li.dataset.service);
  });

  // Drag-to-scroll for horizontal service list on mobile
  let isDown = false,
    startX,
    scrollLeft;
  serviceList.addEventListener("mousedown", (e) => {
    if (window.innerWidth > 900) return;
    isDown = true;
    serviceList.classList.add("dragging");
    startX = e.pageX - serviceList.offsetLeft;
    scrollLeft = serviceList.scrollLeft;
  });
  serviceList.addEventListener("mouseleave", () => {
    isDown = false;
    serviceList.classList.remove("dragging");
  });
  serviceList.addEventListener("mouseup", () => {
    isDown = false;
    serviceList.classList.remove("dragging");
  });
  serviceList.addEventListener("mousemove", (e) => {
    if (!isDown || window.innerWidth > 900) return;
    e.preventDefault();
    const x = e.pageX - serviceList.offsetLeft;
    const walk = (x - startX) * 1.5;
    serviceList.scrollLeft = scrollLeft - walk;
  });
  // Touch support
  serviceList.addEventListener("touchstart", (e) => {
    if (window.innerWidth > 900) return;
    isDown = true;
    startX = e.touches[0].pageX - serviceList.offsetLeft;
    scrollLeft = serviceList.scrollLeft;
  });
  serviceList.addEventListener("touchend", () => {
    isDown = false;
  });
  serviceList.addEventListener("touchmove", (e) => {
    if (!isDown || window.innerWidth > 900) return;
    const x = e.touches[0].pageX - serviceList.offsetLeft;
    const walk = (x - startX) * 1.5;
    serviceList.scrollLeft = scrollLeft - walk;
  });
});

// =======================
// Smooth scroll for all navbar section links
// =======================
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll('.navbar__links a[href^="#"]')
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
});

// =======================
// Creative Display Slider Animation
// =======================
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".creative-slide");
  if (!slides.length) return;
  let current = 0;
  const total = slides.length;
  const interval = 2600; // ms

  function showSlide(idx, prevIdx = null) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "prev");
      if (i === idx) slide.classList.add("active");
      if (i === prevIdx) slide.classList.add("prev");
    });
  }

  function nextSlide() {
    const prev = current;
    current = (current + 1) % total;
    showSlide(current, prev);
  }

  showSlide(current);
  setInterval(nextSlide, interval);
});

// =======================
// Video Play/Pause on Click + Drag-to-Scroll
// =======================
document.addEventListener("DOMContentLoaded", function () {
  let currentPlayer = null;
  let currentFrame = null;

  // Drag-to-scroll for video list
  const videoScrollWrapper = document.querySelector(".video-scroll-wrapper");
  const videoList = document.querySelector(".video-list");
  let isDown = false,
    startX,
    scrollLeft;

  if (videoScrollWrapper && videoList) {
    // Duplicate video items for seamless looping
    videoList.innerHTML += videoList.innerHTML;
    const videoItems = videoList.children;
    const itemCount = videoItems.length / 2;
    const itemWidth =
      videoItems[0].offsetWidth +
      parseInt(getComputedStyle(videoList).gap || 0);

    // Set initial scroll to the start of the second set
    videoScrollWrapper.scrollLeft = itemCount * itemWidth;

    // Drag-to-scroll logic
    videoScrollWrapper.addEventListener("mousedown", (e) => {
      isDown = true;
      videoScrollWrapper.classList.add("active");
      startX = e.pageX - videoScrollWrapper.offsetLeft;
      scrollLeft = videoScrollWrapper.scrollLeft;
    });
    videoScrollWrapper.addEventListener("mouseleave", () => {
      isDown = false;
      videoScrollWrapper.classList.remove("active");
    });
    videoScrollWrapper.addEventListener("mouseup", () => {
      isDown = false;
      videoScrollWrapper.classList.remove("active");
    });
    videoScrollWrapper.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - videoScrollWrapper.offsetLeft;
      const walk = (x - startX) * 2;
      videoScrollWrapper.scrollLeft = scrollLeft - walk;
      handleLoop();
    });
    // Touch support
    videoScrollWrapper.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].pageX - videoScrollWrapper.offsetLeft;
      scrollLeft = videoScrollWrapper.scrollLeft;
    });
    videoScrollWrapper.addEventListener("touchend", () => {
      isDown = false;
    });
    videoScrollWrapper.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - videoScrollWrapper.offsetLeft;
      const walk = (x - startX) * 2;
      videoScrollWrapper.scrollLeft = scrollLeft - walk;
      handleLoop();
    });

    // Looping logic
    function handleLoop() {
      if (videoScrollWrapper.scrollLeft < itemWidth) {
        // Scrolled to (or past) the start, jump to the same item in the second set
        videoScrollWrapper.scrollLeft += itemCount * itemWidth;
      } else if (
        videoScrollWrapper.scrollLeft >
        (itemCount * 2 - 1) * itemWidth
      ) {
        // Scrolled to (or past) the end, jump back to the same item in the first set
        videoScrollWrapper.scrollLeft -= itemCount * itemWidth;
      }
    }
  }

  function createIframe(src) {
    // Remove title and related info from YouTube embed
    const cleanSrc = src.replace(
      "enablejsapi=1",
      "enablejsapi=1&modestbranding=1&showinfo=0&rel=0&controls=1"
    );
    const iframe = document.createElement("iframe");
    iframe.src = cleanSrc + "&autoplay=1";
    iframe.width = "1920";
    iframe.height = "1080";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    return iframe;
  }

  document.querySelectorAll(".video-frame").forEach(function (frame) {
    let iframe = null;
    let playing = false;

    // Show video thumbnail as background using YouTube's first frame
    const videoIdMatch = frame.dataset.src.match(/embed\/([^\?&]+)/);
    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      frame.style.background = `#000 url('https://img.youtube.com/vi/${videoId}/maxresdefault.jpg') center center / cover no-repeat`;
    }

    frame.addEventListener("click", function (e) {
      e.stopPropagation();

      // If this video is already playing, pause it (remove iframe)
      if (playing) {
        if (iframe) {
          frame.removeChild(iframe);
          iframe = null;
        }
        frame.classList.remove("playing");
        playing = false;
        currentPlayer = null;
        currentFrame = null;
        return;
      }

      // Pause any other playing video
      if (currentFrame && currentFrame !== frame) {
        currentFrame.click();
      }

      // Play this video
      const src = frame.getAttribute("data-src");
      iframe = createIframe(src);
      frame.appendChild(iframe);
      frame.classList.add("playing");
      playing = true;
      currentPlayer = iframe;
      currentFrame = frame;
    });
  });

  // Pause video if user clicks anywhere outside a playing video
  document.addEventListener("click", function (e) {
    if (currentFrame && !currentFrame.contains(e.target)) {
      currentFrame.click();
    }
  });
});

// =======================
// Team Members Focus Effect
// =======================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".team-member").forEach(function (member) {
    member.setAttribute("tabindex", "0");
    member.addEventListener("mouseenter", () => {
      member.classList.add("show-info");
    });
    member.addEventListener("mouseleave", () => {
      member.classList.remove("show-info");
    });
    // For touch devices
    member.addEventListener("touchstart", () => {
      member.classList.toggle("show-info");
    });
  });
});

// Rove Chat Bot functionality
document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  var yearSpan = document.getElementById("footer-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Chatbot
  const toggle = document.getElementById("rove-chatbot-toggle");
  const windowEl = document.getElementById("rove-chatbot-window");
  const close = document.getElementById("rove-chatbot-close");
  const form = document.getElementById("rove-chatbot-form");
  const input = document.getElementById("rove-chatbot-input");
  const messages = document.getElementById("rove-chatbot-messages");

  if (toggle && windowEl && close && form && input && messages) {
    toggle.addEventListener("click", () => {
      windowEl.style.display = "flex";
      input.focus();
    });
    close.addEventListener("click", () => {
      windowEl.style.display = "none";
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const userMsg = input.value.trim();
      if (!userMsg) return;
      // Add user message
      const userDiv = document.createElement("div");
      userDiv.className = "rove-chatbot-message rove-chatbot-message-user";
      userDiv.textContent = userMsg;
      messages.appendChild(userDiv);
      messages.scrollTop = messages.scrollHeight;
      input.value = "";

      // Simple bot reply (customize as needed)
      setTimeout(() => {
        const botDiv = document.createElement("div");
        botDiv.className = "rove-chatbot-message rove-chatbot-message-bot";
        botDiv.textContent = getBotReply(userMsg);
        messages.appendChild(botDiv);
        messages.scrollTop = messages.scrollHeight;
      }, 700);
    });
  }

  function getBotReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! 👋 How can I assist you today?";
    }
    if (msg.includes("services")) {
      return "We offer branding, design, motion graphics, animation, videography, photography, and more!";
    }
    if (msg.includes("contact")) {
      return "You can email us at info@rovemotion.com or use this chat!";
    }
    if (msg.includes("price") || msg.includes("cost")) {
      return "Our pricing depends on your project. Tell us what you need and we'll get back to you!";
    }
    if (msg.includes("thank")) {
      return "You're welcome! 😊";
    }
    return "Thank you for reaching out! We'll get back to you as soon as possible.";
  }
});
