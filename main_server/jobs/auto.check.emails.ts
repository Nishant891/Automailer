import schedule from "node-schedule";
import fs from "fs";
const checkNewEmails = () => {
    const path = './files/db.json';

    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            checkNewEmails();
        }

        const existingUsers = JSON.parse(data);

        existingUsers.forEach((user) => {
            
        });
    });
}

export const scheduler = () => {
    schedule.scheduleJob('*/30 * * * * *', () => {
        checkNewEmails();
    })
}