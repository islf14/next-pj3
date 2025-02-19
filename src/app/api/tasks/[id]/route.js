import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  });
  return NextResponse.json(task);
}

export async function PUT(request, {params}) {
  const { id } = await params;
  const data = await request.json();
  const taskUpdated = await prisma.task.update({
    where:{
      id: Number(id)
    },
    data: data
  });
  return NextResponse.json(taskUpdated);
}

export async function DELETE(request, {params}) {
  const { id } = await params;
  try{
    const taskRemoved = await prisma.task.delete({
      where: {
        id: Number(id)
      }
    });
    console.log(taskRemoved);
    return NextResponse.json("Task " + id + " deleted");
  } catch (error) {
    return NextResponse.json(error.message)
  }
}