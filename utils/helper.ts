const baseUrl = "https://spicy-api.vercel.app/meta/anilist/";
export async function fetchData(endpoint: string) {
  try {
    const url = new URL(endpoint, baseUrl);
    const response = await fetch(url.toString(), { cache: "no-cache" });
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchLinks(id: string) {
  try {
    const response = await fetch(
      `https://spicy-api.vercel.app/anime/zoro/watch?episodeId=${id}&server=vidstreaming`,
      { cache: "no-cache" }
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function formatNextAiringEpisode(nextAiringEpisode: any) {
  const currentTime = new Date();
  const timeRemainingInSeconds = Math.floor(
    nextAiringEpisode.airingTime - currentTime.getTime() / 1000
  );
  const daysRemaining = Math.floor(timeRemainingInSeconds / (60 * 60 * 24));
  const hoursRemaining = Math.floor(timeRemainingInSeconds / (60 * 60));
  const dayLabel = daysRemaining === 1 ? "day" : "days";
  const hourLabel = hoursRemaining === 1 ? "hour" : "hours";
  const relativeTime =
    daysRemaining >= 1
      ? `${daysRemaining} ${dayLabel}`
      : `${hoursRemaining} ${hourLabel}`;
  return `${relativeTime} until Episode ${nextAiringEpisode.episode} `;
}
