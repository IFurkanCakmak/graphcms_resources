import Head from 'next/head'
import { PostCard,Categories,PostWidget } from '../components';
import {getArticles} from "../services"
import {TopArticles} from '../sections'



export default function Home ({articles}) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Izzet Furkan Cakmak - Computer Engineer</title>
        <link rel="icon" href="/canonical.png" />
      </Head>
      <TopArticles/>
      <div className='grid grid cols-1 lg:grid-cols-12 gap-12'>
      <div className='lg:col-span-8 col-span-1'>
      {articles.map((article)=> <PostCard article={article.node} key={article.title}/>)}
      </div>
     
      <div className="lg:col-span-4 col-span1">
      <div className='lg:sticky relative top-8'>
      <PostWidget/>
      <Categories/>
      </div>
      </div>

      </div>
      </div>
  )
}

//how to fetch data by using getstaticprops special to nextjs
export async function getStaticProps() {
  const articles = (await getArticles()) || [];

  return{
    props: {articles}
  }
}

