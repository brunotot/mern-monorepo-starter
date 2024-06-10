const EUR_TO_HRK = 7.5345;

export function convertEurToHrk(eur: number): number {
  return EUR_TO_HRK * eur;
}

export function stringifyEuro(euro: number): string {
  return toFixed(euro, "€");
}

export function stringifyHrk(hrk: number): string {
  return toFixed(hrk, "HRK");
}

export function stringifyPercentage(percentage: number): string {
  return toFixed(percentage, "%");
}

export function toFixed(value: number, suffix?: string) {
  const formattedValue = value.toLocaleString("hr-HR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return `${formattedValue}${suffix ? " " + suffix : ""}`;
}
