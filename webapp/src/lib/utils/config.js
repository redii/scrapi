import prisma from "$lib/utils/prisma"

export default {
  get: async (key) => {
    const obj = await prisma.config.findUnique({ where: { key } })
    return obj.value
  },
  set: (key, value) => {
    return prisma.config.update({
      where: { key },
      data: { value },
    })
  },
}
