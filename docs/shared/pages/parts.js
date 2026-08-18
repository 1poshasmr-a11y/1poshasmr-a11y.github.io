import { SITE } from '../site.js';
export const renderPartsPage = (root) => {
    root.innerHTML = `
        <div class="container section" style="max-width: 800px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 class="section-title" style="margin-bottom: 10px;">Parts Request</h1>
                <p style="color: var(--text-muted); font-size: 1.1rem;">
                    Need a specific part? Fill out the form below and our parts department will get back to you with a quote and availability.
                </p>
            </div>

            <div class="glass-card" style="padding: 40px;" id="partsFormContainer">
                <form id="partsForm">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">First Name</label>
                            <input type="text" name="firstName" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Last Name</label>
                            <input type="text" name="lastName" class="form-control" required>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Email Address</label>
                            <input type="email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone Number (Optional)</label>
                            <input type="tel" name="phone" class="form-control">
                        </div>
                    </div>

                    <h3 style="margin: 30px 0 15px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">Equipment Information</h3>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Make</label>
                            <input type="text" name="make" class="form-control" placeholder="e.g. ${SITE.brands[0]}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Model</label>
                            <input type="text" name="model" class="form-control" placeholder="e.g. ${SITE.modelExample}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Year (Optional)</label>
                            <input type="text" name="year" class="form-control" placeholder="e.g. 2018">
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 15px;">
                        <label class="form-label">Serial Number / VIN (Optional but recommended)</label>
                        <input type="text" name="serial" class="form-control">
                    </div>

                    <div class="form-group" style="margin-top: 20px;">
                        <label class="form-label">Parts Needed</label>
                        <textarea class="form-control" name="parts" rows="4" placeholder="Please list the part numbers (if known) and/or describe the parts you need..." required></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.1rem; margin-top: 20px;">
                        Submit Parts Request
                    </button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('partsForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const container = document.getElementById('partsFormContainer');
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.name = `${data.firstName} ${data.lastName}`;
        
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">⏳</div>
                <h2>Submitting request...</h2>
            </div>
        `;

        try {
            await fetch(SITE.api('/parts-requests'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;" class="animate-fade-in">
                    <div style="width: 72px; height: 72px; background: var(--farm-green); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 24px; box-shadow: 0 0 30px rgba(27,77,62,0.5);">
                        ✓
                    </div>
                    <h2 style="margin-bottom: 12px; font-size: 1.8rem;">Request Received!</h2>
                    <p style="color: var(--text-muted); margin-bottom: 32px; max-width: 420px; margin-left: auto; margin-right: auto;">
                        Thank you. Our parts department will review your request and contact you shortly with a quote and availability.
                    </p>
                    <div style="display:flex; gap:12px; justify-content:center;">
                        <a href="#/" class="btn btn-ghost">Back to Home</a>
                    </div>
                </div>
            `;
        } catch (err) {
            container.innerHTML = `<div style="color: red; text-align: center;">Error submitting request. Please try again.</div>`;
        }
    });
};
