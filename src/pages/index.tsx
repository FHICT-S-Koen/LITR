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

  return <div className="flex flex-wrap justify-center p-2 gap-5">{props.detections.map((detection) =>
    <Detection key={detection.id} {...detection} />)}
  </div>
}

export default Home
