export const renderPortalPage = (root) => {
    root.innerHTML = `
        <div class="container section">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; border-bottom: 1px solid var(--glass-border); padding-bottom: 20px;">
                <div>
                    <h1 style="font-size: 2.2rem; margin-bottom: 5px;">Welcome back, John!</h1>
                    <p style="color: var(--text-muted);">Manage your equipment, service, and orders.</p>
                </div>
                <div>
                    <a href="#/login" class="btn btn-outline btn-sm">Sign Out</a>
                </div>
            </div>

            <div class="portal-grid">
                
                <!-- Left Column -->
                <div class="portal-col">
                    
                    <!-- My Garage (Service Tracking) -->
                    <div class="glass-card" style="padding: 30px; margin-bottom: 30px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h2 style="font-size: 1.5rem; display: flex; align-items: center; gap: 10px;">
                                🚜 My Garage
                            </h2>
                            <button class="btn btn-outline btn-sm">+ Add Equipment</button>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: 8px; padding: 20px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--case-red);"></div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                <div>
                                    <h3 style="font-size: 1.2rem; margin-bottom: 5px;">2024 Case IH Magnum 340</h3>
                                    <p style="color: var(--text-muted); font-size: 0.9rem;">VIN: 1A9C4M34X0F9281</p>
                                </div>
                                <span class="badge badge-yellow">In the Shop</span>
                            </div>

                            <!-- Service Tracker Timeline -->
                            <div style="margin-top: 25px;">
                                <h4 style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Service Status</h4>
                                
                                <div class="timeline">
                                    <div class="timeline-step active">
                                        <div class="step-icon">✓</div>
                                        <div class="step-text">Received<br><span style="font-size:0.8rem; color:var(--text-muted);">Oct 12</span></div>
                                    </div>
                                    <div class="timeline-line active"></div>
                                    <div class="timeline-step active">
                                        <div class="step-icon">✓</div>
                                        <div class="step-text">Inspected<br><span style="font-size:0.8rem; color:var(--text-muted);">Oct 13</span></div>
                                    </div>
                                    <div class="timeline-line active"></div>
                                    <div class="timeline-step current">
                                        <div class="step-icon">⏳</div>
                                        <div class="step-text">Repairing<br><span style="font-size:0.8rem; color:var(--harvest-gold);">In Progress</span></div>
                                    </div>
                                    <div class="timeline-line"></div>
                                    <div class="timeline-step">
                                        <div class="step-icon"></div>
                                        <div class="step-text">Ready<br><span style="font-size:0.8rem; color:var(--text-muted);">Est. Oct 15</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Order History -->
                    <div class="glass-card" style="padding: 30px;">
                        <h2 style="font-size: 1.5rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            📦 Recent Orders
                        </h2>
                        
                        <div style="border-bottom: 1px solid var(--glass-border); padding-bottom: 15px; margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                <span style="font-weight: 600;">Order #892-A</span>
                                <span style="color: var(--farm-green);">Delivered</span>
                            </div>
                            <div style="color: var(--text-muted); font-size: 0.9rem; display: flex; justify-content: space-between;">
                                <span>Hydraulic Filter (x2), Engine Oil 5-Gal</span>
                                <span>$142.50</span>
                            </div>
                        </div>

                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                <span style="font-weight: 600;">Order #901-B</span>
                                <span style="color: var(--harvest-gold);">Shipped</span>
                            </div>
                            <div style="color: var(--text-muted); font-size: 0.9rem; display: flex; justify-content: space-between;">
                                <span>Replacement Belt - 1400 Series</span>
                                <a href="#" style="color: var(--case-red); text-decoration: none;">Track Package</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="portal-col">
                    <!-- Inbox -->
                    <div class="glass-card" style="padding: 30px; height: 100%; display: flex; flex-direction: column;">
                        <h2 style="font-size: 1.5rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            💬 Messages <span style="background: var(--case-red); color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">1</span>
                        </h2>

                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 15px; overflow-y: auto;">
                            <!-- Message Bubble 1 -->
                            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 3px solid var(--harvest-gold);">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                    <span style="font-weight: 600; font-size: 0.9rem;">Dave in Service</span>
                                    <span style="color: var(--text-muted); font-size: 0.8rem;">Yesterday, 3:15 PM</span>
                                </div>
                                <p style="font-size: 0.95rem; line-height: 1.5;">
                                    Hey John, just letting you know we found a cracked fan belt during the inspection on the Magnum. Want us to replace it while it's here? It's about $45 for the part.
                                </p>
                            </div>

                            <!-- Reply Bubble -->
                            <div style="background: rgba(204,0,0,0.1); padding: 15px; border-radius: 8px; align-self: flex-end; width: 85%;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                    <span style="font-weight: 600; font-size: 0.9rem;">You</span>
                                    <span style="color: var(--text-muted); font-size: 0.8rem;">Yesterday, 4:02 PM</span>
                                </div>
                                <p style="font-size: 0.95rem; line-height: 1.5;">
                                    Yeah, go ahead and replace it Dave. Thanks for catching that.
                                </p>
                            </div>
                        </div>

                        <!-- Compose Box -->
                        <div style="margin-top: 20px; display: flex; gap: 10px;">
                            <input type="text" class="form-control" placeholder="Type a message..." style="flex-grow: 1; background: rgba(255,255,255,0.02);">
                            <button class="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <style>
            .portal-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 30px;
            }
            @media (max-width: 900px) {
                .portal-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            /* Timeline Styles */
            .timeline {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin: 20px 0;
            }
            .timeline-step {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                z-index: 2;
                width: 60px;
            }
            .step-icon {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: var(--dark-surface);
                border: 2px solid var(--glass-border);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 8px;
                font-size: 1rem;
                transition: all 0.3s;
            }
            .step-text {
                font-size: 0.85rem;
                text-align: center;
                font-weight: 600;
                line-height: 1.4;
            }
            .timeline-line {
                flex-grow: 1;
                height: 3px;
                background: var(--glass-border);
                margin: 0 -20px 30px -20px;
                z-index: 1;
                transition: all 0.3s;
            }
            
            /* Active States */
            .timeline-step.active .step-icon {
                background: var(--farm-green);
                border-color: var(--farm-green);
                color: white;
            }
            .timeline-line.active {
                background: var(--farm-green);
            }
            .timeline-step.current .step-icon {
                border-color: var(--harvest-gold);
                box-shadow: 0 0 15px rgba(212, 168, 67, 0.3);
            }
            .timeline-step.current .step-text {
                color: var(--harvest-gold);
            }
        </style>
    `;
};
