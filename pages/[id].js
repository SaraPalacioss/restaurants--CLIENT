import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service'

export async function getStaticProps() {
  let restaurantsDetails = [];

  await restaurantsService
    .getRestaurantDetails()
    .then((res) => (restaurantsDetails = res.data))
    .catch((err) => console.error('error', err));

  if (!restaurantsDetails) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      restaurantsDetails,
    },
  };
}




const RestaurantDetails = ({ details }) => {

  const HEIGHT = 200;
  const WIDTH = 225;

  return (
    <div>

      {details.map((data) => {
        return (
          <div key={data.id}>

          <Image src={data.image} height={HEIGHT}
					width={WIDTH} alt="restaurant photo" />

            <div>{data.name}</div>

          </div>

        )

      })}
    </div>
  )

}








export default RestaurantDetails;
