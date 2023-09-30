import { fetchData } from "@/utils/helper";
import Row from "../common/Row";

interface AnimeListProps {
  endpoint: string;
  text: string;
}

export default async function AnimeRow(props: AnimeListProps) {
  const animedata = await fetchData(props.endpoint)
  return <Row text={props.text} typeOfAnime={animedata?.results} />;
}
