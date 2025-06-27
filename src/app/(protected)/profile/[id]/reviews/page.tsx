import { getUserData, getUserReviews } from "@/app/db/queries";
import Header from "@/components/main/Header";
import ProfileReviewListItem from "@/components/profile/ProfileReviewListItem";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Params = Promise<{id: string}>

export default async function UserReviewsPage({params}: { params: Params}) {

  const { id } = await params;

  if(!id) return;

  const data = await getUserReviews(id);
  const user = await getUserData(id);
  if(!user) return;

  return (
    <div className="pt-20">
      <Header />
      <div className="max-w-screen-xl mx-auto w-full p-5 space-y-10">
        <div className="grid grid-cols-8 items-center">
          <div>
          <Link href={`/profile/${id}`}>
          <ChevronLeft className="hover:opacity-60 rounded-full transition duration-300 " />
        </Link>
          </div>
          <div className="col-span-6">
            <h2 className="text-3xl text-center font-bold leading-tight">{user.first_name}&apos;s Reviews</h2>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {data?.map((review, idx) => (
            <ProfileReviewListItem key={idx} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
