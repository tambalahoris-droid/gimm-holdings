const services = [
  {
    title: "Solar panels & installation",
    category: "energy",
    image: "solar-panels.jpg",
    description: "Solar panel supply and installation for homes, businesses and institutions."
  },
  {
    title: "Solar LED street lights",
    category: "energy",
    image: "streetlights.jpg",
    description: "Lighting for roads, schools, residential areas and public infrastructure."
  },
  {
    title: "Car hire services",
    category: "mobility",
    image: "car-hire.jpg",
    description: "Corporate, staff, event and project transport, with short- or long-term hire."
  },
  {
    title: "Long-haul cross-border logistics",
    category: "mobility",
    image: "logistics.jpg",
    description: "Cargo, bulk transport, freight handling and supply-chain logistics."
  },
  {
    title: "Courier services",
    category: "mobility",
    image: "courier.jpg",
    description: "Courier and delivery support for business and personal requirements."
  },
  {
    title: "Property rentals",
    category: "supply",
    image: "property.jpg",
    description: "Property rental services for a range of practical needs."
  },
  {
    title: "Bus services",
    category: "mobility",
    image: "bus.jpg",
    description: "Passenger, school, corporate staff and event transportation."
  },
  {
    title: "Protective wear supply",
    category: "supply",
    image: "protective-wear.jpg",
    description: "Protective clothing and workwear for teams and organisations."
  },
  {
    title: "Tyres & general supplies",
    category: "supply",
    image: "tyres.jpg",
    description: "Tyres and a broad range of general goods and supplies."
  },
  {
    title: "Agricultural inputs",
    category: "supply",
    image: "agriculture.jpg",
    description: "Fertilizers and seeds to support agricultural productivity."
  },
  {
    title: "School furniture",
    category: "supply",
    image: "school-furniture.jpg",
    description: "Furniture and supplies for educational environments."
  },
  {
    title: "Bicycles",
    category: "supply",
    image: "bicycles.jpg",
    description: "Bicycle supply for mobility and community needs."
  },
  {
    title: "Generators",
    category: "supply",
    image: "generators.jpg",
    description: "Generator supply for dependable power when it is needed."
  }
];

const serviceGrid = document.querySelector("#service-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const appWindows = document.querySelectorAll(".app-window");

function renderServices(filter = "all") {
  const visibleServices = filter === "all"
    ? services
    : services.filter((service) => {
      if (filter === "mobility") {
        return service.category === "mobility";
      }

      if (filter === "supply") {
        return service.category === "supply";
      }

      return service.category === filter;
    });

  serviceGrid.innerHTML = visibleServices.map((service) => {
    const index = String(services.indexOf(service) + 1).padStart(2, "0");

    return `
      <article class="service-card">
        <img class="service-photo" src="assets/photos/${service.image}" alt="Photograph illustrating ${service.title}" loading="lazy" decoding="async">
        <div class="service-card-content">
          <span class="service-index">${index}</span>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </div>
      </article>
    `;
  }).join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderServices(button.dataset.filter);
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  if (!isOpen && window.matchMedia("(max-width: 640px)").matches) {
    appWindows.forEach((windowDialog) => {
      if (windowDialog.open) {
        windowDialog.close();
      }
    });
  }
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  });
});

function openWindow(windowDialog) {
  appWindows.forEach((openDialog) => {
    if (openDialog.open && openDialog !== windowDialog) {
      openDialog.close();
    }
  });

  if (!windowDialog.open) {
    windowDialog.show();
  }

  windowDialog.focus();
}

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) {
    return;
  }

  const target = document.querySelector(link.getAttribute("href"));
  if (!(target instanceof HTMLDialogElement) || !target.classList.contains("app-window")) {
    return;
  }

  event.preventDefault();
  openWindow(target);
});

document.addEventListener("click", (event) => {
  appWindows.forEach((windowDialog) => {
    if (
      windowDialog.open
      && !windowDialog.contains(event.target)
      && !event.target.closest('a[href^="#"]')
    ) {
      windowDialog.close();
    }
  });
});

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-window-action]");
  if (!control) {
    return;
  }

  const windowDialog = control.closest(".app-window");
  if (control.dataset.windowAction === "close") {
    windowDialog.close();
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderServices();

const initialWindow = location.hash ? document.getElementById(location.hash.slice(1)) : null;
if (initialWindow instanceof HTMLDialogElement && initialWindow.classList.contains("app-window")) {
  openWindow(initialWindow);
}
