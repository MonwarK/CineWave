import Link from "next/link"

export default function Footer() {

    const links = [
        {
            name: "Discover",
            url: "/discover"
        },
        {
            name: "Shows",
            url: "/series"
        },
        {
            name: "Movies",
            url: "/movies"
        },
        {
            name: "Recently Added",
            url: "/recently-added"
        },
        {
            name: "Watchlist",
            url: "/list"
        },

    ]

  return (
    <div className=' w-full bg-blue'>
        <div className='max-w-screen-xl mx-auto p-6 px-10'>
            <div className='grid grid-cols-2 space-x-8'>
                <div className='space-y-4'>
                    <h2 className="text-xl">CineWave</h2>
                    <p className="text-xs">
                    Data provided by TMDb API. CineWave doesn&apos;t host movies or tv shows, we only share links. Our site provides links to content hosted by third-party sites, over which we have no control. We take intellectual property rights seriously. If you believe a third party is infringing on your copyright, we recommend reaching out directly to the hosting provider or content source to address the issue. We do not host any content ourselves, we simply list links to external sources.
                    </p>

                </div>
                <div className="space-y-4">
                    <h2 className="text-xl">Links</h2>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    {links.map((link) => (
                        <Link className="hover:underline w-fit" href={link.url}>
                        {link.name}
                        </Link>
                    ))}
                    </div>
                </div>
            </div>
        </div>
        <div>
        <p className="text-center p-6">&copy; CineWave {new Date().getFullYear()}</p>

        </div>
    </div>
  )
}
