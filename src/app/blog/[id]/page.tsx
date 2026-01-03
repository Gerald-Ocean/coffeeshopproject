"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface BlogPost {
  objectId: string;
  title: string;
  content: string;
  created: number;
}

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `https://neededstream-us.backendless.app/api/data/blog/${params.id}`
        );
        setPost(res.data);
      } catch (error) {
        console.error("Failed to fetch blog post", error);
        alert("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <p className="text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Article not found</p>
          <Link href="/blog" className="text-coffee-600 hover:underline">
            Back to Blog List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/low-angle-smiley-friends-drinking-coffee_23-2148395436.jpg?semt=ais_hybrid&w=740&q=80)' }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-white hover:text-gray-200 mb-8 font-semibold drop-shadow-lg"
        >
          ← Back to Blog List
        </Link>

        <article className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-black mb-4">{post.title}</h1>
          
          <div className="flex items-center text-gray-500 text-sm mb-8 pb-4 border-b border-gray-200">
            <span>Published on {new Date(post.created).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ color: 'black' }}
          />
        </article>
      </div>
    </div>
  );
}
