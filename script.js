// Job Data
const jobs = [
    {
        id: 1,
        title: "Junior Structural Engineer",
        company: "Apex Infrastructure Pvt. Ltd.",
        category: "Structural",
        level: "Entry",
        location: "Mumbai",
        salary: "₹3.5 - 5 LPA",
        skills: ["AutoCAD", "STAAD.Pro", "ETABS"],
        description: "Assist senior engineers in structural analysis and design of commercial and residential buildings. Prepare drawings and reports."
    },
    {
        id: 2,
        title: "Site Engineer",
        company: "Larsen & Toubro Construction",
        category: "Construction",
        level: "Entry",
        location: "Delhi",
        salary: "₹4 - 6 LPA",
        skills: ["Site Management", "AutoCAD", "MS Project"],
        description: "Oversee day-to-day construction activities, ensure quality control, and coordinate with subcontractors on site."
    },
    {
        id: 3,
        title: "Geotechnical Engineer",
        company: "SoilTech Solutions",
        category: "Geotechnical",
        level: "Mid",
        location: "Bangalore",
        salary: "₹8 - 12 LPA",
        skills: ["PLAXIS", "Soil Testing", "Foundation Design"],
        description: "Conduct soil investigations, analyze ground conditions, and design foundations for high-rise structures."
    },
    {
        id: 4,
        title: "Highway Design Engineer",
        company: "NHAI Consultant Group",
        category: "Transportation",
        level: "Mid",
        location: "Hyderabad",
        salary: "₹7 - 11 LPA",
        skills: ["MX Roads", "Civil 3D", "Highway Engineering"],
        description: "Design highway alignments, intersections, and drainage systems. Prepare DPRs for road projects."
    },
    {
        id: 5,
        title: "Environmental Engineer",
        company: "GreenBuild Consultants",
        category: "Environmental",
        level: "Mid",
        location: "Pune",
        salary: "₹6 - 10 LPA",
        skills: ["EIA", "Water Treatment", "Air Quality Modeling"],
        description: "Conduct environmental impact assessments, design wastewater treatment plants, and ensure regulatory compliance."
    },
    {
        id: 6,
        title: "Water Resources Engineer",
        company: "Jal Nigam Projects",
        category: "Water Resources",
        level: "Senior",
        location: "Chennai",
        salary: "₹15 - 22 LPA",
        skills: ["HEC-RAS", "SWMM", "Hydraulic Modeling"],
        description: "Lead flood modeling projects, design stormwater drainage networks, and manage river basin studies."
    },
    {
        id: 7,
        title: "BIM Modeler",
        company: "Digital Construction Hub",
        category: "Structural",
        level: "Entry",
        location: "Remote",
        salary: "₹3 - 4.5 LPA",
        skills: ["Revit", "Navisworks", "BIM 360"],
        description: "Create 3D building information models, perform clash detection, and generate construction documentation."
    },
    {
        id: 8,
        title: "Project Manager - Civil",
        company: "Prestige Group",
        category: "Construction",
        level: "Senior",
        location: "Bangalore",
        salary: "₹18 - 28 LPA",
        skills: ["PMP", "Primavera", "Contract Management"],
        description: "Lead large-scale residential and commercial projects from planning to handover. Manage budgets, timelines, and stakeholder communication."
    },
    {
        id: 9,
        title: "Bridge Design Engineer",
        company: "BridgeTech Engineers",
        category: "Structural",
        level: "Mid",
        location: "Mumbai",
        salary: "₹9 - 14 LPA",
        skills: ["MIDAS Civil", "Bridge Design", "Seismic Analysis"],
        description: "Design prestressed concrete and steel bridges. Perform load rating and seismic retrofitting analysis."
    },
    {
        id: 10,
        title: "Urban Planner",
        company: "Smart City Mission Corp",
        category: "Transportation",
        level: "Senior",
        location: "Delhi",
        salary: "₹14 - 20 LPA",
        skills: ["ArcGIS", "Urban Design", "Transport Planning"],
        description: "Develop master plans for smart cities, design transit-oriented developments, and optimize urban mobility networks."
    },
    {
        id: 11,
        title: "Tunnel Engineer",
        company: "Metro Rail Corporation",
        category: "Geotechnical",
        level: "Mid",
        location: "Pune",
        salary: "₹10 - 15 LPA",
        skills: ["Tunnel Design", "Rock Mechanics", "NATM"],
        description: "Design underground metro tunnels, analyze ground-support interaction, and supervise tunnel boring operations."
    },
    {
        id: 12,
        title: "Construction Quality Inspector",
        company: "QualityFirst Engineering",
        category: "Construction",
        level: "Entry",
        location: "Chennai",
        salary: "₹3 - 4.5 LPA",
        skills: ["NDT Testing", "Concrete Technology", "IS Codes"],
        description: "Perform quality checks on construction materials, conduct NDT tests, and ensure compliance with Indian Standards."
    }
];

