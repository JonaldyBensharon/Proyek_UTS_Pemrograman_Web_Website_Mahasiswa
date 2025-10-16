document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.animate-fadeInUp');
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  setTimeout(() => {
    el.style.transition = 'all 0.8s ease';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }, 100);
});

const photoFrame = document.getElementById("photoFrame");
const overlay = document.getElementById("overlay");
const enlargedPhoto = document.getElementById("enlargedPhoto");

photoFrame.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    overlay.classList.add("hidden");
  }
});

(function() {
  const menuButton = document.getElementById('menuButton');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('closeSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const firstLink = sidebar ? sidebar.querySelector('nav ul li a') : null;

  function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
    backdrop.classList.remove('hidden');
    backdrop.classList.add('backdrop');
    if (firstLink) firstLink.focus();
    document.documentElement.classList.add('overflow-hidden');
  }

  function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    sidebar.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
    backdrop.classList.add('hidden');
    backdrop.classList.remove('backdrop');
    menuButton.focus();
    document.documentElement.classList.remove('overflow-hidden');
  }

  function toggleSidebar() {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    if (expanded) closeSidebar();
    else openSidebar();
  }

  menuButton.addEventListener('click', (e) => { e.stopPropagation(); toggleSidebar(); });
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeSidebar(); });
  backdrop.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeSidebar();
  });

  sidebar.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => closeSidebar());
  });

  sidebar.classList.add('-translate-x-full');
  backdrop.classList.add('hidden');
})();

// Fade cepat saat navigasi
(function() {
  const mainWrapper = document.getElementById('mainWrapper');
  const navLinks = document.querySelectorAll('#sidebar a[href^="#"]');

  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      // Fade out
      mainWrapper.classList.add('opacity-0');

      setTimeout(() => {
        // Scroll ke target
        const headerOffset = 80; // jika ada header sticky
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'instant' });

        // Fade in
        mainWrapper.classList.remove('opacity-0');
      }, 150); // durasi sama dengan Tailwind duration
    });
  });
})();
