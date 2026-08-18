export const renderAlertsPage = (root) => {
    root.innerHTML = `
        <div class="container section" style="max-width: 800px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 class="section-title" style="margin-bottom: 10px;">Equipment Alerts</h1>
                <p style="color: var(--text-muted); font-size: 1.05rem;">
                    Never miss the right piece of equipment again. Tell us what you're looking for, and we'll notify you the moment it hits our lot.
                </p>
            </div>

            <div class="info-banner" style="margin-bottom: 28px;">
                <span>🔔</span>
                <span>Alerts are sent by email when matching inventory is added. Signing up is free &mdash; no account required.</span>
            </div>

            <div class="glass-card" style="padding: 40px;" id="alertFormContainer">
                <form id="alertForm">
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

                    <h3 style="margin: 30px 0 15px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">Equipment Preferences</h3>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Equipment Category</label>
                            <select name="category" class="form-control" required>
                                <option value="">Select Category...</option>
                                <option value="tractor">Tractors</option>
                                <option value="harvesting">Harvesting</option>
                                <option value="construction">Construction</option>
                                <option value="attachment">Attachments</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Brand Preference</label>
                            <select name="brand" class="form-control">
                                <option value="any">Any Brand</option>
                                <option value="case-ih">Case IH</option>
                                <option value="kubota">Kubota</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Max Price ($)</label>
                        <input type="number" name="maxPrice" class="form-control" placeholder="e.g. 50000">
                    </div>

                    <div class="form-group">
                        <label class="form-label">What should we watch for? (Select all that apply)</label>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" name="watchNew" checked style="width: 18px; height: 18px; accent-color: var(--case-red);">
                                New Arrivals
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" name="watchPrice" style="width: 18px; height: 18px; accent-color: var(--case-red);">
                                Price Drops on existing inventory
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group" style="margin-top: 20px;">
                        <label class="form-label">Additional Notes or Specific Models</label>
                        <textarea name="notes" class="form-control" rows="3" placeholder="e.g. Looking for a Magnum 340 with less than 1000 hours..."></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.1rem; margin-top: 20px;">
                        Set Up My Alert
                    </button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('alertForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.name = `${data.firstName} ${data.lastName}`;
        data.watchNew = formData.has('watchNew');
        data.watchPrice = formData.has('watchPrice');
        
        const container = document.getElementById('alertFormContainer');
        
        // Visual feedback
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🚜</div>
                <h2>Setting up your alert...</h2>
            </div>
        `;

        try {
            await fetch('/api/alerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;" class="animate-fade-in">
                    <div style="width: 72px; height: 72px; background: var(--farm-green); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 24px; box-shadow: 0 0 30px rgba(27,77,62,0.5);">
                        ✓
                    </div>
                    <h2 style="margin-bottom: 12px; font-size: 1.8rem;">Alert Set Successfully!</h2>
                    <p style="color: var(--text-muted); margin-bottom: 32px; max-width: 420px; margin-left: auto; margin-right: auto;">
                        We've saved your preferences. You'll get an email the moment matching equipment arrives on our lot.
                    </p>
                    <div style="display:flex; gap:12px; justify-content:center;">
                        <a href="#/equipment" class="btn btn-outline">Browse Current Inventory</a>
                        <a href="#/" class="btn btn-ghost">Back to Home</a>
                    </div>
                </div>
            `;

        } catch (err) {
            container.innerHTML = `<div style="color: red; text-align: center;">Error setting alert. Please try again.</div>`;
        }
    });
};
