document.addEventListener('DOMContentLoaded', function () {
  const publicationSections = [
    { title: "Books and Book Chapters", file: "books.json" },
    { title: "Journal Publications", file: "journals.json" },
    { title: "International Conferences", file: "international_conf.json" },
    { title: "National Conferences", file: "national_conf.json" },
    { title: "Technical Reports", file: "technical_reports.json" },
    { title: "Doctoral Theses", file: "doctoral_theses.json" },
    { title: "MSc (Engg.) Theses", file: "msc_theses.json" },
    { title: "ME/M. Tech Dissertations", file: "me_mtech_dissertations.json" }
  ];
  const container = document.getElementById('publication-sections');
  publicationSections.forEach(section => {
    const sectionElement = createSection(section.title);
    container.appendChild(sectionElement);
    fetchPublications(section.file)
      .then(publications => renderPublications(publications, sectionElement, section.title))
      .catch(error => console.error('Error loading publications:', error));
  });
  container.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('accordion')) {
      toggleAccordion(e.target);
    }
  });
});

function createSection(title) {
  const section = document.createElement('div');
  section.innerHTML = `
      <button class="accordion">${title}</button>
      <div class="panel" style="display: none;"></div>
  `;
  return section;
}

function fetchPublications(filename) {
  return fetch(`data/${filename}`)
    .then(response => response.json());
}

function renderPublications(publications, sectionElement, sectionTitle) {
  const panel = sectionElement.querySelector('.panel');
  panel.innerHTML = ''; // Clear existing content

  publications.forEach(pub => {
    const pubElement = document.createElement('div');
    pubElement.className = 'publication-item';
    pubElement.innerHTML = `
      <div class="pub-info">
        <div class="pub-header">
          
          <p class="pub-title">${pub.title}</p>
                ${pub.location ? `<p class="pub-location">${pub.location}</p>` : ''}

          <p class="pub-date">${pub.date ? pub.date : ''}</p>
      ${pub.link ? `<a href="${pub.link}" target="_blank" class="view-link">View</a>` : ''}
        </div>
        <p class="pub-authors">${pub.authors ? pub.authors.join(', ') : ''}</p>
        ${pub.identifier ? `<p class="pub-identifier">${pub.identifier}</p>` : ''}
      ${["ME/M. Tech Dissertations", "MSc (Engg.) Theses", "Doctoral Theses"].includes(sectionTitle) ? `
      <p class="pub-person">${pub.person ? `${pub.person}` : ''}</p>
      <p class="pub-currently">${pub.currently ? `${pub.currently}` : ''}</p>
    ` : ''}
      </div>
    
      ${sectionTitle === "Technical Reports" ? `
        <button class="pdfbutton" onclick="sendEmail('Request for PDF: ${pub.title}')">Request Access</button>
      ` : ''}

    `;
    panel.appendChild(pubElement);
  });
}

function toggleAccordion(accordionButton) {
  accordionButton.classList.toggle('active');
  const panel = accordionButton.nextElementSibling;
  panel.classList.toggle('active');
  if (panel.style.display === "flex") {
    panel.style.display = "none";
  } else {
    panel.style.display = "flex";
  }
}

function sendEmail(subject) {
  var mailtoLink = "mailto:example@mail.com?subject=" + encodeURIComponent(subject);
  window.location.href = mailtoLink;
}