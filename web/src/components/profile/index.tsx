import { getUser } from '@/lib/auth'
import Image from 'next/image'
export default function Profile() {
  const { avatarUrl, name } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        alt=""
        height={40}
        width={40}
        className="h-10 w-10 rounded-full"
      />
      <p className="text-md max-w-[140px] leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block cursor-pointer text-sm leading-snug text-red-400  underline hover:text-red-300"
        >
          Quero sair
        </a>
      </p>
    </div>
  )
}
