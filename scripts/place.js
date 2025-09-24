const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const windChill = document.getElementById("wind-chill");
const windChillLarge = document.getElementById("wind-chill-large");

const temparatureInput = 28;
const windSpeedInput = 14;

function calculateWindChill(temperature, windSpeed) {
  if (temperature <= 10 && windSpeed > 4.8) {
    const windChill =
      35.74 +
      0.6215 * temperature -
      35.75 * Math.pow(windSpeed, 0.16) +
      0.4275 * temperature * Math.pow(windSpeed, 0.16);
    return `${windChill.toFixed(2)}&degC`;
  } else {
    return "N/A";
  }
}

currentYear.innerHTML = new Date().getFullYear();
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
windChill.innerHTML = calculateWindChill(temparatureInput, windSpeedInput);
windChillLarge.innerHTML = calculateWindChill(temparatureInput, windSpeedInput);