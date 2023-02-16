# 👀 Scraper

Saw [this](https://www.dkriesel.com/spiegelmining) video on the CCC YouTube Account and wanted to scrape some data myself. So in order to do that, I wanted to build a platform which allows me to easily manage cronjobs to scrape data from a giving endpoint, save it and parse if needed.

## Techstack
-   [SvelteKit](https://kit.svelte.dev/)
-   [Prisma](https://www.prisma.io/)
-   [Tailwind](https://tailwindcss.com/)
-   [cron-job.org](https://cron-job.org/)

## How does it work

### Managing Jobs
Managing the scraping jobs can be done from accessing the webinterface. After logging in the user can create/read/update/delete scraping jobs on the fly, without restarting the system. 

As described in the [Prisma Schema](https://github.com/redii/scraper/blob/main/prisma/schema.prisma) a scraping job consists of the following data: `id`, `createdAt`, `name`, `filetype`, `url`, `headers`, `parser` and `crontab`.

| Key | Type | Description |
| --- | --- | --- |
| `id` | Int | Autoincrementing unique ID |
| `createdAt` | DateTime | Datetime when the job was created |
| `cronjobId` | Int | Cron Job ID on cron-job.org |
| `name` | String | Name of the job (ideally use a path like `/Topic/Subtopic/`) |
| `filetype` | String | Specifies the filetype of the saved data (currently `html` or `json`) |
| `url` | String | The URL which should be scraped |
| `headers` | String? (JSON) | An JSON object containing header information for the scraping request |
| `parser` | String? | Specifies which parser function should be called after scraping the data |
| `crontab` | String (Crontab) | Specifies when to scrape the data |
| `saveFile` | Boolean | Specifies wether or not the data should be saved or only being parsed |
| `enabled` | Boolean | Specifies wether or not the job is active |

Any job is synced with an Cronjob on cron-job.org via their REST API.

#### Why the need for cron-job.org?
I wanted this app to be as minimalistic as possible. Just the webapp and nothing more. So to keep everything in one project I had to outsource the cronjob functionality, which triggers the scraping jobs because continuous background can not be executed in the same process as the web app. And this way the cronjobs are easily editable on the fly.

cron-job.org offers a simple yet powerful functionalities to scheduly triggering specific HTTP endpoints, while offering a REST API to manage these jobs. [Please consider supporting them](https://cron-job.org/).

### Storing the data
When a job gets triggered via the [/api/scrape/[id]](https://github.com/redii/scraper/blob/main/src/routes/api/scrape/%5Bid%5D/%2Bserver.js) route, the app will scrape the given url using the HTTP GET method. The received raw data is than stored as a file in the specified `filetype` under a given path followed by the jobs name (ideally use a path as job name to create a folder structure). Every scraped file gets stored in the database with the following data: `id`, `createdAt` and `jobId`

| Key | Type | Description |
| --- | --- | --- |
| `id` | Int | Autoincrementing unique ID |
| `createdAt` | DateTime | Datetime when the file was created |
| `jobId` | Int | Relation to its job |

The scraped data can be accessed via the [/api/file/[id]](https://github.com/redii/scraper/blob/main/src/routes/api/file/%5Bid%5D/%2Bserver.js) Route.

### Parsing the data
Each job needs its own parser. New parsers can be added by creating a new `.js` file inside the [/parsers](https://github.com/redii/scraper/tree/main/parsers) directory. This file should default export a function which gets 3 parameters: `rawData`, `job` and `file`

| Key | Type | Description |
| --- | --- | --- |
| `rawData` | String | The rawData scraped from the endpoint |
| `job` | Object | Job object of the current scraping process |
| `file` | Int | File object of the current scraping process |

As soon as the parser is stored in the [/parsers](https://github.com/redii/scraper/tree/main/parsers) directory, it can be selected from the web interface.
