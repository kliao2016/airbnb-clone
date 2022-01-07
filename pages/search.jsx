import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import { format } from "date-fns"
import InfoCard from "../components/InfoCard";

function Search({searchResults}) {
  const router = useRouter();

  const { location, startDate, endDate, guests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${guests}`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">300+ Stays - {range} - for {guests} guests</p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map((searchResult) => (
              <InfoCard 
                key={searchResult.location}
                img={searchResult.img}
                location={searchResult.location}
                title={searchResult.title}
                description={searchResult.description}
                star={searchResult.star}
                price={searchResult.price}
                total={searchResult.total}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json());
  return {
    props: {
      searchResults
    }
  }
}