// DOM Elements
const jobsGrid = document.getElementById('jobsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const levelFilter = document.getElementById('levelFilter');
const locationFilter = document.getElementById('locationFilter');
const noResults = document.getElementById('noResults');
const jobModal = document.getElementById('jobModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalCompany = document.getElementById('modalCompany');
const modalBody = document.getElementById('modalBody');
const newsletterForm = document.getElementById('newsletterForm');
const subscribeMsg = document.getElementById('subscribeMsg');

// Render Jobs
function renderJobs(jobsToRender) {
    jobsGrid.innerHTML = '';

    if (jobsToRender.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    jobsToRender.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <div class="job-meta">
                <span class="tag">${job.category}</span>
                <span class="tag">${job.level}</span>
                <span class="tag">${job.location}</span>
            </div>
            <p>${job.description.substring(0, 100)}...</p>
            <div class="salary">${job.salary}</div>
        `;
        card.addEventListener('click', () => openModal(job));
        jobsGrid.appendChild(card);
    });
}

// Filter Jobs
function filterJobs() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const level = levelFilter.value;
    const location = locationFilter.value;

    const filtered = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(search) ||
                              job.company.toLowerCase().includes(search) ||
                              job.skills.some(s => s.toLowerCase().includes(search));
        const matchesCategory = category === 'all' || job.category === category;
        const matchesLevel = level === 'all' || job.level === level;
        const matchesLocation = location === 'all' || job.location === location;

        return matchesSearch && matchesCategory && matchesLevel && matchesLocation;
    });

    renderJobs(filtered);
}

// Modal Functions
function openModal(job) {
    modalTitle.textContent = job.title;
    modalCompany.textContent = job.company;
    modalBody.innerHTML = `
        <p><strong>Category:</strong> ${job.category}</p>
        <p><strong>Experience Level:</strong> ${job.level}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Salary:</strong> <span style="color:#2e7d32;font-weight:700;">${job.salary}</span></p>
        <p><strong>Skills Required:</strong> ${job.skills.join(', ')}</p>
        <hr style="margin:15px 0;border:none;border-top:1px solid #eee;">
        <p>${job.description}</p>
    `;
    jobModal.classList.remove('hidden');
}

function closeModalFunc() {
    jobModal.classList.add('hidden');
}

// Event Listeners
searchInput.addEventListener('input', filterJobs);
categoryFilter.addEventListener('change', filterJobs);
levelFilter.addEventListener('change', filterJobs);
locationFilter.addEventListener('change', filterJobs);
closeModal.addEventListener('click', closeModalFunc);

jobModal.addEventListener('click', (e) => {
    if (e.target === jobModal) closeModalFunc();
});

// Newsletter
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    if (email) {
        subscribeMsg.classList.remove('hidden');
        document.getElementById('emailInput').value = '';
        setTimeout(() => {
            subscribeMsg.classList.add('hidden');
        }, 3000);
    }
});

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initial Render
renderJobs(jobs);

