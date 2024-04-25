let userJobResult = document.getElementById("user-job-result");
const jobCon = document.querySelector("#job-con");

let jobTitle = document.getElementById("job-title");
let jobLocation = document.getElementById("job-location");
let searchBtn = document.getElementById("search-btn");
let userSpinner = document.getElementById("user-spinner"); //Loading icon
let windowSpinner = document.getElementById("window-spinner"); //Loading icon

const home = document.getElementById("home-1"); //nav for web to change color
const about = document.getElementById("about-2"); //nav for web to change color
const jobs = document.getElementById("jobs-3"); //nav for web to change color
const contact = document.getElementById("contact-4"); //nav for web to change color


const handleScroll = () => {
  if (window.scrollY >= 660) {
    home.style.color = "#ff22e6"
    about.style.color = "#ff22e6"
    jobs.style.color = "#ff22e6"
    contact.style.color = "#ff22e6"
  }else {
    home.style.color = "aliceblue"
    about.style.color = "aliceblue"
    jobs.style.color = "aliceblue"
    contact.style.color = "aliceblue"
  }
};

window.addEventListener('scroll', handleScroll);



// search result

searchBtn.addEventListener("click", searchFtn);

async function searchFtn() {

  console.log(jobTitle);
  console.log(jobLocation);
  if (jobTitle.value === "" && jobLocation.value === "") {
    console.log("return nothing");
    return;
  } else {
    userSpinner.style.display = "flex"
    const url = `https://job-search-api1.p.rapidapi.com/v1/job-description-search?q=${jobTitle.value.trim}&page=1&country=japan&city=${jobLocation.value.trim}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9eca6d0ee8mshac946c5f35ec812p1d0753jsnb4e5dafe5957",
        // "X-RapidAPI-Key": "58139899e7msh67e1f765b1af1e6p17d817jsn6604c89591dd",
        "X-RapidAPI-Host": "job-search-api1.p.rapidapi.com"
      }
    };

    try {
      

      const response = await fetch(url, options);
      console.log(response);
      const result = await response.json();
      userSpinner.style.display = "none";

      console.log(result);



      let addJobs = "";

      if (result && result.jobs && result.jobs.length > 0) {
        for (let job of result.jobs) {
          addJobs += `<div class="user-result">
			 		<p class="job-title">Tile: ${job.title}</p>
			 		<p class="job-location">Location: ${job?.location}</p>
			 		<p class="job-source">Source: ${job.source}</p>
			 			<a class="job-link" href=${job.application_url}>Application URL</a>
			 			<p class="job-comp-name">Company Name: ${job.company_name}</p>
			 			<p class="job-desc">Job Desc: ${job.plain_text_description}</p>
			 			<p class="job-time">Job Publication Time: ${job.publication_time.slice(
              0,
              10
            )}</p>
	
			 		</div>`;
        }
      } else {
        alert("Sorry, no data found for this location");
        addJobs = `<div class='no-result'><p>No job found.</p></div>
      <div class='no-result'><p>No job found.</p></div>`;
      }


      userJobResult.innerHTML = addJobs;
    } catch (error) {
      console.error(error);
      alert(error.message)
    }
  }
  jobTitle.value = ""
  jobLocation.value = ""
}




// This is to get the available software engineering jobs in Japan.

// window.addEventListener("load", initialJobFetch);

async function initialJobFetch() {
  // windowSpinner.style.display = "flex"

  // const url =
  "https://job-search-api1.p.rapidapi.com/v1/job-description-search?q=software%20engineer&page=1&country=japan";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "58139899e7msh67e1f765b1af1e6p17d817jsn6604c89591dd",
      "X-RapidAPI-Key": "9eca6d0ee8mshac946c5f35ec812p1d0753jsnb4e5dafe5957",

      "X-RapidAPI-Host": "job-search-api1.p.rapidapi.com"
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    windowSpinner.style.display = "none";

    let addjobs = "";

    for (let job of result.jobs) {
      addjobs += `<div>
      <p class="job-title">Tile: ${job?.title}</p>
      <p class="job-location">Location: ${job?.location}</p>
      <p class="job-source">Source: ${job?.source}</p>
        <a class="job-link" href="${job?.application_url}">Application URL</a>
        <p class="job-comp-name">Company Name: ${job?.company_name}</p>
        <p class="job-desc">Job Desc: ${job?.plain_text_description}</p>
        <p class="job-time">Job Publication Time: ${job?.publication_time.slice(
          0,
          10
        )}</p>
    
    
		</div>`;
    }

    jobCon.innerHTML = addjobs;
  } catch (error) {
    console.error(error);
  }
}

// For contact

document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  alert(`Thank you for contacting us ${e.target.elements.name.value}`);
  e.target.elements.name.value = "";
  e.target.elements.email.value = "";
  e.target.elements.message.value = "";
});



// mobile nav toggle

let toggleBtn = document.querySelector("#toggle-btn")
// console.log(toggleBtn)
toggleBtn.addEventListener("click",()=>{
  document.getElementById('sidebar').classList.toggle('active')
})
