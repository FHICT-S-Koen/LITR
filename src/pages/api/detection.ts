import type { NextApiRequest, NextApiResponse } from 'next'
import { DetectionProps } from '../../components/Detection'
import { prisma } from '../../db'

type Error = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DetectionProps | Error>
) {
  try {
    const body = req.body as DetectionProps
    if (req.headers['authorization'] === process.env.SECRET_KEY) {
      if (req.method === 'POST') {
        const detection = await prisma.detection.create({ data: { ...body } })
        res.status(201).json(detection)
      } else {
        res.status(404).json({ error: '404 error' })
      }
    } else {
      res.status(401).json({ error: '401 error' })
    }
  }
  catch (err) {
    res.status(500).json({ error: '500 error' })
  }
}
