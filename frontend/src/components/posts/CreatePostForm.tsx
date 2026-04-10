import { FormEvent, useState } from "react";
import { useCreatePost, useWallet } from "../../hooks";
import { TxStatusBanner } from "../TxStatusBanner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
  disabled?: boolean;
};

export function CreatePostForm({ disabled }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const { account } = useWallet();
  const { createPost, tx } = useCreatePost();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageUrl.trim() || !caption.trim()) {
      return;
    }

    const success = await createPost(imageUrl.trim(), caption.trim());
    if (success) {
      setImageUrl("");
      setCaption("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TxStatusBanner tx={tx} />
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input placeholder="Image URL" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} required />
          <Textarea
            placeholder="Write a caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            required
          />
          <Button type="submit" disabled={disabled || !account.isConnected || tx.status === "loading"}>
            {tx.status === "loading" ? "Submitting..." : "Publish On-Chain"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
