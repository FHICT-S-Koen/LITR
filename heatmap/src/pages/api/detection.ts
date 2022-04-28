import type { NextApiRequest, NextApiResponse } from 'next'
import { DetectionProps } from '../../components/Detection'
import { prisma } from '../../db'
import { PrismaClientValidationError } from '@prisma/client/runtime'

interface Error {
  message: string
  stacktrace?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({ message: `Request method '${req.method}' not supported` })

    if (req.headers['authorization'] !== process.env.SECRET_KEY)
      return res.status(401).json({ message: 'Invalid authorization token' })

    if (req.headers['content-type'] !== 'application/json')
      return res.status(415).json({ message: `Content-type '${req.headers['content-type']}' not supported` })

    const body: DetectionProps = req.body

    const detection = await prisma.detection.create({
      data: {
        objects: {
          createMany: {
            data: body.objects
          }
        },
        detectedAt: body.detectedAt,
        lat: body.lat,
        lon: body.lon,
        picture: body.picture
      }
    })

    return res.status(201).json(JSON.stringify(detection))
  }
  catch (err: any) {
    const stacktrace = process.env.NODE_ENV == "development" ? err.message : undefined
    if (err instanceof PrismaClientValidationError)
      return res.status(400).json({ message: 'Bad request', stacktrace })
    else
      return res.status(500).json({ message: 'Internal server error', stacktrace })
  }
}