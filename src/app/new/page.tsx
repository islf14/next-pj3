"use client"
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function NewPage({params}:{params: Promise<{ id?: string }>}) {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if(id) {
      fetch(`/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, []);

  const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(id) {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({title, description}),
        headers: {
          'Content-type':'application/json'
        }
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({title, description}),
        headers: {
          'Content-type':'application/json'
        }
      });
      const data = await res.json();
      console.log(data);
    }
    router.refresh();
    router.push("/");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 md:w-1/2 lg:w-1/3" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-bold text-sm">Task title</label>
        <input 
          type="text" 
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black" 
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="description" className="font-bold text-sm">Task description</label>
        <textarea 
          rows={3} 
          id="description"
          className="border border-gray-400 p-2 mb-4 w-full text-black" 
          placeholder="Describe your task"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
          {id && (
            <button 
              type="button" 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
              onClick={async () => {
                const res = await fetch(`/api/tasks/${id}`, {
                  method: "DELETE"
                });
                const data = await res.json();
                console.log(data);
                router.push("/");
              }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
