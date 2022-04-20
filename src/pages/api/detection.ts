import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { DetectionProps } from '../../components/Detection'
import { prisma } from '../../db'

interface Error {
  message: string
  errors?: { field: string, message: string }[]
  stack?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DetectionProps | Error>
) {
  try {
    const body = req.body as DetectionProps

    if (req.method !== 'POST')
      return res.status(405).json({ message: `Request method '${req.method}' not supported` })

    if (req.headers['authorization'] !== process.env.SECRET_KEY)
      return res.status(401).json({ message: 'Invalid authorization token' })

    return res.status(201).json(await prisma.detection.create({ data: { ...body } }))
  }
  catch (err) {
    if (err instanceof PrismaClientValidationError)
      return res.status(400).json({ message: err.message })
    else
      return res.status(500).json({ message: 'Internal server error' })
  }
}
