import { getApp } from './app';

const main = async () => {
    try {
        const { app, ServerConfig } = await getApp();
        app.listen(ServerConfig.port, () => {
            console.log(`Server is running on ${ServerConfig.hostname}:${ServerConfig.port}`);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
main();