const params = new URLSearchParams(location.search);
const item = window.PROJECTS.find((project) => project.id === params.get('id'));
const root = document.querySelector('#project');

if (!item) {
  document.title = 'Project not found — Clara Yousif';
  root.innerHTML = '<section class="not-found"><p class="eyebrow">404</p><h1>Project not found.</h1><a href="index.html">View all projects →</a></section>';
} else {
  document.title = `${item.title} — Clara Yousif`;
  const description = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement('meta'), {name:'description'}));
  description.content = item.summary;
  const asset = (name) => name.startsWith('../../')
    ? name.replace('../../', '../')
    : name.startsWith('../') ? name : `../assets/images/projects/${name}`;
  const sourceLink = item.repo
    ? `<a class="button" href="https://github.com/${item.repo}" target="_blank" rel="noreferrer">View repository ↗</a>`
    : '<span style="border:1px solid currentColor;padding:1rem 1.3rem">Local / private project</span>';
  const gallery = item.gallery.length
    ? `<section class="gallery"><div class="section-label"><p class="eyebrow">Project evidence</p><h2>Results you can inspect.</h2></div>${item.gallery.map((image, index) => `<figure><img src="${asset(image)}" alt="${item.title} authentic project evidence ${index + 1}" loading="lazy"><figcaption>${item.galleryCaptions?.[index] || 'Authentic output from the project files'}</figcaption></figure>`).join('')}</section>`
    : '';
  const metrics = item.metrics?.length ? `<section class="evidence-metrics">${item.metrics.map(([value,label])=>`<div><strong>${value}</strong><span>${label}</span></div>`).join('')}</section>` : '';
  const architecture = item.architecture?.length ? `<section class="architecture"><p class="eyebrow">System architecture</p><h2>From raw input to decision support.</h2><div class="architecture-flow">${item.architecture.map((step,index)=>`<div><span>${String(index+1).padStart(2,'0')}</span><strong>${step}</strong></div>`).join('')}</div></section>` : '';
  const decisions = item.decisions?.length ? `<section class="decisions"><p class="eyebrow">Engineering decisions</p><h2>Tradeoffs made explicit.</h2><div>${item.decisions.map(([title,body])=>`<article><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></section>` : '';
  const role = item.role ? `<section class="role-note"><p class="eyebrow">My role &amp; attribution</p><p>${item.role}</p></section>` : '';

  root.innerHTML = `<article>
    <section class="project-hero">
      <p class="eyebrow">${item.category} · ${item.year}</p>
      <h1>${item.title}</h1>
      <p class="lede">${item.summary}</p>
      <div class="hero-links">${sourceLink}<span>${item.status.includes('Collaborative') || item.status.includes('team') ? 'Collaborative work' : 'Project by Clara Yousif'}</span></div>
    </section>
    <figure class="cover"><img src="${asset(item.image)}" alt="${item.title} project evidence"></figure>
    ${metrics}
    <section class="case-grid">
      <div><p class="eyebrow">The challenge</p><h2>Why this project exists</h2><p>${item.challenge}</p></div>
      <div><p class="eyebrow">The approach</p><h2>What I built</h2><p>${item.solution}</p></div>
    </section>
    <section class="detail-grid">
      <div><p class="eyebrow">Technical stack</p><ul class="stack">${item.stack.map((value) => `<li>${value}</li>`).join('')}</ul></div>
      <div><p class="eyebrow">What it demonstrates</p><ul class="highlights">${item.highlights.map((value) => `<li>${value}</li>`).join('')}</ul></div>
    </section>
    ${architecture}
    ${decisions}
    ${role}
    ${gallery}
    <section class="status"><p class="eyebrow">Current status &amp; honesty note</p><h2>What is real—and what remains.</h2><p>${item.status}</p></section>
    <nav class="next"><a href="index.html">Explore all projects →</a></nav>
  </article>`;
}
