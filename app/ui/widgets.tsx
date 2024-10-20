// Extracted from https://preline.co/docs/progress.html
export function CircularProgress({label, progress, color}: {label: {amount: number, title: string | JSX.Element}, progress?: number, color: {progress: string, label: string}}) {
  const scaledProgress: string = progress ? `${100 - progress}` : "100";

  const progressClass: string = progress ? `stroke-current ${color.progress} ` : "";
  const labelTitleClass: string = `justify-self-center self-center ${color.label} block`;
  const labelAmountClass: string = `text-lg font-bold ${color.label}`;

  return (
    <div className="relative size-20">
      <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle */}
        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200" strokeWidth="1.5"></circle>
        {/* Progress Circle */}
        <circle cx="18" cy="18" r="16" fill="none" className={progressClass} strokeWidth="1.5" strokeDasharray="100" strokeDashoffset={scaledProgress} strokeLinecap="round"></circle>
      </svg>

      {/* Percentage Text */}
      <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="grid grid-rows-2">
          <span className={labelTitleClass}>{label.title}</span>
          <span className={labelAmountClass}>{label.amount}</span>
        </div>
      </div>
    </div>
  );
}

export function Gauge({label, progress, color}: {label: {amount: number, title: string | JSX.Element}, progress?: number, color: {progress: string, label: string}}) {
  const scaledProgress: string = progress ? `${(progress * 0.75)}` : "0";

  const progressClass: string = progress ? `stroke-current ${color.progress} ` : "";
  const labelAmountClass: string = `text-xl font-bold ${color.label}`;
  const labelTitleClass: string = `text-sm ${color.label} block`;

  return (
    <div className="relative size-20">
      <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle (Gauge) */}
        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200" strokeWidth="1.5" strokeDasharray="75 100" strokeLinecap="round"></circle>

        {/* Gauge Progress */}
        <circle cx="18" cy="18" r="16" fill="none" className={progressClass} strokeWidth="1.5" strokeDasharray={`${scaledProgress} 100`} strokeLinecap="round"></circle>
      </svg>

      {/* Value Text */}
      <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className={labelAmountClass}>{label.amount}</span>
        <span className={labelTitleClass}>{label.title}</span>
      </div>
    </div>
  );
}

export function MiniGauge({label, progress, color}: {label: {amount: number, title: string | JSX.Element}, progress?: number, color: string}) {
  const scaledProgress: string = progress ? `${(progress * 0.5)}` : "0";

  const progressClass: string = progress ? `stroke-current ${color} ` : "";
  const labelAmountClass: string = `text-lg font-bold ${color}`;
  const labelTitleClass: string = `text-sm ${color} font-bold block`;

  return (
    <div className="relative size-20 text-center">
      <svg className="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle (Gauge) */}
        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-400" strokeWidth="1" strokeDasharray="50 100" strokeLinecap="round"></circle>

        {/* Gauge Progress */}
        <circle cx="18" cy="18" r="16" fill="none" className={progressClass} strokeWidth="1.5" strokeDasharray={`${scaledProgress} 100`} strokeLinecap="round"></circle>
      </svg>

      {/* Value Text */}
      <div className="absolute top-6 start-1/2 transform -translate-x-1/2">
        <span className={labelAmountClass}>{label.amount}</span>
        <text className={labelTitleClass}>{label.title}</text>
      </div>
    </div>
  );
}
