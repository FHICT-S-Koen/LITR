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
  const body = JSON.parse(req.body)
  if (req.method === 'POST') {
    const detection = await prisma.detection.create({ data: { ...body} })
    res.status(201).json(detection)
  } else {
    res.status(404).json({ error: '404 error' })
  }
}
