async function loadProfile() {
  const response = await fetch("data.json");
  if (!response.ok) {
    throw new Error("Cannot load data.json");
  }

  const data = await response.json();
  renderProfile(data);
  addStructuredData(data);
}

function renderProfile(data) {
  document.title = `${data.name} | Academic Homepage`;
  setMeta("description", data.summary);
  setMetaProperty("og:title", `${data.name} | Academic Homepage`);
  setMetaProperty("og:description", data.summary);
  setCanonical(data.siteUrl);

  setText("name", data.name);
  setText("title", data.title);
  setText("affiliation", data.affiliation);
  setText("summary", data.summary);
  setText("footer-name", data.name);
  setText("updated-at", data.lastUpdated);
  document.getElementById("updated-at").setAttribute("datetime", data.lastUpdated);

  const photo = document.getElementById("profile-photo");
  if (data.photo) {
    photo.src = data.photo;
    photo.alt = `${data.name} profile photo`;
    photo.hidden = false;
  }

  renderResearchExperiences(data.researchExperiences);
  renderPublications(data.publications);
  renderLinks(data.links);
}

function setText(id, value) {
  const element = document.getElementById(id);
  element.textContent = value || "";
}

function setMeta(name, content) {
  const element = document.querySelector(`meta[name="${name}"]`);
  if (element && content) element.setAttribute("content", content);
}

function setMetaProperty(property, content) {
  const element = document.querySelector(`meta[property="${property}"]`);
  if (element && content) element.setAttribute("content", content);
}

function setCanonical(url) {
  const element = document.querySelector('link[rel="canonical"]');
  if (element && url) element.setAttribute("href", url);
}

function renderLinks(links) {
  const container = document.getElementById("links");
  container.replaceChildren(
    ...links.map((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.label;
      a.rel = "me noopener";
      return a;
    }),
  );
}

function renderResearchExperiences(items) {
  const container = document.getElementById("research-list");
  container.replaceChildren(
    ...items.map((item) => {
      const article = document.createElement("article");
      article.className = "timeline-item";

      const title = document.createElement("h3");
      title.textContent = item;

      article.append(title);
      return article;
    }),
  );
}

function renderPublications(items) {
  const container = document.getElementById("publications-list");
  container.replaceChildren(
    ...items.map((item, index) => {
      const article = document.createElement("article");
      article.className = "publication";

      const citation = document.createElement("p");
      citation.textContent = `[${index + 1}] ${item}`;

      article.append(citation);
      return article;
    }),
  );
}

function addStructuredData(data) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.title,
    affiliation: data.affiliation,
    url: data.siteUrl,
    sameAs: data.links.map((link) => link.url),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.append(script);
}

loadProfile().catch((error) => {
  console.error(error);
  document.body.classList.add("data-error");
});
