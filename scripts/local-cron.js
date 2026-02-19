require('dotenv').config();
const http = require('http');

const schedule = process.env.NEXT_PUBLIC_CRON_SCHEDULE || '*/5 * * * *';
const port = process.env.PORT || 3000;
const url = `http://localhost:${port}/api/cron/generate`;

console.log(`[Local Cron] Initialized with schedule: ${schedule}`);
console.log(`[Local Cron] Targeting: ${url}`);

// Simple parser for cron format
function getIntervalMs(cron)
{
  try
  {
    const parts = cron.split(' ');
    // Handle */N format (e.g., */5 means every 5 minutes)
    if (parts[0].startsWith('*/'))
    {
      const mins = parseInt(parts[0].replace('*/', ''));
      return mins * 60 * 1000;
    }
    // Handle * format (every minute)
    if (parts[0] === '*')
    {
      return 1 * 60 * 1000; // 1 minute
    }
  } catch (e)
  {
    console.error('[Local Cron] Failed to parse schedule:', e);
  }
  return 5 * 60 * 1000; // Default 5 mins
}

const interval = getIntervalMs(schedule);
console.log(`[Local Cron] Running every ${interval / 60000} minute(s)`);

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
