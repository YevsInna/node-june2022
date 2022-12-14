const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const OAuth = require('../db/OAuth');

dayjs.extend(utc);

module.exports = new CronJob(
    '* * * * * *',
    async function () {
        try {
            console.log('Start removing tokens')
            const monthAgo = dayjs().utc().subtract(1, 'month');

            await OAuth.deleteMany({createdAt: {$lte: monthAgo}});
            console.log('End removing tokens');

        } catch (e) {
            console.error(e)
        }
        console.log('You will see this message every second');
    },
);
