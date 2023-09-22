const baseUrl = "http://spicy-api.vercel.app/meta/anilist/";
export async function fetchData(endpoint: string) {
  try {
    const url = new URL(endpoint, baseUrl);
    const response = await fetch(url.toString());
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
      `http://spicy-api.vercel.app/anime/zoro/watch?episodeId=${id}&server=vidstreaming`
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function formatNextAiringEpisode(nextAiringEpisode: any) {
  const airingDate = new Date(nextAiringEpisode.airingTime * 1000);

  const formattedDate = airingDate.toLocaleDateString(); // E.g., "MM/DD/YYYY"
  const formattedTime = airingDate.toLocaleTimeString(); // E.g., "HH:MM:SS"

  const formattedDateTime = `${formattedDate} ${formattedTime} - Episode ${nextAiringEpisode.episode}`;

  // Calculate the time remaining until the airing date
  const currentTime = new Date();
  const timeRemainingInSeconds = Math.floor(
    nextAiringEpisode.airingTime - currentTime.getTime() / 1000
  );

  // Convert time remaining to relative days or hours
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
