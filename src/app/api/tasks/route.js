import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request){
  const { title, description } = await request.json();
  console.log('api post test')
  const newTask = await prisma.task.create({
    data: {
      title,
      description
    }
  });
  return NextResponse.json(newTask)
}