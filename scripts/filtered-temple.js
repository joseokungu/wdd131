const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const imageContainer = document.querySelector('.image-container');
const pageTitle = document.getElementById("page-title");

const navigation = document.getElementById("navigation");
const hamMenu = document.getElementById("menu");

currentYear.innerHTML = new Date().getFullYear();

lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

hamMenu.addEventListener("click", () => {
  navigation.classList.toggle("active");
  hamMenu.classList.toggle("open");
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-4937.jpg"
  },
  {
    templeName: "Nairobi Kenya",
    location: "Nairobi, Kenya",
    dedicated: "2025, May, 18",
    area: 19870,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/nairobi-kenya-temple-60488-main.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Frankfurt Germany",
    location: "Frankfurt, Germany",
    dedicated: "1987, August, 28",
    area: 32895,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/frankfurt-germany-temple/frankfurt-germany-temple-6612.jpg"
  },
];


// Function to create and display temple cards
function displayTemples(temples, title) {
  imageContainer.innerHTML = "";
  pageTitle.innerHTML = title

  temples.forEach(temple => {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    // Create figcaption element
    const caption = document.createElement('figcaption');
    caption.innerHTML = `
      <strong>${temple.templeName}</strong><br>
      <span>Location:</span> ${temple.location}<br>
      <span>Dedicated:</span> ${temple.dedicated}<br>
      <span>Area:</span> ${temple.area.toLocaleString()} sq ft
    `;

    figure.appendChild(img);
    figure.appendChild(caption);
    imageContainer.appendChild(figure);
  });
}

function displayAllTemples() {
  const allTemples = temples
  displayTemples(allTemples, "home")
}

function displayOldTemples() {
  const oldTemples = temples.filter(temple=> {
    const year = +temple.dedicated.split(",")[0]
    if (year < 1900) {
      return temple
    }
  })

  displayTemples(oldTemples, "old")
}

function displayNewTemples() {
  const newTemples = temples.filter(temple => {
    const year = +temple.dedicated.split(",")[0]
    if (year > 2000) {
      return temple
    }
  })

  displayTemples(newTemples, "new")
}

function displayLargeTemples() {
  const largeTemples = temples.filter(temple => temple.area > 90000)
  displayTemples(largeTemples, "large")
}

function displaySmallTemples() {
  const smallTemples = temples.filter(temple => temple.area < 10000)
  displayTemples(smallTemples, "small")
}

displayTemples(temples, "home");