// ================================================================
// APP CONTROLLER - UI, persistence, background mode
// ================================================================

// DOM refs
const $ = id => document.getElementById(id);
const seedDisplay = $('seedDisplay');
const statChecked = $('statChecked');
const statFound = $('statFound');
const statRate = $('statRate');
const statTime = $('statTime');
const logBox = $('logBox');
const foundList = $('foundList');
const foundBadge = $('foundBadge');
const btnStart = $('btnStart');
const btnStop = $('btnStop');
const btnClear = $('btnClear');
const speedSlider = $('speedSlider');
const speedLabel = $('speedLabel');
const persistBar = $('persistBar');
const persistText = $('persistText');

// State
let running = false;
let checked = 0;
let found = 0;
let startTime = 0;
let foundWallets = [];

// Load saved data
function loadSaved() {
    try {
        const saved = localStorage.getItem('seedhunter_found');
        if (saved) {
            foundWallets = JSON.parse(saved);
            found = foundWallets.length;
            renderFoundWallets();
            statFound.textContent = found;
            foundBadge.textContent = `(${found})`;
        }
        const savedChecked = localStorage.getItem('seedhunter_checked');
        if (savedChecked) {
            checked = parseInt(savedChecked) || 0;
            statChecked.textContent = checked.toLocaleString();
        }
    } catch(e) {}
}

function saveFound() {
    try {
        localStorage.setItem('seedhunter_found', JSON.stringify(foundWallets));
        localStorage.setItem('seedhunter_checked', checked.toString());
    } catch(e) {}
}

function log(msg, type = 'info') {
    const d = document.createElement('div');
    d.className = type;
    d.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logBox.appendChild(d);
    logBox.scrollTop = logBox.scrollHeight;
}

function renderFoundWallets() {
    if (foundWallets.length === 0) {
        foundList.innerHTML = '<div style="color:#555;text-align:center;padding:20px;font-size:0.85rem;">No wallets found yet</div>';
        btnClear.style.display = 'none';
        return;
    }
    btnClear.style.display = 'block';
    let html = '';
    for (const w of foundWallets) {
        html += `<div class="found-item">
            <div class="bal">💰 ${w.network.toUpperCase()} — ${parseFloat(w.balance).toFixed(8)}</div>
            <div class="addr">${w.address}</div>
            <div class="seed-text">📝 ${w.seed}</div>
            <div style="color:#555;font-size:0.6rem;margin-top:4px">${w.time}</div>
        </div>`;
    }
    foundList.innerHTML = html;
}

function getNetworks() {
    const labels = document.querySelectorAll('#networks label');
    const nets = [];
    labels.forEach(l => { const cb = l.querySelector('input'); if (cb.checked) nets.push(cb.value); });
    return nets;
}

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        persistBar.className = 'persist-bar active';
        persistText.textContent = 'Background persistence active — will run even if screen off';
    }).catch(() => {
        persistBar.className = 'persist-bar inactive';
        persistText.textContent = 'Background mode unavailable (use Chrome, not in private/incognito)';
    });
}

// Speed slider
speedSlider.addEventListener('input', () => speedLabel.textContent = speedSlider.value);

// Network toggle
document.querySelectorAll('#networks label').forEach(l => {
    const cb = l.querySelector('input');
    cb.addEventListener('change', () => l.classList.toggle('checked', cb.checked));
});

// Tabs
document.querySelectorAll('.tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        $(btn.dataset.tab === 'log' ? 'tabLog' : 'tabFound').classList.add('active');
    });
});

// Clear
btnClear.addEventListener('click', () => {
    if (confirm('Clear all found wallet records?')) {
        foundWallets = [];
        found = 0;
        statFound.textContent = '0';
        foundBadge.textContent = '(0)';
        saveFound();
        renderFoundWallets();
        log('Cleared all records', 'info');
    }
});

// ================================================================
// MAIN SCAN LOOP
// ================================================================
async function scanLoop() {
    if (!running) return;
    
    const speed = parseInt(speedSlider.value);
    const networks = getNetworks();
    
    if (networks.length === 0) {
        log('Select at least one network!', 'err');
        stopScan();
        return;
    }
    
    // Batch of seeds
    for (let i = 0; i < speed && running; i++) {
        const seed = generateSeed();
        seedDisplay.textContent = seed;
        
        // Check each network in parallel
        const results = await Promise.allSettled(networks.map(async (net) => {
            const addr = deriveAddress(seed, net);
            const balance = await CHECKERS[net](addr);
            return { net, addr, balance, seed };
        }));
        
        checked++;
        
        for (const r of results) {
            if (r.status === 'fulfilled' && r.value && r.value.balance !== null && r.value.balance > 0) {
                const hit = r.value;
                found++;
                foundWallets.push({
                    network: hit.net,
                    address: hit.addr,
                    balance: hit.balance,
                    seed: hit.seed,
                    time: new Date().toLocaleString()
                });
                saveFound();
                renderFoundWallets();
                foundBadge.textContent = `(${found})`;
                statFound.textContent = found;
                
                log(`🔥 FOUND ${hit.net.toUpperCase()} | ${hit.balance} | ${hit.addr.slice(0,12)}...`, 'found');
                log(`Seed: ${seed}`, 'found');
                
                // Try notification
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('💰 Wallet Found!', { body: `${hit.net.toUpperCase()}: ${hit.balance} coins\n${seed}`, icon: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E💰%3C/text%3E%3C/svg%3E' });
                }
            }
        }
        
        // Update stats
        const elapsed = (Date.now() - startTime) / 1000;
        statChecked.textContent = checked.toLocaleString();
        statRate.textContent = elapsed > 0 ? (checked / elapsed).toFixed(1) : '0';
        statTime.textContent = elapsed > 60 ? Math.floor(elapsed/60) + 'm' : Math.floor(elapsed) + 's';
        
        // Save progress every 1000
        if (checked % 1000 === 0) saveFound();
    }
    
    if (running) requestAnimationFrame(scanLoop);
}

function stopScan() {
    running = false;
    btnStart.disabled = false;
    btnStop.disabled = true;
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    log(`Stopped. Checked ${checked.toLocaleString()} in ${elapsed}s`, 'info');
    saveFound();
}

btnStart.addEventListener('click', () => {
    if (running) return;
    running = true;
    btnStart.disabled = true;
    btnStop.disabled = false;
    startTime = Date.now();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    log('🚀 Scan started! Checking random 12-word seeds...', 'info');
    log(`Networks: ${getNetworks().join(', ')}`, 'info');
    log(`Speed: ${speedSlider.value} seeds/batch`, 'info');
    
    scanLoop();
});

btnStop.addEventListener('click', stopScan);

// Init
loadSaved();
log('Ready. ' + checked.toLocaleString() + ' seeds checked in this session previously.', 'info');
