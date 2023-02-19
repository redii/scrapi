export async function load() {
	return {
		databaseUrl: import.meta.env.VITE_DATABASE_URL,
		filesPath: import.meta.env.VITE_FILES_PATH,
		scrapeToken: import.meta.env.VITE_SCRAPE_TOKEN,
		cronjoborgToken: import.meta.env.VITE_CRONJOBORG_TOKEN,
	}
}
