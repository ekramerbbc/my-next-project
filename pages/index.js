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
    <>
      <ul>
        {allPreparationGuides.map(preparationGuide => {
          return (
            <li className='w-full sm:w-1/3' key={preparationGuide.name.en}>
              <div className='relative pt-full'>
                <Image
                  layout='fill'
                  objectFit='contain'
                  src={imageUrl(
                    {
                      source: preparationGuide.indexImage,
                      height: IMAGE_DIMENSIONS.height,
                      width: IMAGE_DIMENSIONS.width
                    }
                  )}
                />
                <div className='flex flex-col justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-20 transition duration-500 ease-in-out hover:bg-opacity-30'>
                  <div className='uppercase text-xl text-white'>{preparationGuide.name.en}</div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
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
