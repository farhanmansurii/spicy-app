import { fetchData } from '@/utils/helper';
import React from 'react';
import CarousalComponent from './CarousalComponent';

export default async function Carousal() {
  const res = await fetchData('trending');
  const data = res?.results;
  return <CarousalComponent items={data} />;
}
