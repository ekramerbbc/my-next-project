import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '@sanity/client';
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

const IMAGE_DIMENSIONS = {
  height: 500,
  width: 500
}

function imageUrl({ source, height, width }) {
  const client = sanityClient({
    projectId: 'eo9501mu',
    dataset: 'production'
  })
  const builder = imageUrlBuilder(client)
  return builder.image(source).height(height).width(width).url()
}

function PreparationGuidesIndex({ allPreparationGuides }) {
  return (
    <div>
      <ul>
        {allPreparationGuides.map(preparationGuide => {
          return (
            <li key={preparationGuide.name.en}>
              <Image
                height={IMAGE_DIMENSIONS.height}
                width={IMAGE_DIMENSIONS.width}
                src={imageUrl(
                  {
                    source: preparationGuide.indexImage,
                    height: IMAGE_DIMENSIONS.height,
                    width: IMAGE_DIMENSIONS.width
                  }
                )}
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
