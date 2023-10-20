function AnimeCard(props: any) {
  const { animeImg, title, releaseDate, relationType, type } = props;
  return (
    <div className="relative border border-transparent hover:border-primary w-36 h-52 lg:w-40 lg:h-60 duration-100 overflow-hidden">
      <img
        className="object-cover w-[100%] opacity-60 h-[99%]"
        src={animeImg}
        alt={title}
      />
      <div className="absolute opacity inset-0 bg-gradient-to-t flex flex-col-reverse duration-150 p-3">
        <p className="text-sm bottom-0 lg:text-md font-medium line-clamp-3">
          {title}
        </p>
        <p className="opacity-50 font-semibold text-xs">
          <span className="uppercase ">{type}</span>
          {relationType ? (
            <>
              {" • "}
              {relationType.replace(/_/g, " ")}
            </>
          ) : releaseDate ? (
            <>
              {" • "}
              {releaseDate}
            </>
          ) : (
            ""
          )}
        </p>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity bg-black/20 duration-300 hover:opacity-100">
          <svg
            viewBox="0 0 384 512"
            fill="currentColor"
            height="2em"
            width="2em"
          className="text-primary"
          >
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
