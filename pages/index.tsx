import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import { GET_SUBREDDIT_WITH_LIMIT } from '../graphql/queries'
import SubredditRow from '../components/SubredditRow'
import { Jelly } from '@uiball/loaders'

const Home: NextPage = () => {
  const {data} = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })

  if(!Feed) 
        return (
            <div className='flex w-full item-center justify-center p-10 text-xl'>
                <Jelly size={50} color="#FF4501"/>
            </div>
    )

  const subreddits: Subreddit[] = data?.getSubredditListLimit

  return (
    <div className='my-7 max-w-5xl mx-auto'>
      <Head>
        <title>Reddit 2.0</title>
      </Head>

      {/* Post Box */}
      <PostBox/>

      <div className='flex'>
        {/* Feed */}
        <Feed/>
        <div className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>
          <div>
            {/* List of subreddits */}
            {subreddits?.map((subreddit, i) => (
              <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i}/>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
