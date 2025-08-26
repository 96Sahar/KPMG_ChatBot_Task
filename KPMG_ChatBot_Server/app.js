import initApp from './server.js';
const PORT = process.env.PORT;

const appInitiation = async () => {
	const app = await initApp();
	app.listen(PORT, () => {
		console.log(`Server is running`);
	});
};

appInitiation();
