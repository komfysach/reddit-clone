import React from 'react'
import Image from 'next/image'
import {
    HomeIcon,
    BellIcon,
    ChatIcon,
    PlusIcon,
    SparklesIcon,
    SpeakerphoneIcon,
    VideoCameraIcon,
    GlobeIcon,
} from '@heroicons/react/outline'
import {
    MenuIcon,
    SearchIcon,
    ChevronDownIcon,
} from '@heroicons/react/solid'
import {signIn, signOut, useSession} from 'next-auth/react'
import Link from 'next/link'

function Header() {
    const {data: session } = useSession();
  return (
    <div className='sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm'>
        <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
            <Link href="/">
            <Image 
            priority
            objectFit="contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Reddit_logo_new.svg/731px-Reddit_logo_new.svg.png?20220313085316" 
            layout='fill'
            />
            </Link>
           
        </div>
        <div className='mx-7 flex items-center xl:min-w-{300px} cursor-pointer'>
            <Link href="/">
            <HomeIcon className='h-5 w-5'/>
            </Link>
            <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
            <ChevronDownIcon className='h-5 w-5'/>
        </div>
        {/* Search Box */}
        <form className='flex flex-1 items-center space-x-2 border-gray-200 bg-gray-100 px-3 py-1 rounded-3xl'>
            <SearchIcon className='h-6 w-6 text-gray-400'/>
            <input 
            className='flex-1 bg-transparent outline-none'
            type='text' 
            placeholder='Search Reddit'/>
            <button type='submit'/>
        </form>

        <div className='text-gray-500 space-x-2 items-center mx-5 hidden lg:inline-flex'>
            <SparklesIcon className='icon'/>
            <GlobeIcon className='icon'/>
            <VideoCameraIcon className='icon'/>
            <hr className='h-10 border border-gray-100'/>
            <ChatIcon className='icon'/>
            <BellIcon className='icon'/>
            <PlusIcon className='icon'/>
            <SpeakerphoneIcon className='icon'/>
        </div>
        <div className='ml-5 flex items-center lg:hidden'>
            <MenuIcon className='icon'/>
        </div>

        {/* Sign in Sign out button */}
        {session ? (
        <div onClick={() => signOut()} className='hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer'>
            <div className='relative h-5 w-5 flex-shrink-0'>
                <Image layout='fill' objectFit='contain' src='https://links.papareact.com/23l' alt=''/>
            </div>
            <div className='flex-1 text-xs'>
                        <p className='truncate'>{session?.user?.name}</p>
                        <p className='text-gray-400'>Sign Out</p>
                    </div>
            <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400'/>
        </div>

        ) : (
        <div onClick={() => signIn()} className='hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer'>
            <div className='relative h-5 w-5 flex-shrink-0'>
                <Image layout='fill' objectFit='contain' src='https://links.papareact.com/23l' alt=''/>
            </div>
            <p className='text-gray-400'>Sign In</p>
        </div>
        )}
        
    </div>
  )
}

export default Header