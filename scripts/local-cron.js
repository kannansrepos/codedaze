require('dotenv').config();
const http = require('http');

const schedule = process.env.NEXT_PUBLIC_CRON_SCHEDULE || '*/5 * * * *';
const port = process.env.PORT || 3000;
const url = `http://localhost:${port}/api/cron/generate`;

console.log(`[Local Cron] Initialized with schedule: ${schedule}`);
console.log(`[Local Cron] Targeting: ${url}`);

// Simple parser for */N * * * * format
function getIntervalMs(cron)
{
  try
  {
    const parts = cron.split(' ');
    if (parts[0].startsWith('*/'))
    {
      const mins = parseInt(parts[0].replace('*/', ''));
      // Minimum 15 minutes for local testing to avoid 429
      const safeMins = Math.max(mins, 15);
      return safeMins * 60 * 1000;
    }
  } catch (e) { }
  return 15 * 60 * 1000; // Default 15 mins
}

const interval = 15 * 60 * 1000;
console.log(`[Local Cron] FORCED: Running every 15 minutes to avoid rate limits`);

async function triggerCron()
{
  console.log(`[Local Cron] Triggering: ${new Date().toISOString()}`);
  http.get(url, (res) =>
  {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () =>
    {
      console.log(`[Local Cron] Status: ${res.statusCode}`);
      console.log(`[Local Cron] Response: ${data}`);
    });
  }).on('error', (err) =>
  {
    console.error(`[Local Cron] Error: ${err.message}. Is the dev server running?`);
  });
}

// Initial trigger
setTimeout(triggerCron, 5000); // Wait 5s for server to start

// Loop
setInterval(triggerCron, interval);
