import config from "$lib/utils/config"

export async function load() {
  return {
    filesPath: import.meta.env.VITE_FILES_PATH,
  }
}
