import React, { useEffect } from 'react'
import { ArrowDownIcon, ArrowUpIcon, ChatAltIcon, ShareIcon, BookmarkIcon, DotsHorizontalIcon, GiftIcon } from '@heroicons/react/outline'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import {Jelly} from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import {useState} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/queries'
import { ADD_VOTE } from '../graphql/mutations'

type Props = {
    post: Post
}

function Post({post}: Props) {
    const [vote, setVote] = useState<boolean>()
    const {data:session} = useSession()

    const {data, loading} = useQuery(GET_ALL_VOTES_BY_POST_ID, {
        variables: {
            post_id: post?.id
        }
    })

    const [insertVote] = useMutation(ADD_VOTE, {
        refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVoteUsingPost_id'],
    })

    const upVote = async (isUpVote: boolean) => {
        if (!session) {
            toast("! You'll need to sign in to vote!")
            return
        }

        if (vote && isUpVote) return;
        if (vote === false && !isUpVote) return;

        console.log('Voting...', isUpVote)

        const {data: {insertVote: newVote},
        } =  await insertVote({
            variables: {
                post_id: post.id,
                username: session.user?.name,
                upvote: isUpVote,
            },
        })

        console.log('PLACED VOTE:', data)

    }

    const displayVotes = (data: any) => {
        const votes: Vote[] = data?.getVoteUsingPost_id
        const displayNumber = votes?.reduce((total, vote) => (vote.upvote ? (total += 1) : (total -= 1)), 0)

        if (votes?.length === 0) return 0;

        if (displayNumber === 0) {
            return votes[0]?.upvote ? 1 : -1
        }

        return displayNumber;
    }

    useEffect(() => {
        const votes: Vote[] = data?.getVoteUsingPost_id;

        // Latest vote (as sorted by newly created first in SQL query)
        // Note: You could improve this by moving it to the original query

        const vote = votes?.find(vote => vote.username == session?.user?.name)?.upvote

        setVote(vote)

    }, [data])

    if(!post) 
        return (
            <div className='flex w-full item-center justify-center p-10 text-xl'>
                <Jelly size={50} color="#FF4501"/>
            </div>
    )

  return (
    <Link href={`/post/${post?.id}`}>
    <div className='rounded-md flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600'>
        <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
        {/* Votes */}
        <ArrowUpIcon onClick={() => upVote(true)} className={`voteButtons hover:text-blue-400 ${vote && 'text-blue-400'}`}/>
        <p className='text-xs font-bold'>{displayVotes(data)}</p>
        <ArrowDownIcon onClick={() => upVote(false)} className={`voteButtons hover:text-red-400 ${vote === false && 'text-red-400'}`}/>
        </div>
        <div className='p-3 pb-1'>
            {/* Header */}
            <div className='flex items-center space-x-2'>
                <Avatar seed={post.subreddit[0]?.topic}/>
                <p className='text-xs text-gray-400'>
                <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className='font-bold text-black hover:text-blue-400 hover:underline'>r/{post.subreddit[0]?.topic}</span>    
                </Link>
                {' '}・Posted by u/{post.username} <TimeAgo date={post.created_at}/>
                </p>
            </div>

            {/* Body */}
            <div className='py-4'>
                <h2 className='text-xl font-semibold'>{post.title}</h2>
                <p className='mt-2 text-sm font-light'>{post.body}</p>
            </div>

            {/* Image */}
            <img className='w-full' src={post.image} alt=""/>

            {/* Footer */}
            <div className='flex space-x-4 text-gray-400'>
                <div className='postButtons'>
                <ChatAltIcon className='h-6 w-6'/>
                <p>{post.commentList.length} Comments</p>
                </div>
                <div className='postButtons'>
                <GiftIcon className='h-6 w-6'/>
                <p className='hidden sm:inline'>{post.commentList.length} Awards</p>
                </div>
                <div className='postButtons'>
                <ShareIcon className='h-6 w-6'/>
                <p className='hidden sm:inline'>{post.commentList.length} Share</p>
                </div>
                <div className='postButtons'>
                <BookmarkIcon className='h-6 w-6'/>
                <p className='hidden sm:inline'>{post.commentList.length} Save</p>
                </div>
                <div className='postButtons'>
                <DotsHorizontalIcon className='h-6 w-6'/>
                </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default Post