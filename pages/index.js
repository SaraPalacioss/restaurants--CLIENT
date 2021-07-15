import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service'
import axios from 'axios'

export async function getStaticProps() {
  let restaurants = [];

  await restaurantsService
    .getAllRestaurants()
    .then((res) => (restaurants = res.data))
    .catch((err) => console.error('error', err));

  if (!restaurants) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      restaurants,
    },
  };
}




const Home = ({ restaurants }) => {

  const HEIGHT = 200;
  const WIDTH = 225;

  return (
    <div>

      {restaurants.map((data) => {
        return (
         
          <div key={data._id} params={data._id}>
          <Link href={`/${data._id}`}><a>
          <Image src={data.image} height={HEIGHT}
					width={WIDTH} alt="restaurant photo" />

            <div>{data.name}</div>

          </a>
        
</Link>
          </div>

        )

      })}
    </div>
  )

}








export default Home;
