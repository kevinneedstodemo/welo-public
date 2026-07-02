const contentSelectors = document.querySelectorAll('[data-content]');
const metricGrid = document.querySelector('#metric-grid');
const solutionGrid = document.querySelector('#solution-grid');
const brandList = document.querySelector('#brand-list');
const checklist = document.querySelector('#checklist');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');
const form = document.querySelector('.contact-form');
const formNote = document.querySelector('.form-note');

document.querySelector('#year').textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('is-open');
});

function getNestedValue(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source);
}

function renderMetrics(metrics) {
  metricGrid.innerHTML = metrics
    .map(
      (metric) => `
        <div class="metric-card">
          <strong>${metric.value}</strong>
          <span>${metric.label}</span>
        </div>
      `,
    )
    .join('');
}

function renderSolutions(solutions) {
  solutionGrid.innerHTML = solutions
    .map(
      (solution) => `
        <article class="card">
          <span>${solution.tag}</span>
          <h3>${solution.title}</h3>
          <p>${solution.description}</p>
        </article>
      `,
    )
    .join('');
}

function renderBrands(brands) {
  brandList.innerHTML = brands
    .map(
      (brand) => `
        <article class="brand-item">
          <h3>${brand.name}</h3>
          <p>${brand.summary}</p>
        </article>
      `,
    )
    .join('');
}

function renderChecklist(items) {
  checklist.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
}

async function loadCompanyContent() {
  try {
    const response = await fetch('data/company.json');

    if (!response.ok) {
      throw new Error(`Unable to load content: ${response.status}`);
    }

    const data = await response.json();

    contentSelectors.forEach((element) => {
      const value = getNestedValue(data, element.dataset.content);
      if (value) {
        element.textContent = value;
      }
    });

    renderMetrics(data.metrics);
    renderSolutions(data.solutions);
    renderBrands(data.brands);
    renderChecklist(data.checklist);
  } catch (error) {
    document.body.classList.add('content-error');
    console.error(error);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const email = formData.get('email');
  const useCase = formData.get('use-case');

  formNote.textContent = `Thanks, ${email}. This demo captured your ${useCase} request locally.`;
  form.reset();
});

loadCompanyContent();
