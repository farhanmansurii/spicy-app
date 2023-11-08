import { fetchData } from "@/utils/helper";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { SearchBar } from "./SearchBar";
import Link from "next/link";
import CarousalComponent from "./CarousalComponent";

export default async function Carousal() {
  const res = await fetchData("trending");
  const data = res?.results;
  return (
    
    <CarousalComponent items={data}/>
  );
}
