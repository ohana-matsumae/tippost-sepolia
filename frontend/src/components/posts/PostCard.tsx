import { Heart } from "lucide-react";
import { useState } from "react";
import { useCheckLiked, useLikePost, useWallet } from "../../hooks";
import { formatAddress, formatEth } from "../../lib/utils";
import type { Post } from "../../types";
import { TxStatusBanner } from "../TxStatusBanner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

type Props = {
  post: Post;
  disabled?: boolean;
};

export function PostCard({ post, disabled }: Props) {
  const { account } = useWallet();
  const { liked } = useCheckLiked(post.id, account.address);
  const { likePost, tx } = useLikePost();
  const [brokenImage, setBrokenImage] = useState(false);

  const isOwnPost = Boolean(account.address && account.address.toLowerCase() === post.creator.toLowerCase());
  const cannotLike = disabled || isOwnPost || liked || !account.isConnected || tx.status === "loading";

  return (
    <Card className="overflow-hidden">
      {brokenImage ? (
        <div className="flex h-56 items-center justify-center bg-muted text-sm text-muted-foreground">Image unavailable</div>
      ) : (
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="h-56 w-full object-cover"
          onError={() => setBrokenImage(true)}
        />
      )}

      <CardHeader className="space-y-2">
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.caption}</p>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">By {formatAddress(post.creator)}</Badge>
          <Badge variant="secondary">{post.likes.toString()} likes</Badge>
          <Badge variant="secondary">{formatEth(post.totalEarned)}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <TxStatusBanner tx={tx} />
        <Button
          className="w-full"
          variant={liked ? "secondary" : "default"}
          disabled={cannotLike}
          onClick={() => likePost(post.id)}
        >
          <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`} />
          {isOwnPost ? "Your Post" : liked ? "Liked" : "Like + Tip 0.0001 ETH"}
        </Button>
      </CardContent>
    </Card>
  );
}
