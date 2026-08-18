import { SITE } from '../site.js';
export const renderCareersPage = async (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 class="section-title" style="margin-bottom: 10px;">Careers at ${SITE.name}</h1>
                <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
                    Join our team of dedicated professionals. We are always looking for passionate individuals to help us serve ${SITE.communityPhrase}.
                </p>
            </div>
            
            <div id="jobsList" style="display: flex; flex-direction: column; gap: 20px; max-width: 800px; margin: 0 auto;">
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    Loading open positions...
                </div>
            </div>
        </div>
    `;

    async function loadJobs() {
        try {
            const res = await fetch(SITE.api('/jobs'));
            const jobs = await res.json();
            const container = document.getElementById('jobsList');
            
            if (jobs.length === 0) {
                container.innerHTML = `
                    <div class="glass-card" style="text-align: center; padding: 40px;">
                        <h3 style="margin-bottom: 10px;">No Open Positions</h3>
                        <p style="color: var(--text-muted);">
                            We don't currently have any open positions, but we are always accepting applications from talented individuals. 
                            Feel free to send your resume to <strong>${SITE.careersEmail}</strong>.
                        </p>
                    </div>
                `;
                return;
            }

            container.innerHTML = jobs.reverse().map(job => `
                <div class="glass-card" style="padding: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <div>
                            <h2 style="margin-bottom: 5px;">${job.title}</h2>
                            <div style="display: flex; gap: 10px; font-size: 0.9rem;">
                                <span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px;">${job.department}</span>
                                <span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px;">${job.type}</span>
                                <span style="color: var(--text-muted); display: flex; align-items: center;">Posted ${new Date(job.datePosted).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <a href="mailto:${SITE.careersEmail}?subject=Application for ${encodeURIComponent(job.title)}" class="btn btn-primary" style="padding: 10px 20px;">
                            Apply Now
                        </a>
                    </div>
                    <div style="color: var(--text-muted); line-height: 1.6; white-space: pre-wrap; margin-top: 20px;">${job.description}</div>
                </div>
            `).join('');

            // Option C: Inject Google for Jobs JSON-LD schema
            const jsonLdScripts = jobs.map(job => {
                const schema = {
                    "@context": "https://schema.org/",
                    "@type": "JobPosting",
                    "title": job.title,
                    "description": job.description,
                    "identifier": {
                        "@type": "PropertyValue",
                        "name": SITE.name,
                        "value": job.id
                    },
                    "datePosted": new Date(job.datePosted).toISOString().split('T')[0],
                    "employmentType": job.type === 'Full-Time' ? 'FULL_TIME' : (job.type === 'Part-Time' ? 'PART_TIME' : 'CONTRACTOR'),
                    "hiringOrganization": {
                        "@type": "Organization",
                        "name": SITE.name,
                        "sameAs": SITE.url,
                        "logo": SITE.logo
                    },
                    "jobLocation": {
                        "@type": "Place",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": SITE.streetAddress,
                            "addressLocality": "Dubuque",
                            "addressRegion": "IA",
                            "postalCode": "52003",
                            "addressCountry": "US"
                        }
                    }
                };
                return `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`;
            }).join('');
            
            // Append schemas to the container (invisible)
            container.insertAdjacentHTML('beforeend', jsonLdScripts);

        } catch (e) {
            document.getElementById('jobsList').innerHTML = '<div style="color: red; text-align: center;">Error loading jobs.</div>';
        }
    }

    loadJobs();
};
