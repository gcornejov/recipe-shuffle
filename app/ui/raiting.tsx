const STARS_QUANTITY = 5
const STAR_STROKE_WIDTH = 1.2
const STAR_FILL_COLOR = "gold";

export function StarRaiting({raiting, maxRaiting}: {raiting: number, maxRaiting?: number}): JSX.Element {
  const stars: Array<JSX.Element> = []

  for (let i = 0; i < (maxRaiting || STARS_QUANTITY); i++) {
    const raitingStep: number = raiting - i;
    const fillRatio: number = (raitingStep < 1) ? ((raitingStep > 0) ? raitingStep : 0) : 1;

    stars.push(<StarIcon key={i} fillRatio={fillRatio} />);
  }

  return (
    <>
      <div className="flex">
        {stars}
      </div>
      <div className="inline-block align-middle ml-1 text-lg">{raiting}</div>
    </>
  );
}

export function StarIcon({fillRatio}: {fillRatio: number}): JSX.Element {
  if (fillRatio > 1 && fillRatio < 0) {
    return (<></>);
  }

  const gradientId: string = `partial_gold_${Math.round(fillRatio*100)}`
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={STAR_STROKE_WIDTH} stroke="currentColor" className="size-6">
      {!Number.isInteger(fillRatio) &&
        <defs>
          <linearGradient id={gradientId}>
              <stop offset="0%" stopColor={STAR_FILL_COLOR}/>
              <stop offset={`${Math.round(fillRatio*100)}%`} stopColor={STAR_FILL_COLOR}/>
              <stop offset={`${Math.round(fillRatio*100)}%`} stopColor="white"/>
              <stop offset="100%" stopColor="white"/>
          </linearGradient>
        </defs>
      }
      <path fill={(fillRatio > 0) ? ((!Number.isInteger(fillRatio)) ? `url(#${gradientId})` : STAR_FILL_COLOR) : "white"} strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  )
}
