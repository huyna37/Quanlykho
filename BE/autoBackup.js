const cron = require('node-cron');
const { MongoClient } = require('mongodb');
const { exec } = require('child_process');
const fs = require('fs');

const backup = async () => {
    const date = new Date().toISOString().replace(/:/g, '-'); // Remove colons from the date to use in the file name
    const backupDir = './backups';
    const backupFileName = `backup-${date}.json`;
    const backupFilePath = `${backupDir}/${backupFileName}`;

    // Create a backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    // MongoDB connection URL
    const uri = process.env.MONGO; // Replace with your MongoDB connection string

    try {
        const client = await MongoClient.connect(uri);
        const db = client.db();

        // Get a list of all collections in the database
        const collections = await db.listCollections().toArray();

        // Export each collection to a JSON file
        for (const collection of collections) {
            const collectionName = collection.name;
            const collectionBackupFilePath = `${backupDir}/${collectionName}.json`;

            // Execute the mongoexport command to export a collection in JSON format
            await exec(`mongoexport --uri="${uri}" --collection=${collectionName} --out=${collectionBackupFilePath} --jsonArray`, {
                shell: '/bin/bash'
            });
        }

        console.log('Backup completed successfully.');

        // Close the MongoDB connection
        await client.close();
    } catch (error) {
        console.error(`Backup process failed: ${error.message}`);
    }
};
// Schedule the backup function to run daily at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    backup();
});