"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface BlogPost {
  objectId: string;
  title: string;
  content: string; // Bisa HTML atau text
  created: number;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://neededstream-us.backendless.app/api/data/blog");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen py-16 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1723795349663-91a056f85354?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlJTIwZHJpbmtpbmclMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D)' }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
           <h1 className="text-4xl font-bold text-white drop-shadow-lg">Coffee Chronicles</h1>
           <Link href="/blog/create" className="bg-coffee-800 text-white px-4 py-2 rounded hover:bg-coffee-700 shadow-lg">
             Write a Blog
           </Link>
        </div>

        {loading ? (
          <p>Loading stories...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.objectId} href={`/blog/${post.objectId}`}>
                <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-coffee-500 hover:shadow-lg transition cursor-pointer">
                  <h2 className="text-2xl font-bold text-black mb-2">{post.title}</h2>
                  <div 
                    className="text-gray-600 mb-4 line-clamp-3 prose"
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                  />
                  <span className="text-sm text-gray-400">Published: {new Date(post.created).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}