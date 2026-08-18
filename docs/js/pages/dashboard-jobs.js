export const renderDashboardJobs = async (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="margin-bottom: 20px;">
                <a href="#/dashboard" class="btn btn-ghost" style="padding: 8px 0;">← Back to Dashboard</a>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 class="section-title" style="margin-bottom: 0;">Job Postings</h1>
                <button class="btn btn-primary" id="openJobModalBtn" style="padding: 10px 20px;">+ Post New Job</button>
            </div>

            <div class="glass-card" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-muted);">
                            <th style="padding: 16px;">Job Title</th>
                            <th style="padding: 16px;">Department</th>
                            <th style="padding: 16px;">Type</th>
                            <th style="padding: 16px;">Date Posted</th>
                            <th style="padding: 16px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="jobsTableBody">
                        <tr>
                            <td colspan="5" style="padding: 30px; text-align: center;">Loading jobs...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Job Modal -->
        <div id="jobModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center;">
            <div class="glass-card" style="width: 100%; max-width: 600px; padding: 40px; margin: 20px; max-height: 90vh; overflow-y: auto;">
                <h2 style="margin-bottom: 20px;">Post a New Job</h2>
                <form id="newJobForm">
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" name="title" class="form-control" required>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Department</label>
                            <select name="department" class="form-control" required>
                                <option value="Service">Service</option>
                                <option value="Parts">Parts</option>
                                <option value="Sales">Sales</option>
                                <option value="Admin">Admin</option>
                                <option value="Precision Farming">Precision Farming</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Employment Type</label>
                            <select name="type" class="form-control" required>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Job Description</label>
                        <textarea name="description" class="form-control" rows="6" required placeholder="Describe the responsibilities and requirements..."></textarea>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 30px;">
                        <button type="button" class="btn btn-outline" id="closeJobModalBtn">Cancel</button>
                        <button type="submit" class="btn btn-primary">Post Job</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const jobModal = document.getElementById('jobModal');
    document.getElementById('openJobModalBtn').addEventListener('click', () => {
        jobModal.style.display = 'flex';
    });
    document.getElementById('closeJobModalBtn').addEventListener('click', () => {
        jobModal.style.display = 'none';
        document.getElementById('newJobForm').reset();
    });

    async function loadJobs() {
        try {
            const res = await fetch('/api/jobs');
            const jobs = await res.json();
            const tbody = document.getElementById('jobsTableBody');
            
            if (jobs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="padding: 30px; text-align: center;">No job postings found.</td></tr>';
                return;
            }

            window.deleteJob = async (id) => {
                if(confirm('Are you sure you want to delete this job posting?')) {
                    await fetch('/api/jobs/' + id, { method: 'DELETE' });
                    loadJobs();
                }
            };

            tbody.innerHTML = jobs.reverse().map(job => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 16px; font-weight: bold;">${job.title}</td>
                    <td style="padding: 16px;">${job.department}</td>
                    <td style="padding: 16px;">${job.type}</td>
                    <td style="padding: 16px;">${new Date(job.datePosted).toLocaleDateString()}</td>
                    <td style="padding: 16px;">
                        <button class="btn btn-outline btn-sm" style="color: var(--case-red); border-color: rgba(204,0,0,0.3);" onclick="window.deleteJob('${job.id}')">Delete</button>
                    </td>
                </tr>
            `).join('');
        } catch (e) {
            document.getElementById('jobsTableBody').innerHTML = '<tr><td colspan="5" style="padding: 30px; text-align: center; color: red;">Error loading jobs.</td></tr>';
        }
    }

    document.getElementById('newJobForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        await fetch('/api/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        jobModal.style.display = 'none';
        document.getElementById('newJobForm').reset();
        loadJobs();
    });

    loadJobs();
};
