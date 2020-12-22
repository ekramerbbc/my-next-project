function Home({ allPreparationGuides }) {
  return (
    <div>
      {allPreparationGuides.map(preparationGuide => {
        return (
          <div>
            <div>{preparationGuide.name.en}</div>
          </div>
        )
      })}
    </div>
  )
}

export async function getStaticProps({ params }) {
  const data = await fetch('https://eo9501mu.api.sanity.io/v1/graphql/production/default', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      query: `{
        allPreparationGuide {
          _id
          name {
            en
          }
        }
      }`
    })
  }).then(function(response) {
    return response.json();
  })

  return {
    props: {
      allPreparationGuides: data.data.allPreparationGuide
    }
  }
}

export default Home
