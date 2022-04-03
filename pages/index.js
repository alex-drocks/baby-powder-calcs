import Head from 'next/head'
import Image from 'next/image'
import Form from "../components/Form/Form";

export default function Home() {
  return (
    <div className="page-container">
      <Head>
        <title>BébéCalculs</title>
      </Head>

      <main>
       <Form/>
      </main>

    </div>
  )
}
