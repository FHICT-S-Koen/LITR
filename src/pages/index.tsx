import { PrismaClient } from '@prisma/client'
import type { NextPage } from 'next'

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const detections = await prisma.detection.findMany()

  return {
    props : { detections }
  }
}

export type DetectionProps = {
  id: number;
  objects: number;
  types: string;
  lat: number;
  lon: number;
  picture: string;
};

type Props = {
  detections: DetectionProps[];
};

const Home: React.FC<Props> = (props) => {

  return <div className="bg-black text-white">
    {props.detections.map((detection) => (
      <div key={detection.id}>{detection.id}</div>) 
    )}
  </div>
}

export default Home
