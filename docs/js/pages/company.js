export const renderCompanyPage = (root) => {
    // Parse query string for sub-page (e.g. ?page=about)
    const urlSplit = window.location.hash.split('?');
    const query = urlSplit.length > 1 ? urlSplit[1] : '';
    const params = new URLSearchParams(query);
    const page = params.get('page') || 'home';

    let title = "Company Profile";
    let description = "Serving the Dubuque community with premium equipment and service since our founding. We are your trusted partner for Case IH, Kubota, and many other top brands.";
    let icon = "🏢";
    
    let contentHtml = `
        <div class="glass-card" style="padding: 40px;">
            <h3 style="margin-bottom: 20px;">Welcome to Roeder Implement</h3>
            <img src="/images/company/about-cover.jpg" alt="Roeder Implement" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: var(--text-muted); margin-bottom: 20px; line-height: 1.6;">
                Roeder Implement a CASE IH dealer in Dubuque Iowa, selling and servicing new and used tractors, combines and farm equipment. An experienced, knowledgeable staff, competitive prices, first rate service and hard to find parts are what makes Roeder Implement Eastern Iowa's premiere destination for all your farming needs.
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
        description = "Learn about our history, our values, and our commitment to the local farming and construction community.";
        contentHtml = `
            <div class="glass-card" style="padding: 40px;">
                <h3 style="margin-bottom: 20px; color: var(--case-red);">Eastern Iowa's Premiere Destination</h3>
                <img src="/images/company/ResizedImage900870-IMG-8665-2.jpg" alt="Roeder Implement Team" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 24px;">
                <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 20px;">
                    Since 1957, Roeder Implement has been a trusted business partner in the Tri-State area. Today, this third generation, family owned business has become a multi-line dealership carrying high quality new and used tractors, combines, and farm equipment from Case IH, Kubota, Jaylor, Anderson, H&S, Land Pride, Yanmar and many more.
                </p>
                <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 20px;">
                    Roeder Implement a CASE IH dealer in Dubuque Iowa, selling and servicing new and used tractors, combines and farm equipment. An experienced, knowledgeable staff, competitive prices, first rate service and hard to find parts are what makes Roeder Implement Eastern Iowa's premiere destination for all your farming needs.
                </p>
                <p style="color: var(--text-muted); line-height: 1.8;">
                    To look at our complete inventory, please check our New Equipment and Used Equipment pages for great deals on all of our CASE IH and other equipment brands like Land Pride, Degelman, Kubota, Virnig, Paladin Attachments and more.
                </p>
            </div>
        `;
    } else if (page === 'contact') {
        title = "Contact Us";
        icon = "📞";
        description = "Get in touch! Find our phone numbers, address, and hours of operation.";
        contentHtml = `
            <div style="margin-bottom: 30px;">
                <img src="/images/company/contact-cover.jpg" alt="Contact Us" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <div class="glass-card" style="padding: 40px;">
                    <h3 style="margin-bottom: 24px;">Location</h3>
                    <p style="color: var(--text-light); margin-bottom: 8px;"><strong>Roeder Implement</strong></p>
                    <p style="color: var(--text-muted); margin-bottom: 20px; line-height: 1.6;">2550 Rockdale Rd.<br>Dubuque, IA 52003</p>
                    
                    <h3 style="margin-bottom: 16px; margin-top: 32px;">Phone</h3>
                    <p style="color: var(--text-muted); margin-bottom: 8px;"><strong>Main:</strong> <a href="tel:5635571184" style="color: var(--case-red);">563-557-1184</a></p>
                    <p style="color: var(--text-muted);"><strong>Toll Free:</strong> <a href="tel:8005571184" style="color: var(--case-red);">800-557-1184</a></p>
                </div>
                <div class="glass-card" style="padding: 40px;">
                    <h3 style="margin-bottom: 24px;">Hours of Operation</h3>
                    <ul style="list-style: none; padding: 0; color: var(--text-muted); line-height: 2.2;">
                        <li style="display: flex; justify-content: space-between;"><span>Monday</span> <span>8:00 AM - 5:00 PM</span></li>
                        <li style="display: flex; justify-content: space-between;"><span>Tuesday</span> <span>8:00 AM - 5:00 PM</span></li>
                        <li style="display: flex; justify-content: space-between;"><span>Wednesday</span> <span>8:00 AM - 5:00 PM</span></li>
                        <li style="display: flex; justify-content: space-between;"><span>Thursday</span> <span>8:00 AM - 5:00 PM</span></li>
                        <li style="display: flex; justify-content: space-between;"><span>Friday</span> <span>8:00 AM - 5:00 PM</span></li>
                        <li style="display: flex; justify-content: space-between;"><span>Saturday</span> <span>8:00 AM - 12:00 PM</span></li>
                        <li style="display: flex; justify-content: space-between; color: var(--case-red);"><span>Sunday</span> <span>Closed</span></li>
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
                <img src="/images/company/career-cover.jpg" alt="Careers" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="padding: 40px;">
                    <h3 style="margin-bottom: 15px;">Looking for a Career in Agriculture?</h3>
                    <p style="color: var(--text-muted); margin-bottom: 24px;">We offer competitive wages, benefits, and a great working environment. Contact us today to see what positions are currently available.</p>
                    <a href="mailto:info@roederimplement.com" class="btn btn-primary">Email Your Resume</a>
                </div>
            </div>
        `;
    } else if (page === 'specials') {
        title = "Specials & Promotions";
        icon = "⭐";
        description = "Check out our latest deals on new equipment, used equipment, and parts.";
        contentHtml = `
            <div class="glass-card" style="padding: 0; overflow: hidden; text-align: center; border-color: var(--harvest-gold);">
                <img src="/images/company/special-cover.jpg" alt="Specials" style="width: 100%; height: 250px; object-fit: cover;">
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
