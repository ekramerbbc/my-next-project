import Image from 'next/image'

const ALL_PREP_GUIDES_QUERY = `
  {
    allPreparationGuide {
      _id
      name {
        en
        jp
      }
      indexImage {
        asset {
          url
        }
      }
    }
  }
`
function PreparationGuidesIndex({ allPreparationGuides }) {
  return (
    <div>
      <ul>
        {allPreparationGuides.map(preparationGuide => {
          return (
            <li key={preparationGuide.name.en}>
              <Image
                layout="fill"
                src={preparationGuide.indexImage.asset.url}
              />
              {preparationGuide.name.en}
            </li>
          )
        })}
      </ul>
    </div >
  )
}

export async function getStaticProps({ params }) {
  const data = await fetch('https://eo9501mu.api.sanity.io/v1/graphql/production/default', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      query: ALL_PREP_GUIDES_QUERY
    })
  }).then(function (response) {
    return response.json();
  })

  return {
    props: {
      allPreparationGuides: data.data.allPreparationGuide
    }
  }
}

export default PreparationGuidesIndex
