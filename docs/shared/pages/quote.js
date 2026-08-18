import { SITE } from '../site.js';
export const renderQuotePage = (root) => {
    root.innerHTML = `
        <div class="container section" style="max-width: 800px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 class="section-title" style="margin-bottom: 10px;">Request a Quote or Value Your Trade</h1>
                <p style="color: var(--text-muted); font-size: 1.1rem;">
                    Get competitive pricing on new and used equipment, or see what your current machine is worth.
                </p>
            </div>

            <div class="glass-card" style="padding: 40px;" id="quoteFormContainer">
                
                <!-- Progress Bar -->
                <div style="margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; color: var(--text-muted);">
                        <span id="stepLabel">Step 1 of 3: What do you need?</span>
                    </div>
                    <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                        <div id="progressBar" style="height: 100%; width: 33%; background: var(--case-red); transition: width 0.3s ease;"></div>
                    </div>
                </div>

                <form id="quoteForm">
                    
                    <!-- Step 1: Type of Request -->
                    <div id="step1" class="form-step">
                        <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                            <label class="quote-type-card">
                                <input type="radio" name="requestType" value="new_quote" checked style="display:none;">
                                <div class="card-content">
                                    <div style="font-size: 2rem; margin-bottom: 10px;">🚜</div>
                                    <h3 style="margin-bottom: 5px;">Quote on Equipment</h3>
                                    <p style="font-size: 0.9rem; color: var(--text-muted);">I'm looking to buy a specific machine or attachment.</p>
                                </div>
                            </label>
                            
                            <label class="quote-type-card">
                                <input type="radio" name="requestType" value="trade_in" style="display:none;">
                                <div class="card-content">
                                    <div style="font-size: 2rem; margin-bottom: 10px;">🔄</div>
                                    <h3 style="margin-bottom: 5px;">Value My Trade</h3>
                                    <p style="font-size: 0.9rem; color: var(--text-muted);">I want to see what my current equipment is worth.</p>
                                </div>
                            </label>

                        </div>
                        <button type="button" class="btn btn-primary next-btn" style="width: 100%; margin-top: 30px; padding: 15px;">Continue to Details</button>
                    </div>

                    <!-- Step 2: Equipment Details (Dynamic based on Step 1) -->
                    <div id="step2" class="form-step" style="display: none;">
                        <h3 style="margin-bottom: 20px;" id="step2Title">Equipment Details</h3>
                        
                        <div class="form-group">
                            <label class="form-label">Brand</label>
                            <input type="text" name="brand" class="form-control" placeholder="e.g. ${SITE.brandExamples}">
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="form-group">
                                <label class="form-label">Model</label>
                                <input type="text" name="model" class="form-control" placeholder="e.g. ${SITE.modelExample}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Year (if known)</label>
                                <input type="text" name="year" class="form-control" placeholder="e.g. 2024">
                            </div>
                        </div>

                        <!-- Trade-in specific fields -->
                        <div id="tradeInFields" style="display: none; background: rgba(255,255,255,0.02); padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px dashed var(--glass-border);">
                            <h4 style="margin-bottom: 15px;">Trade-In Specifics</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div class="form-group">
                                    <label class="form-label">Hours / Miles</label>
                                    <input type="text" name="hours" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Condition</label>
                                    <select name="condition" class="form-control">
                                        <option>Excellent</option>
                                        <option>Good</option>
                                        <option>Fair</option>
                                        <option>Needs Repair</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label">Upload Photos (Optional Demo)</label>
                                <div style="border: 2px dashed var(--glass-border); padding: 30px; text-align: center; border-radius: 8px; color: var(--text-muted); cursor: pointer;">
                                    Drag & drop photos here or click to browse
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Additional Notes</label>
                            <textarea name="notes" class="form-control" rows="3"></textarea>
                        </div>

                        <div style="display: flex; gap: 15px; margin-top: 30px;">
                            <button type="button" class="btn btn-outline prev-btn" style="flex: 1; padding: 15px;">Back</button>
                            <button type="button" class="btn btn-primary next-btn" style="flex: 2; padding: 15px;">Continue to Contact Info</button>
                        </div>
                    </div>

                    <!-- Step 3: Contact Info -->
                    <div id="step3" class="form-step" style="display: none;">
                        <h3 style="margin-bottom: 20px;">Contact Information</h3>
                        
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
                                <label class="form-label">Phone Number</label>
                                <input type="tel" name="phone" class="form-control" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Preferred Contact Method</label>
                            <div style="display: flex; gap: 20px; margin-top: 10px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="contactPref" value="phone" checked style="accent-color: var(--case-red);"> Phone
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="contactPref" value="email" style="accent-color: var(--case-red);"> Email
                                </label>
                            </div>
                        </div>

                        <div style="display: flex; gap: 15px; margin-top: 30px;">
                            <button type="button" class="btn btn-outline prev-btn" style="flex: 1; padding: 15px;">Back</button>
                            <button type="submit" class="btn btn-primary" style="flex: 2; padding: 15px; font-size: 1.1rem;">Submit Request</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>

        <style>
            .quote-type-card .card-content {
                padding: 20px;
                border: 2px solid var(--glass-border);
                border-radius: 8px;
                background: rgba(255,255,255,0.02);
                transition: all 0.2s ease;
            }
            .quote-type-card input:checked + .card-content {
                border-color: var(--case-red);
                background: rgba(204,0,0,0.05);
            }
            .quote-type-card input:focus-visible + .card-content {
                outline: 2px solid white;
                outline-offset: 2px;
            }
        </style>
    `;

    // Multi-step logic
    let currentStep = 1;
    const updateUI = () => {
        document.querySelectorAll('.form-step').forEach((el, i) => {
            el.style.display = (i + 1 === currentStep) ? 'block' : 'none';
        });
        
        document.getElementById('progressBar').style.width = `${(currentStep / 3) * 100}%`;
        
        const labels = ['What do you need?', 'Equipment Details', 'Contact Information'];
        document.getElementById('stepLabel').innerText = `Step ${currentStep} of 3: ${labels[currentStep - 1]}`;

        // Handle Trade-in fields visibility
        if (currentStep === 2) {
            const reqType = document.querySelector('input[name="requestType"]:checked').value;
            const tradeInFields = document.getElementById('tradeInFields');
            const title = document.getElementById('step2Title');
            
            if (reqType === 'trade_in') {
                tradeInFields.style.display = 'block';
                title.innerText = 'Trade-In Details';
            } else if (reqType === 'parts') {
                tradeInFields.style.display = 'none';
                title.innerText = 'Parts Details';
            } else {
                tradeInFields.style.display = 'none';
                title.innerText = 'Equipment You Are Looking For';
            }
        }
    };

    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < 3) currentStep++;
            updateUI();
        });
    });

    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) currentStep--;
            updateUI();
        });
    });

    // Parse Query Params to pre-fill form
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    if (urlParams.has('type')) {
        const reqType = urlParams.get('type');
        const radio = document.querySelector(`input[name="requestType"][value="${reqType}"]`);
        if (radio) {
            radio.checked = true;
        }
    }
    if (urlParams.has('brand')) {
        document.querySelector('input[name="brand"]').value = urlParams.get('brand');
    }
    if (urlParams.has('model')) {
        document.querySelector('input[name="model"]').value = urlParams.get('model');
    }
    if (urlParams.has('year')) {
        document.querySelector('input[name="year"]').value = urlParams.get('year');
    }

    // Auto-advance to step 2 if we pre-filled data
    if (urlParams.has('type')) {
        currentStep = 2;
        updateUI();
    }

    // Form Submission
    document.getElementById('quoteForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.tradeIn = data.requestType === 'trade_in';
        data.name = `${data.firstName} ${data.lastName}`;
        
        const container = document.getElementById('quoteFormContainer');
        
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">⏳</div>
                <h2>Submitting request...</h2>
            </div>
        `;

        try {
            await fetch(SITE.api('/quotes'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;" class="animate-fade-in">
                    <div style="width: 60px; height: 60px; background: var(--farm-green); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 20px;">
                        ✓
                    </div>
                    <h2 style="margin-bottom: 15px;">Request Received!</h2>
                    <p style="color: var(--text-muted); margin-bottom: 30px;">
                        Thank you for reaching out. A member of our sales team will contact you within 24 hours regarding your request.
                    </p>
                    <a href="#/" class="btn btn-outline">Return to Home</a>
                </div>
            `;
        } catch (err) {
            container.innerHTML = `<div style="color: red; text-align: center;">Error submitting request. Please try again.</div>`;
        }
    });
};
