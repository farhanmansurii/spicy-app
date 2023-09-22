import React, { Suspense } from "react";
import AnimeDetailPage from "@/components/container/AnimeDetails/AnimeDetailPage";

export default function Page({ params }: { params: { id: string } }) {
  return <AnimeDetailPage id={params.id} />;
}
