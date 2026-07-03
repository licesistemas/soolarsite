const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const year = document.querySelector('[data-year]');
const calcForm = document.querySelector('[data-calc-form]');
const calcResult = document.querySelector('[data-calc-result]');
const leadForm = document.querySelector('[data-lead-form]');
const modal = document.querySelector('[data-modal]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalClose = document.querySelector('[data-modal-close]');

const WHATSAPP_NUMBER = '5547999999999';

year.textContent = new Date().getFullYear();

const setHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('is-open');
  mobileNav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

calcForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const bill = Number(new FormData(calcForm).get('bill'));
  if (!bill || bill < 100) {
    calcResult.textContent = 'Informe um valor mensal válido acima de R$ 100.';
    return;
  }
  const monthly = bill * 0.82;
  const yearly = monthly * 12;
  const twentyFiveYears = yearly * 25;
  calcResult.innerHTML = `Estimativa: até <strong>${monthly.toLocaleString('pt-BR', { style:'currency', currency:'BRL' })}</strong>/mês, <strong>${yearly.toLocaleString('pt-BR', { style:'currency', currency:'BRL' })}</strong>/ano e <strong>${twentyFiveYears.toLocaleString('pt-BR', { style:'currency', currency:'BRL' })}</strong> em 25 anos. Solicite a análise técnica para confirmar.`;
});

leadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(leadForm));
  const message = [
    'Olá, SOOLARWIN! Quero solicitar uma análise gratuita do meu projeto.',
    `Nome: ${data.name}`,
    `WhatsApp: ${data.phone}`,
    data.email ? `E-mail: ${data.email}` : '',
    `Tipo de projeto: ${data.project}`,
    data.message ? `Mensagem: ${data.message}` : ''
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('[data-gallery] .gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    modalImg.src = item.dataset.img;
    modalImg.alt = item.dataset.title;
    modalTitle.textContent = item.dataset.title;
    modal.showModal();
  });
});

modalClose.addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
