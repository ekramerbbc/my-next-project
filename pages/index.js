import { gql, useQuery } from "@apollo/client";

export const ALL_PREPARATION_GUIDES_QUERY = gql`
  query allPreparationGuides {
    allPreparationGuide {
      _id
      name
    }
  }
`;

function Home({ allPreparationGuides }) {
  return (
    <div>
      {allPreparationGuides.map(preparationGuide => {
        return (
          <div>
            <div>{preparationGuide.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { loading, error, data } = useQuery(ALL_PREPARATION_GUIDES_QUERY);

  if (loading) return <>Loading...</>

  if (error) return <>`Error! ${error.message}`</>

  const { allPreparationGuide: allPreparationGuides } = data;

  return {
    props: {
      allPreparationGuides
    }
  }
}

export default Home
