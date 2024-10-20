const STAR_STROKE_WIDTH = 1.2
const STAR_FILL_COLOR = "gold";

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

// Extracted from https://www.svgrepo.com/svg/61048/dish
export function FoodPlateIcon({className}: {className?: string}) {
  const iconClassName = `size-7 ${className}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-51.2 -51.2 614.40 614.40" fill="currentColor" className={iconClassName}>
      <path fillRule="evenodd" d="M494.434,315.678h-30.737c-8.33-99.351-86.634-179.103-185.34-189.677c4.801-15.151-6.544-30.542-22.357-30.542 c-15.83,0-27.153,15.407-22.357,30.542c-98.707,10.574-177.01,90.327-185.34,189.677H17.566C7.865,315.678,0,323.543,0,333.244 c0,9.701,7.865,17.565,17.566,17.565h29.99v13.612c0,28.738,23.381,52.119,52.12,52.119h312.648 c28.74,0,52.12-23.381,52.12-52.119v-13.612h29.99c9.701,0,17.565-7.865,17.565-17.565 C512,323.543,504.135,315.678,494.434,315.678z M112.028,273.83c15.615-37.716,46.155-68.42,83.79-84.238 c8.943-3.761,19.24,0.444,22.999,9.387c3.759,8.944-0.444,19.241-9.387,23c-29.17,12.261-52.841,36.057-64.942,65.29 c-3.706,8.953-13.973,13.224-22.949,9.51C112.576,293.067,108.318,282.792,112.028,273.83z M429.313,364.421 c0,9.367-7.621,16.988-16.989,16.988H99.676c-9.368,0-16.989-7.621-16.989-16.988v-13.612h346.626V364.421z" clipRule="evenodd" />
    </svg>
  );
}

export function FireIcon({sizeClass, className}: {sizeClass?: string, className?: string}) {
  const iconClassName = `${sizeClass ? sizeClass : "size-6"} ${className}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={iconClassName}>
      <path fillRule="evenodd" d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z" clipRule="evenodd" />
    </svg>
  );
}
