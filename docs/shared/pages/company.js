import { SITE } from '../site.js';

export const renderCompanyPage = (root) => {
    // Parse query string for sub-page (e.g. ?page=about)
    const urlSplit = window.location.hash.split('?');
    const query = urlSplit.length > 1 ? urlSplit[1] : '';
    const params = new URLSearchParams(query);
    const page = params.get('page') || 'home';

    const C = SITE.company;

    let title = "Company Profile";
    let description = C.profileIntro;
    let icon = "🏢";

    let contentHtml = `
        <div class="glass-card" style="padding: 40px;">
            <h3 style="margin-bottom: 20px;">Welcome to ${SITE.name}</h3>
            <img src="${C.aboutImage}" alt="${SITE.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: var(--text-muted); margin-bottom: 20px; line-height: 1.6;">
                ${SITE.intro}
            </p>
            <div style="display: flex; gap: 16px; margin-top: 20px;">
                <a href="#/company?page=contact" class="btn btn-primary">Contact Us</a>
                <a href="#/company?page=about" class="btn btn-outline">Read More</a>
            </div>
        </div>
    `;

    if (page === 'about') {
        title = "About Us";
        icon = "👥";
        description = C.aboutLede;
        contentHtml = `
            <div class="glass-card" style="padding: 40px;">
                <h3 style="margin-bottom: 20px; color: var(--case-red);">${C.aboutHeading}</h3>
                <img src="${C.teamImage}" alt="${SITE.name} team" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 24px;">
                ${C.aboutParagraphs.map(p => `
                    <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 20px;">${p}</p>
                `).join('')}
                ${C.brandList.length ? `
                    <h4 style="margin: 32px 0 16px; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Brands We Carry &amp; Service</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${C.brandList.map(b => `<span class="badge badge-gray">${b}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    } else if (page === 'contact') {
        title = "Contact Us";
        icon = "📞";
        description = "Get in touch! Find our phone numbers, address, and hours of operation.";
        contentHtml = `
            <div style="margin-bottom: 30px;">
                <img src="${C.contactImage}" alt="Contact ${SITE.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <div class="glass-card" style="padding: 40px;">
                    <h3 style="margin-bottom: 24px;">Location</h3>
                    <p style="color: var(--text-light); margin-bottom: 8px;"><strong>${SITE.name}</strong></p>
                    <p style="color: var(--text-muted); margin-bottom: 20px; line-height: 1.6;">${SITE.streetAddress}<br>${SITE.city} ${SITE.postalCode}</p>

                    <h3 style="margin-bottom: 16px; margin-top: 32px;">Phone</h3>
                    <p style="color: var(--text-muted); margin-bottom: 8px;"><strong>Main:</strong> <a href="${SITE.telHref(SITE.phone)}" style="color: var(--case-red);">${SITE.phone}</a></p>
                    <p style="color: var(--text-muted);"><strong>Toll Free:</strong> <a href="${SITE.telHref(SITE.tollFree)}" style="color: var(--case-red);">${SITE.tollFree}</a></p>
                </div>
                <div class="glass-card" style="padding: 40px;">
                    <h3 style="margin-bottom: 24px;">Hours of Operation</h3>
                    <ul style="list-style: none; padding: 0; color: var(--text-muted); line-height: 2.2;">
                        ${SITE.hoursDetailed.map(([day, time]) => `
                            <li style="display: flex; justify-content: space-between;${/closed/i.test(time) ? ' color: var(--case-red);' : ''}">
                                <span>${day}</span> <span>${time}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    } else if (page === 'employment') {
        title = "Employment Opportunities";
        icon = "💼";
        description = "Join our team! We are always looking for passionate technicians, sales professionals, and support staff.";
        contentHtml = `
            <div class="glass-card" style="padding: 0; overflow: hidden; text-align: center;">
                <img src="${C.careerImage}" alt="Careers at ${SITE.name}" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 40px;">
                    <h3 style="margin-bottom: 15px;">Looking for a Career in ${C.careerField}?</h3>
                    <p style="color: var(--text-muted); margin-bottom: 24px;">We offer competitive wages, benefits, and a great working environment. See what we're hiring for right now.</p>
                    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                        <a href="#/careers" class="btn btn-primary">View Open Positions</a>
                        <a href="mailto:${SITE.careersEmail}" class="btn btn-outline">Email Your Resume</a>
                    </div>
                </div>
            </div>
        `;
    } else if (page === 'specials') {
        title = "Specials & Promotions";
        icon = "⭐";
        description = "Check out our latest deals on new equipment, used equipment, and parts.";
        contentHtml = `
            <div class="glass-card" style="padding: 0; overflow: hidden; text-align: center; border-color: var(--harvest-gold);">
                <img src="${C.specialImage}" alt="Specials" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 40px;">
                    <h3 style="margin-bottom: 15px; color: var(--harvest-gold);">No Active Specials</h3>
                    <p style="color: var(--text-muted);">Please check back later or contact our sales team directly for the best current pricing and financing offers.</p>
                </div>
            </div>
        `;
    }

    root.innerHTML = `
        <div class="container section">
            <div style="text-align: center; margin-bottom: 40px; padding: 60px 20px; background: rgba(20,20,20,0.4); border-radius: 12px; border: 1px solid var(--glass-border);">
                <div style="font-size: 3rem; margin-bottom: 20px;">${icon}</div>
                <h1 class="section-title" style="margin-bottom: 15px;">${title}</h1>
                <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
                    ${description}
                </p>
            </div>

            <div class="company-content-area" style="max-width: 900px; margin: 0 auto;">
                ${contentHtml}
            </div>
        </div>
    `;
};
