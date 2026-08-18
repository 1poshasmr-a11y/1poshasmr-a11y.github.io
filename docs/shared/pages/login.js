import { SITE } from '../site.js';
export const renderLoginPage = (root) => {
    root.innerHTML = `
        <div class="container section" style="min-height: 80vh; display: flex; align-items: center; justify-content: center;">
            <div class="glass-card" style="max-width: 450px; width: 100%; padding: 40px; text-align: center;">
                
                <div style="font-size: 3rem; margin-bottom: 20px;">👤</div>
                <h1 style="margin-bottom: 10px; font-size: 1.8rem;">Customer Portal</h1>
                <p style="color: var(--text-muted); margin-bottom: 30px; font-size: 0.95rem;">
                    Sign in to track service, view orders, and manage your equipment fleet.
                </p>

                <div id="loginOptions" style="display: flex; flex-direction: column; gap: 15px;">
                    <button class="btn sso-btn" onclick="simulateLogin('Google')">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style="width: 20px; height: 20px; margin-right: 12px;">
                        Continue with Google
                    </button>
                    <button class="btn sso-btn" onclick="simulateLogin('Apple')">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style="width: 20px; height: 20px; margin-right: 12px; filter: invert(1);">
                        Continue with Apple
                    </button>
                    
                    <div style="margin: 20px 0; display: flex; align-items: center; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                        <div style="flex-grow: 1; height: 1px; background: var(--glass-border);"></div>
                        <span style="padding: 0 15px;">or</span>
                        <div style="flex-grow: 1; height: 1px; background: var(--glass-border);"></div>
                    </div>

                    <button class="btn sso-btn passkey-btn" onclick="simulateLogin('Passkey')">
                        <span style="font-size: 1.2rem; margin-right: 12px;">🔑</span>
                        Sign in with a Passkey
                    </button>
                </div>

                <div id="loadingState" style="display: none; padding: 40px 0;">
                    <div class="spinner" style="margin: 0 auto 20px; width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.1); border-left-color: var(--case-red); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="color: var(--text-muted);">Authenticating...</p>
                </div>

                <p style="margin-top: 30px; font-size: 0.85rem; color: var(--text-dim);">
                    By continuing, you agree to ${SITE.name}'s <a href="#" style="color: var(--text-muted);">Terms of Service</a> and <a href="#" style="color: var(--text-muted);">Privacy Policy</a>.
                </p>
            </div>
        </div>

        <style>
            .sso-btn {
                background: var(--dark-surface-2);
                border: 1px solid var(--glass-border);
                color: white;
                padding: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                font-weight: 500;
                transition: all 0.2s;
            }
            .sso-btn:hover {
                background: rgba(255,255,255,0.1);
                border-color: rgba(255,255,255,0.2);
            }
            .passkey-btn {
                background: rgba(212, 168, 67, 0.1);
                border-color: rgba(212, 168, 67, 0.3);
            }
            .passkey-btn:hover {
                background: rgba(212, 168, 67, 0.2);
                border-color: rgba(212, 168, 67, 0.5);
            }
            @keyframes spin {
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    // Attach function to window for the onclick handlers
    window.simulateLogin = (provider) => {
        document.getElementById('loginOptions').style.display = 'none';
        document.getElementById('loadingState').style.display = 'block';
        
        // Fake authentication delay
        setTimeout(() => {
            window.location.hash = '#/portal';
        }, 1500);
    };
};
