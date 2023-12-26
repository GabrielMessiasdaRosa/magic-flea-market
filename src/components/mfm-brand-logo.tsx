export interface MfmBrandLogoProps {
  fontDefinition?: string;
}

export default function MfmBrandLogo({ fontDefinition }: MfmBrandLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        className={`flex font-fancy text-5xl text-primary-950 ${fontDefinition}`}
      >
        <span className="-ml-2">M</span>
        <span className="-ml-2">F</span>
        <span className="-ml-2">M</span>
      </div>
      <div
        className={`-mt-1 font-barbarian text-2xl text-primary-900 ${fontDefinition}`}
      >
        <span>{`Magic_flea_market>`}</span>
      </div>
    </div>
  );
}
