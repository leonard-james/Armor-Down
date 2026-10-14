export function scrollToSection(selector, reducedMotion = false) {
  const target = document.querySelector(selector);
  if (!target) return false;

  const heading = target.matches('h1, h2, h3')
    ? target
    : target.querySelector('h1, h2, h3');
  const focusTarget = heading ?? target;

  if (!focusTarget.hasAttribute('tabindex')) {
    focusTarget.setAttribute('tabindex', '-1');
  }

  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - 80,
    behavior: reducedMotion ? 'instant' : 'smooth',
  });
  focusTarget.focus({ preventScroll: true });
  return true;
}
