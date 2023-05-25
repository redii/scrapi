# 👀 Scrapi

**Scheduled API scraping made easy 🤙🏼**

1. Setup Scraping Jobs with Endpoints, Headers and Crontabs
2. Parse the returned data and send notifications if needed
3. Manage and monitor your Jobs using a webapp

## 👨‍💻 Webapp

A SvelteKit application used to CRUD your scraping jobs.

The code can be found [here](https://github.com/redii/scrapi/tree/main/webapp).

## ⏰ Daemon

A Node.js Script scheduling scraping jobs and executing parser functions.

Parser functions are used to analyze the data and send out notifications if needed.

The code can be found [here](https://github.com/redii/scrapi/tree/main/webapp).
