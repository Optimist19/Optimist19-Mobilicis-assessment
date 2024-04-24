let userJobResult = document.getElementById("user-job-result");
const jobCon = document.querySelector("#job-con");

let jobTitle = document.getElementById("job-title");
let jobLocation = document.getElementById("job-location");
let searchBtn = document.getElementById("search-btn");
let userSpinner = document.getElementById("user-spinner");
let windowSpinner = document.getElementById("window-spinner");

console.log(windowSpinner);
searchBtn.addEventListener("click", searchFtn);


async function searchFtn() {
  console.log(jobTitle.value);
  console.log(jobLocation.value);
  if(jobTitle.value === "" && jobLocation.value === ""){
    console.log("return nothing")
    return;
  }else{


  userSpinner.style.display = "flex"
  const url = `https://job-search-api1.p.rapidapi.com/v1/job-description-search?q=${jobTitle.value}&page=1&country=japan&city=${jobLocation.value}`;

  const options = {
    method: "GET",
    headers: {
      // "X-RapidAPI-Key": "f95a7b5728mshde2db236162fc3bp15be5ejsn26501677454e",
      "X-RapidAPI-Key": "58139899e7msh67e1f765b1af1e6p17d817jsn6604c89591dd",
      "X-RapidAPI-Host": "job-search-api1.p.rapidapi.com"
    }
  };

  try {
    const response = await fetch(url, options);
    console.log(response);
    const result = await response.json();
    userSpinner.style.display = "none"

    console.log(result);

    let addJobs = "";

    if (result && result.jobs && result.jobs.length > 0) {
      for (let job of result.jobs) {
        addJobs += `<div>
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
      addJobs = "<div class='no-result'><p>No jobs found.</p></div>";
    }

    userJobResult.innerHTML = addJobs;
  } catch (error) {
    console.error(error);
  }
}
}


window.addEventListener("load", initialJobFetch);

async function initialJobFetch() {
  // windowSpinner.style.display = "flex"

  const url =
    "https://job-search-api1.p.rapidapi.com/v1/job-description-search?q=software%20engineer&page=1&country=japan";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "58139899e7msh67e1f765b1af1e6p17d817jsn6604c89591dd",
      "X-RapidAPI-Host": "job-search-api1.p.rapidapi.com"
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    windowSpinner.style.display = "none"


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
    <p>${job.publication_time}</p>
    
		</div>`;
    }


    jobCon.innerHTML = addjobs;
  } catch (error) {
    console.error(error);
  }
}

document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.elements.name.value = "";
  e.target.elements.email.value = "";
  e.target.elements.message.value = "";
  // alert("Thank you for contacting us")
});
