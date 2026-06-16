'use strict';

/* ============================================================
   CAR DATA — марки и модели (популярные в РФ).
   Можно расширять. "Другая марка/модель" включает ручной ввод.
   ============================================================ */
const CAR_DATA = {
  'Lada (ВАЗ)': ['Granta', 'Vesta', 'XRAY', 'Largus', 'Niva', 'Niva Travel', 'Priora', 'Kalina', '2107', '2114'],
  'Kia': ['Rio', 'Ceed', 'Sportage', 'Sorento', 'Optima', 'K5', 'Soul', 'Cerato', 'Seltos'],
  'Hyundai': ['Solaris', 'Creta', 'Tucson', 'Santa Fe', 'Elantra', 'Sonata', 'i30', 'Accent'],
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Land Cruiser Prado', 'Highlander', 'Hilux', 'C-HR'],
  'Volkswagen': ['Polo', 'Golf', 'Tiguan', 'Passat', 'Touareg', 'Jetta', 'Teramont'],
  'Renault': ['Logan', 'Sandero', 'Duster', 'Kaptur', 'Arkana', 'Megane', 'Fluence'],
  'Nissan': ['Almera', 'Qashqai', 'X-Trail', 'Juke', 'Terrano', 'Note', 'Murano'],
  'Skoda': ['Octavia', 'Rapid', 'Kodiaq', 'Karoq', 'Superb', 'Fabia'],
  'BMW': ['1 серии', '3 серии', '5 серии', '7 серии', 'X1', 'X3', 'X5', 'X6'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE'],
  'Ford': ['Focus', 'Fiesta', 'Mondeo', 'Kuga', 'Explorer', 'EcoSport'],
  'Chevrolet': ['Cruze', 'Aveo', 'Lacetti', 'Niva', 'Captiva', 'Cobalt'],
  'Mazda': ['3', '6', 'CX-5', 'CX-30', 'CX-9'],
  'Mitsubishi': ['Lancer', 'Outlander', 'ASX', 'Pajero', 'Eclipse Cross'],
  'Audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
  'Haval': ['Jolion', 'F7', 'F7x', 'Dargo', 'H9'],
  'Chery': ['Tiggo 4', 'Tiggo 7 Pro', 'Tiggo 8 Pro', 'Arrizo 8'],
  'Geely': ['Coolray', 'Atlas', 'Tugella', 'Monjaro'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'S60'],
  'УАЗ': ['Patriot', 'Hunter', 'Pickup', 'Profi'],
  'ГАЗ': ['Газель', 'Газель Next', 'Соболь']
};

const OTHER = '__other__';

/* ============================================================
   FILL BRAND / MODEL SELECTS
   ============================================================ */
const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const brandOtherGroup = document.getElementById('brandOtherGroup');
const modelOtherGroup = document.getElementById('modelOtherGroup');
const brandOtherInput = document.getElementById('brandOther');
const modelOtherInput = document.getElementById('modelOther');

function fillBrands() {
  const brands = Object.keys(CAR_DATA).sort((a, b) => a.localeCompare(b, 'ru'));
  brands.forEach((brand) => {
    const opt = document.createElement('option');
    opt.value = brand;
    opt.textContent = brand;
    brandSelect.appendChild(opt);
  });
  const other = document.createElement('option');
  other.value = OTHER;
  other.textContent = 'Другая марка (ввести вручную)';
  brandSelect.appendChild(other);
}

function fillModels(brand) {
  modelSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Выберите модель';
  modelSelect.appendChild(placeholder);

  const models = CAR_DATA[brand] || [];
  models.forEach((model) => {
    const opt = document.createElement('option');
    opt.value = model;
    opt.textContent = model;
    modelSelect.appendChild(opt);
  });
  const other = document.createElement('option');
  other.value = OTHER;
  other.textContent = 'Другая модель (ввести вручную)';
  modelSelect.appendChild(other);
}

brandSelect.addEventListener('change', () => {
  const val = brandSelect.value;
  if (val === OTHER) {
    brandOtherGroup.hidden = false;
    brandOtherInput.required = true;
    // unknown brand -> manual model
    modelSelect.innerHTML = '<option value="" disabled selected>Введите модель вручную</option>';
    modelOtherGroup.hidden = false;
    modelOtherInput.required = true;
  } else {
    brandOtherGroup.hidden = true;
    brandOtherInput.required = false;
    brandOtherInput.value = '';
    fillModels(val);
    modelOtherGroup.hidden = true;
    modelOtherInput.required = false;
    modelOtherInput.value = '';
  }
});

modelSelect.addEventListener('change', () => {
  if (modelSelect.value === OTHER) {
    modelOtherGroup.hidden = false;
    modelOtherInput.required = true;
  } else {
    modelOtherGroup.hidden = true;
    modelOtherInput.required = false;
    modelOtherInput.value = '';
  }
});

fillBrands();

/* ============================================================
   FORM SUBMIT (заглушка)
   ============================================================ */
const form = document.getElementById('orderForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Собираем заявку (здесь можно подключить отправку менеджеру).
  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    service: form.service.value,
    brand: brandSelect.value === OTHER ? brandOtherInput.value.trim() : brandSelect.value,
    model: modelSelect.value === OTHER ? modelOtherInput.value.trim() : modelSelect.value,
    comment: form.comment.value.trim()
  };
  console.log('Новая заявка (заглушка):', data);

  form.querySelectorAll('input, select, textarea, button').forEach((el) => { el.disabled = true; });
  success.hidden = false;
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });

  setTimeout(() => {
    form.reset();
    form.querySelectorAll('input, select, textarea, button').forEach((el) => { el.disabled = false; });
    brandOtherGroup.hidden = true;
    modelOtherGroup.hidden = true;
    modelSelect.innerHTML = '<option value="" disabled selected>Сначала выберите марку</option>';
    success.hidden = true;
  }, 6000);
});

/* ============================================================
   PHONE MASK (простая)
   ============================================================ */
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.startsWith('8')) v = '7' + v.slice(1);
  if (!v.startsWith('7')) v = '7' + v;
  v = v.slice(0, 11);
  let out = '+7';
  if (v.length > 1) out += ' (' + v.slice(1, 4);
  if (v.length >= 4) out += ') ' + v.slice(4, 7);
  if (v.length >= 7) out += '-' + v.slice(7, 9);
  if (v.length >= 9) out += '-' + v.slice(9, 11);
  e.target.value = out;
});

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), (i % 4) * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ============================================================
   HEADER SCROLL + FAB
   ============================================================ */
const header = document.getElementById('header');
const fab = document.querySelector('.fab');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  fab.classList.toggle('show', y > 600);
});

/* ============================================================
   MOBILE NAV
   ============================================================ */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
});
nav.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('open');
  });
});

/* ============================================================
   YEAR
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();
