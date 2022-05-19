import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db'
import { PrismaClientValidationError } from '@prisma/client/runtime'

interface Error {
  message: string
  stacktrace?: string
}

export default async function handleById(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  try {
    const x = req.query.id //TODO: fix error handling
    if (!Array.isArray(x)) 
      var detectionId = parseFloat(x)
      else throw new Error()
    switch (req.method) {
      case 'GET':
        return handleGetPictureById(detectionId, res)
      default:
        return res.status(405).json({ message: `Request method '${req.method}' not supported` })
    }
  }
  catch (err: any) {
    const stacktrace = process.env.NODE_ENV == "development" ? err.message : undefined
    if (err instanceof PrismaClientValidationError)
      return res.status(400).json({ message: 'Bad request', stacktrace })
    else
      return res.status(500).json({ message: 'Internal server error', stacktrace })
  }
}

async function handleGetPictureById(detectionId: number, res: NextApiResponse<string | Error>) {
  const picture = await prisma.detection.findUnique({
    where: {
      id: detectionId,
    },
    select: {
      picture: true
    }
  })
  return res.status(200).json(JSON.stringify(picture))
}