"use client";

import { Post, PostResponse } from "@/app/_types/Post";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const PostDetail = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${params.id}`
      );
      const data = (await res.json()) as PostResponse;
      setPost(data.post);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <div>読み込み中...</div>;
  if (!post) return <div>記事が見つかりません</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div>
        <div>
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            height={400}
            width={800}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-slate-400 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div>
              <div className="flex gap-2">
                {post.categories.map((category, index) => (
                  <div
                    key={index}
                    className="border border-blue-500 p-1 text-sm rounded text-blue-500"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-2xl text-left mt-4 text-slate-900">
            {post.title}
          </p>
          <div className="mt-4 text-left text-slate-700">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
