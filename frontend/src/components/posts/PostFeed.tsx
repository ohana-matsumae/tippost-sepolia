import type { Post } from "../../types";
import { PostCard } from "./PostCard";

type Props = {
  posts: Post[];
  disabled?: boolean;
};

export function PostFeed({ posts, disabled }: Props) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        No posts yet. Create the first one.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id.toString()} post={post} disabled={disabled} />
      ))}
    </div>
  );
}
