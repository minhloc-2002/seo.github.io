document.addEventListener('DOMContentLoaded', async () => {
  const list = document.querySelector('#article-list');
  const filterRow = document.querySelector('.filter-row');

  if (!list || !window.SITE_CONFIG?.contentEndpoint) {
    return;
  }

  const decodeHtml = value => {
    const element = document.createElement('textarea');
    element.innerHTML = String(value ?? '');
    return element.value;
  };

  const escapeHtml = value =>
    decodeHtml(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const renderArticle = (article, index) => {
    const id = String(article.id ?? '');
    const title = escapeHtml(article.title);
    const category = escapeHtml(article.category || 'Article');
    const date = escapeHtml(article.date);
    const summary = escapeHtml(article.summary);
    const readTime = escapeHtml(article.readTime || '1 min');
    const href = `article.html?id=${encodeURIComponent(id)}`;
    const visual = `visual-${(index % 4) + 1}`;

    const tags = Array.isArray(article.tags)
      ? article.tags
          .map(tag => `<span>${escapeHtml(tag)}</span>`)
          .join('')
      : '';

    return `
      <article
        class="publication"
        data-category="${category.toLowerCase()}"
      >
        <a
          class="pub-visual ${visual}"
          href="${href}"
          aria-label="Read ${title}"
        >
          <span>${String(index + 1).padStart(2, '0')}</span>
          <b>${category}</b>
        </a>

        <div class="pub-copy">
          <span class="eyebrow">${category} · ${date}</span>

          <h3>
            <a href="${href}">${title}</a>
          </h3>

          <p>${summary}</p>

          <div class="pub-meta">
            <span>${readTime} read</span>
            ${tags}
          </div>

          <a class="text-link" href="${href}">
            Read article →
          </a>
        </div>
      </article>
    `;
  };

  try {
    const response = await fetch(
      `${window.SITE_CONFIG.contentEndpoint}?v=${Date.now()}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`Content request failed: ${response.status}`);
    }

    const payload = await response.json();

    if (!Array.isArray(payload)) {
      throw new Error('Article data must be an array');
    }

    const articles = payload.filter(article => {
      const status = String(article.status || 'published').toLowerCase();
      return status === 'published';
    });

    list.innerHTML = articles.length
      ? articles.map(renderArticle).join('')
      : '<p>No published articles yet.</p>';

    document.documentElement.dataset.articleCount = String(articles.length);

    if (!filterRow) {
      return;
    }

    const categories = [
      'All',
      ...new Set(
        articles
          .map(article => decodeHtml(article.category || 'Article').trim())
          .filter(Boolean)
      )
    ];

    filterRow.replaceChildren();

    for (const category of categories) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.filter = category;
      button.textContent = category;

      if (category === 'All') {
        button.classList.add('active');
      }

      filterRow.appendChild(button);
    }

    const rows = [...list.querySelectorAll('.publication')];
    const buttons = [...filterRow.querySelectorAll('[data-filter]')];

    for (const button of buttons) {
      button.addEventListener('click', () => {
        buttons.forEach(item => item.classList.remove('active'));
        button.classList.add('active');

        const selected = button.dataset.filter.toLowerCase();

        rows.forEach(row => {
          row.hidden =
            selected !== 'all' &&
            row.dataset.category !== selected;
        });
      });
    }
  } catch (error) {
    document.documentElement.dataset.articleCount = 'static-fallback';
    console.error('Unable to load article list:', error);
  }
});
