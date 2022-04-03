import Head from 'next/head'
import Calculations from "../components/Calculations";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          BébéCalculs - Calcul des prix et quantités requises pour nourrir bébé avec la préparation
          commerciale.
        </title>
      </Head>

      <Calculations/>
    </>
  )
}
