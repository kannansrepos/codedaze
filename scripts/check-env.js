require('dotenv').config();

console.log('='.repeat(60));
console.log('Environment Variable Check');
console.log('='.repeat(60));
console.log('NEXT_PUBLIC_CRON_SCHEDULE:', process.env.NEXT_PUBLIC_CRON_SCHEDULE);
console.log('Expected value: * * * * *');
console.log('='.repeat(60));

if (!process.env.NEXT_PUBLIC_CRON_SCHEDULE)
{
  console.log('❌ NEXT_PUBLIC_CRON_SCHEDULE is NOT SET in .env file!');
  console.log('Please add this line to your .env file:');
  console.log('NEXT_PUBLIC_CRON_SCHEDULE=* * * * *');
} else if (process.env.NEXT_PUBLIC_CRON_SCHEDULE === '* * * * *')
{
  console.log('✅ Cron schedule is correctly set to run every minute!');
} else
{
  console.log('⚠️  Cron schedule is set to:', process.env.NEXT_PUBLIC_CRON_SCHEDULE);
  console.log('Change it to: * * * * *');
}
console.log('='.repeat(60));
