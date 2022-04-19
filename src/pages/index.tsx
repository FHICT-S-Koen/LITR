import { PrismaClient } from '@prisma/client'
import Detection, { DetectionProps } from '../components/Detection'

export async function getServerSideProps() {
  const prisma = new PrismaClient()
  const detections = await prisma.detection.findMany()

  return {
    props : { detections }
  }
}

type Props = {
  detections: DetectionProps[]
}

const Home: React.FC<Props> = (props) => {

  return <div className="flex flex-col p-2 gap-1">{props.detections.map((detection) =>
    <Detection key={detection.id} {...detection} />)}
  </div>
}

export default Home
