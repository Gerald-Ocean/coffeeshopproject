"use client";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import "quill/dist/quill.snow.css";

export default function CreateBlog() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isChecking, setIsChecking] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (editorRef.current && !quillRef.current && isAuthenticated && !isChecking) {
      import("quill").then((Quill) => {
        if (editorRef.current) {
          quillRef.current = new Quill.default(editorRef.current, {
            theme: "snow",
            placeholder: "Write your blog content here...",
            modules: {
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            },
          });

          quillRef.current.on("text-change", () => {
            setContent(quillRef.current.root.innerHTML);
          });
          
          setEditorReady(true);
        }
      });
    }
  }, [isAuthenticated, isChecking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const blogContent = quillRef.current?.root.innerHTML || content;
      
      if (!blogContent || blogContent === '<p><br></p>') {
        alert("Please write some content for your blog");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post("https://neededstream-us.backendless.app/api/data/blog", {
        title,
        content: blogContent
      });
      
      console.log("Blog posted successfully:", response.data);
      alert("Blog posted successfully!");
      router.push("/blog");
    } catch (error: any) {
      console.error("Error details:", error.response?.data || error.message);
      alert(`Failed to post blog: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-12" style={{backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/6128d52a2b39e616dafae73c/1638407113812-47H1TT72MI4OOHT6V65M/french-press.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6 md:mb-8 bg-white/70 px-4 py-2 rounded-lg inline-block">Brew a New Story</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:border-coffee-500 outline-none text-black text-sm sm:text-base"
              placeholder="Blog Title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base">Content</label>
            <div className="bg-white rounded">
              <div ref={editorRef} className="quill-editor-black" style={{ minHeight: '250px' }} />
            </div>
          </div>
          <style jsx global>{`
            .quill-editor-black .ql-editor {
              color: black;
              font-size: 14px;
            }
            .quill-editor-black .ql-editor.ql-blank::before {
              color: #9ca3af;
            }
            @media (min-width: 640px) {
              .quill-editor-black .ql-editor {
                font-size: 16px;
              }
            }
            .ql-toolbar.ql-snow {
              border-top-left-radius: 0.5rem;
              border-top-right-radius: 0.5rem;
            }
            .ql-container.ql-snow {
              border-bottom-left-radius: 0.5rem;
              border-bottom-right-radius: 0.5rem;
            }
          `}</style>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-coffee-600 text-black py-2 sm:py-3 rounded font-bold hover:bg-coffee-500 transition disabled:bg-gray-400 text-sm sm:text-base"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}