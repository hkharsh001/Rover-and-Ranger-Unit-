// Example Events
const events = [
    { date: "22 Sep 2025", title: "Monsoon Cleanup Drive", location: "Hamirpur Town", tag: "Community" },
    { date: "05 Oct 2025", title: "State Rover Moot", location: "Shimla", tag: "Camp" },
    { date: "19 Oct 2025", title: "First-Aid Workshop", location: "College Auditorium", tag: "Training" }
];

const news = [
    { title: "Rovers lead disaster relief", summary: "50+ volunteers supported 200 families after heavy rains." },
    { title: "Two Rangers earn Governor's Award", summary: "Ananya and Pooja honored for service." },
    { title: "Tree-Plantation Drive", summary: "350 saplings planted in campus area." }
];

const gallery = [
    "images/gallery1.jpg",
    "images/gallery2.jpg",
    "images/gallery3.jpg",
    "images/gallery4.jpg"
];

// Populate Events
document.getElementById('event-list').innerHTML = events.map(e =>
    `<div class="card">
        <small>${e.tag}</small>
        <h4>${e.title}</h4>
        <p>${e.location}</p>
        <span>${e.date}</span>
    </div>`
).join('');

// Populate News
document.getElementById('news-list').innerHTML = news.map(n =>
    `<div class="card">
        <h4>${n.title}</h4>
        <p>${n.summary}</p>
    </div>`
).join('');

// Populate Gallery
document.querySelector('.gallery-grid').innerHTML = gallery.map(src =>
    `<img src="${src}" alt="Gallery Image">`
).join('');
