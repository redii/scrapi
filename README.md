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
| `jobId` | Int | Cron Job ID on cron-job.org |
| `filetype` | String | Specifies the filetype of the saved data (currently `html` or `json`) |
| `url` | String | The URL which should be scraped |
| `headers` | String? (JSON) | An JSON object containing header information for the scraping request |
| `parser` | String? | Specifies which parser function should be called after scraping the data |
| `crontab` | String (Crontab) | Specifies when to scrape the data |
| `saveFile` | Boolean | Specifies wether or not the data should be saved or only being parsed |
| `enabled` | Boolean | Specifies wether or not the job is active |

Any job is synced with an Cronjob on cron-job.org via their REST API.

#### Why the need for cron-job.org?
I wanted this app to be as minimalistic as possible. Just the webapp and nothing more. So to keep everything in one project I had to outsource the cronjob functionality, which triggers the scraping job because continous background tasks are not supported by SvelteKit. And this way the cronjobs are editable on the fly.

### Storing the data
The data is stored raw as a file in the specified `filetype` under a given path. Every scraped file is also stored in the data base with the following data: `id`, `createdAt` and `jobId`

| Key | Type | Description |
| --- | --- | --- |
| `id` | Int | Autoincrementing unique ID |
| `createdAt` | DateTime | Datetime when the file was created |
| `jobId` | Int | Relation to its job |

The scraped data can be accessed via the [/api/file/[id]](https://github.com/redii/scraper/blob/main/src/routes/api/file/%5Bid%5D/%2Bserver.js) Route.

### Parsing the data
Each job needs its own parser. New parsers can be added by createing a new `.js` file inside the [/parsers](https://github.com/redii/scraper/tree/main/parsers) directory. This file should default export a function which gets 3 parameters: `job`, `rawData` and `file`

| Key | Type | Description |
| --- | --- | --- |
| `job` | Object | Job object of the current scraping process |
| `rawData` | String | The rawData scraped from the endpoint |
| `file` | Int | File object of the current scraping process |

As soon as the parser is stored in the [/parsers](https://github.com/redii/scraper/tree/main/parsers) directory, it can be selected from the web interface.
