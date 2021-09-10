//Data for experience section
class Position {
  constructor (company, title, startDate, endDate, responsibilities = []){
    this.company = company,
    this.title = title,
    this.startDate = startDate,
    this.endDate = endDate
    this.responsibilities = responsibilities
  }

  addResponsibilities (responsibilities){

    for (const responsibility of responsibilities){
      this.responsibilities.push(responsibility);
    }
    
  }

  jobViewBuilder (){
    const jobInfo = document.querySelector(".job-info");

    jobInfo.innerHTML = `
    <h3>${this.title}</h3>
    <h4>${this.company}</h4>
    <p class="job-date">${this.startDate} - ${this.endDate}</p>
    `

    const details = document.querySelector(".job-desc");

    for (const responsibility of this.responsibilities){
      const jobDiv = document.createElement('div');
      jobDiv.classList.add("job-desc");
      
      jobDiv.innerHTML = `
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="job-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
          </svg>
          <p>${responsibility}</p>
      `

      jobInfo.appendChild(jobDiv);

    }
  }
}

const positions = []

mchQc = new Position("McGraw Hill", "Quality Control Specialist", "November 2016", "April 2017");
mchQa1 = new Position("McGraw Hill", "Quality Assurance Specialist I", "April 2017", "July 2021");
mchQa2 = new Position("McGraw Hill", "Quality Assurance Specialist II", "July 2021", "Present");

mchQc.addResponsibilities([
  "Performed accessibility testing of higher education ALEKS products to meet WCAG standards using JAWS ",
  "Verified the correctness of math questions and explanations by testing answer processing and checking the overall design of algorithmically generated math exercises",
  "Collaborated with teammates to discuss ways of producing questions that improve students’ learning experience"
]);
mchQa1.addResponsibilities([
  "Wrote automated test scripts in Selenium WebDriver  for our web applications. Automation tests included API, UI (with cross browser support), and data validation tests",
  "Conducted review of Automation code to ensure the work delivered by the team was maintainable, reliable, and of high quality standards",
  "Worked in several Agile teams and maintained constant communication with developers, QAs,  UX, PMs, and TPMs to meet sprint goals as defined by SDLC processes",
  "Performed functional testing as well as critical end-to-end and integration testing of new applications in multiple environments"
]);
mchQa2.addResponsibilities([
  "Mentor coworkers on QA best practices and testing strategies",
  "Wrote automated test scripts in Selenium WebDriver  for our web applications. Automation tests included API, UI (with cross browser support), and data validation tests",
  "Conducted review of Automation code to ensure the work delivered by the team was maintainable, reliable, and of high quality standards",
  "Worked in several Agile teams and maintained constant communication with developers, QAs,  UX, PMs, and TPMs to meet sprint goals as defined by SDLC processes",
  "Performed functional testing as well as critical end-to-end and integration testing of new applications in multiple environments"
]);

//*****SET DATE*****
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();


//**********CLOSE LINKS***********/
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener('click', () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  //linksContainer.classList.toggle("show-links");
  containerHeight === 0 ? linksContainer.style.height = `${linksHeight}px` : linksContainer.style.height = 0;
})

//**********Fixed Navbar*************
const navbar = document.getElementById('nav');
const toplink = document.querySelector(".top-link");
window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;

  scrollHeight > navHeight ? navbar.classList.add("fixed-nav") : navbar.classList.remove("fixed-nav");

  scrollHeight > 500 ? toplink.classList.add("show-link") : toplink.classList.remove("show-link");

})

//************SMOOTH SCROLL***********///
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    //navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    //calculate height
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav){
      position = position - navHeight;
    }

    // if (id === "about" && navHeight < 94){
    //   position =  position - navHeight + navHeight;
    // }

    //handling container height for small screens
    if (navHeight > 93.1875){
      position += containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position
    })

    linksContainer.style.height = 0;

  })
})

//Toggle Between experiences
const jobBtnContainer = document.querySelector(".btn-container");

jobBtnContainer.addEventListener("click", e => {
  const btn = e.target;
  const btnText = btn.innerHTML.toLowerCase();
  updateSelectedJobBtn(btnText);
  if (btnText==="mcgraw hill (qa ii)"){
    mchQa2.jobViewBuilder();
  }else if (btnText === "mcgraw hill (qa i)"){
    mchQa1.jobViewBuilder();
  }else if (btnText === "mcgraw hill (qc)"){
    mchQc.jobViewBuilder();
  }
})

function updateSelectedJobBtn(name){
  const jobBtns = document.querySelectorAll('.job-btn');

  for (const elem of jobBtns){
    if (name === elem.innerHTML.toLocaleLowerCase()){
      if (!elem.classList.contains("active-btn")){
        elem.classList.add("active-btn");
      }
    }else{
      if(elem.classList.contains("active-btn")){
        elem.classList.remove("active-btn");
      }
    }
  }
}


// //*********ANIMATION********/
const sliders = document.querySelectorAll(".slide-in");

const appearOptions = {
  threshold: 0.10,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove("appear");
    } else {
      entry.target.classList.add("appear");
    }
  });
},
appearOptions);

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});

const faders = document.querySelectorAll(".fade-in");

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});