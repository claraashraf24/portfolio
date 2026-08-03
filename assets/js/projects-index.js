const root = document.querySelector('#projects');
const filters = document.querySelector('#filters');
const search = document.querySelector('#project-search');
const count = document.querySelector('#result-count');

const lenses = {
  'All work': [],
  'AI & ML': ['ai','ml','machine learning','nlp','computer vision','pytorch','tensorflow','scikit-learn','wav2vec2','whisper'],
  'MLOps & Cloud': ['mlops','docker','kubernetes','mlflow','github actions','observability','monitoring','devops','databricks'],
  'Data Engineering': ['data engineering','pyspark','sql','postgresql','etl','pipeline','analytics','databricks','pandas'],
  'Healthcare': ['healthcare','medical','clinical','hospital','biomedical','mri','phipa','outbreak'],
  'Software Systems': ['fastapi','react','next.js','typescript','backend','api','embedded','software','platform']
};

let activeLens = 'All work';
const searchable = (project) => [project.title,project.category,project.summary,project.challenge,project.solution,...project.stack,...project.highlights].join(' ').toLowerCase();
const matchesLens = (project) => !lenses[activeLens].length || lenses[activeLens].some((term) => searchable(project).includes(term));

function draw() {
  const query = search.value.trim().toLowerCase();
  const projects = window.PROJECTS.filter((project) => matchesLens(project) && (!query || searchable(project).includes(query)));
  count.textContent = `${projects.length} case ${projects.length === 1 ? 'study' : 'studies'}`;
  root.innerHTML = projects.length
    ? projects.map((project) => `<a class="archive-card" href="project.html?id=${project.id}"><span>${project.category} · ${project.year}</span><h2>${project.title}</h2><p>${project.summary}</p><b>Read case study ↗</b></a>`).join('')
    : '<p class="not-found">No case studies match this lens yet. Try another role or search term.</p>';
}

filters.innerHTML = Object.keys(lenses).map((lens,index) => `<button class="${index ? '' : 'active'}" data-lens="${lens}">${lens}</button>`).join('');
filters.addEventListener('click', (event) => {
  if (!event.target.matches('button')) return;
  filters.querySelectorAll('button').forEach((button) => button.classList.remove('active'));
  event.target.classList.add('active');
  activeLens = event.target.dataset.lens;
  draw();
});
search.addEventListener('input', draw);
draw();
