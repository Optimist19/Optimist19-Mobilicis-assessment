```js
<section class="user-search-job-result">
  <div id="user-spinner">
    <i class="fa-solid fa-spinner fa-spin"></i>
  </div>

  <div id="user-job-result"></div>
</section>;

let userJobResult = document.getElementById("user-job-result");

let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", searchFtn);

async function searchFtn() {
  if (jobTitle.value === "" && jobLocation.value === "") {
    return;
  } else {
    userSpinner.style.display = "flex";
    const url = `https://job-search-api1.p.rapidapi.com/v1/job-description-search?q=${jobTitle.value}&page=1&country=japan&city=${jobLocation.value}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9eca6d0ee8mshac946c5f35ec812p1d0753jsnb4e5dafe5957",
        "X-RapidAPI-Host": "job-search-api1.p.rapidapi.com"
      }
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();
      userSpinner.style.display = "none";

      let addJobs = "";

      if (result && result.jobs && result.jobs.length > 0) {
        for (let job of result.jobs) {
          addJobs += `<div class="user-result">
			 		<p class="job-title">Tile: ${job.title}</p>
			 		<p class="job-location">Location: ${job?.location}</p>
			 		<p class="job-source">Source: ${job.source}</p>
			 			<a class="job-link" href=${job.application_url} target="_blank">Application URL</a>
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
      alert(error.message);
    }
  }
  jobTitle.value = "";
  jobLocation.value = "";
}
```

```
The line 9 is where we want to put some html element and along with our data from the api. You can see in line 43 - 55 and 60. Before you achieve all these, we had to make an eventListener to listen to event on the button(line 15), which will help us fetch some data from the api. The _"searchFtn"_ function accepts job title and city as params and does the fetching based on the user input. The line 27 of our code is a loader, we are controlling the visibility of the loader from our _searchFtn_ function by changing the css values.

In line 46, after when we have gotten our data from the api, in the conditional statement, we loop through our data along with some html tag to get each of them and passed as contents as html element storing them in the _"addJobs"_ variable. If the else part of our conditional statement triggers then the html element is stored in the _"addJobs"_ variable.

Remember where we said the _userJobResult_ will be having our data, so now the data will be visible in the frontend with the help of _.innerHTML_ in line 68.

The line 73-74 helps to set user input empty when the search button is clicked on.
```

```js
<section class="job-posting" id="jobs">
  <div id="window-spinner">
    <i class="fa-solid fa-spinner fa-spin"></i>
  </div>

  <div id="job-con"></div>
</section>;

const jobCon = document.querySelector("#job-con");

// window.addEventListener("load", initialJobFetch);

async function initialJobFetch() {
//   const url =
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
        <a class="job-link" href="${job?.application_url} target="_blank"">Application URL</a>
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
```

```
The same logic applies here, but right here, we are padding it to the _jobCon_ and the data we are fetching is not controlled by the user. The  URL parameters are static. It is fetched automatically on page load that is why you could see the _window.addEventListener_.
```

```js
<section class="contact" id="contact">
  <div>
    <h2>Contact</h2>
    <form id="contact-form">
      <input
        type="text"
        id="name"
        placeholder="NAME"
        name="name"
        value=""
        required
      />

      <input
        type="email"
        id="email"
        placeholder="EMAIL"
        name="email"
        value=""
        required
      />

      <textarea
        rows="20"
        placeholder="MESSAGE"
        name="message"
        required></textarea>

      <button id="submit" type="submit">
        <i class="fa fa-paper-plane"></i>
        <span class="send-text">SEND</span>
      </button>
    </form>
  </div>
</section>;

document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  alert(`Thank you for contacting us, ${e.target.elements.name.value}`);
  e.target.elements.name.value = "";
  e.target.elements.email.value = "";
  e.target.elements.message.value = "";
});
```

```
You can see that we got our _form_ element directly in line 182 here compare to how we grab other elements, that is, this is another approach rather than passing it to a variable.

For line 185, we are getting the value from a particular input named _name(a value in the name attribute)_ and then putting it in the _alert function_

Line 183, the _e.preventDefault()_ helps nt to make the page refresh after a form submission has been made. The _e_ we are seeing is called _event_. The _event_ has lot of properties in it, which one of it os the _target_. Basically, with the help of the _name_ attribute, we will be able to get the values of each inputs in the form, but what we are seeing in line 186 - 188, we basically set the each inputs empty after a user filled the form and then clicks on the the button.


```

```js
<nav class="mobile">
  <header id="sidebar">
    <div class="toggle-btn" id="toggle-btn">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <ul>
      <img src="./img/1520205040551.jpeg" alt="logo" class="mobile-nav-logo" />
      <li>
        <a href="#home">HOME</a>
      </li>
      <li>
        <a href="#about">ABOUT</a>
      </li>
      <li>
        <a href="#contact">CONTACT</a>
      </li>
      <li>
        <a href="#jobs">JOBS</a>
      </li>
    </ul>
  </header>
</nav>;

// mobile nav toggle

let toggleBtn = document.querySelector("#toggle-btn");
// console.log(toggleBtn)
toggleBtn.addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});
```

```
Line 230, we got the line 203 element which we added an _addEventListener_ to listen on a _click event_ on the div element, also having a _callback function_ to enable toggling of the _sidebar_. Line 233 will result to enabling the line 202 to toggle the whole header element (_sidebar_) with the help of _active class_ in the CSS.
```

```js

    <section class="search-nav" id="home"></section>
    <section class="search-nav" id="about"></section>
    <section class="search-nav" id="contact"></section>


	<ul>
	<li><a href="#home">HOME</a></li>
	<li><a href="#about">ABOUT</a></li>
	<li><a href="#contact">CONTACT</a></li>
	<li><a href="#jobs">JOBS</a></li>
	</ul>


	// css
	html {
	scroll-behavior: smooth;

	}
```

```
With the help of _anchor tag_, the value or the content of the _href_ attribute helps us navigate to where ever the corresponding _id_value is our page. Using line 248, it corresponds with line 242, so when we click on our _home anchor tag_, it navigates us to the where the _id_ _home_ is.

The code in line 256 enhance us achieve smooth scroll or navigation to the section we want to scroll or navigate to. It is mostly at the top of our css code.

```

```js

	<!-- translator -->
	<div id="google_translate_element"></div>


    <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      }
    </script>
    <script
      type="text/javascript"
      src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    ></script>
```

```
This two scripts you are seeing here, are the one responsible for the translation in the application. The two scripts are put in the _html body_. The Line 272 is basically what we will be seeing in the frontend(application) to be able to make selection to any language we would like to use in our application.

```

```js
<section id="slider">
  <div>
    <swiper-container
      class="mySwiper"
      pagination="true"
      pagination-clickable="true"
      navigation="true"
      space-between="30"
      centered-slides="true"
      autoplay-delay="2500"
      autoplay-disable-on-interaction="false">
      <swiper-slide>
        <img src="./img/Fukuoka.jpeg" alt="A picture of a city in Japan" />
      </swiper-slide>
      <swiper-slide>
        <img
          src="./img/011474_exterior_01_org_a.jpg"
          alt="A picture of a city in Japan"
        />
      </swiper-slide>
      <swiper-slide>
        <img src="./img/Kobe.jpg" alt="A picture of a city in Japan" />
      </swiper-slide>
      <swiper-slide>
        <img src="./img/50519-1.jpg" alt="A picture of a city in Japan" />
      </swiper-slide>
      <swiper-slide>
        <img src="./img/new.jpg" alt="A picture of a city in Japan" />
      </swiper-slide>
      <swiper-slide>
        <img src="./img/Osaka.jpg" alt="A picture of a city in Japan" />
      </swiper-slide>
      <swiper-slide>
        <img
          src="./img/Akasaka_skyline_201806.jpg"
          alt="A picture of a city in Japan"
        />
      </swiper-slide>
      <swiper-slide>
        <img src="./img/new1.jpg" alt="A picture of a city in Japan" />
      </swiper-slide>
      <swiper-slide>
        <img
          src="./img/Tokyo_from_the_top_of_the_SkyTree.JPG"
          alt="A picture of a city in Japan"
        />
      </swiper-slide>
      <swiper-slide>
        <img src="./img/Yokohama.jpg" alt="A picture of a city in Japan" />
      </swiper-slide>
    </swiper-container>
  </div>
</section>


    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
```

```
The _swiper-container_ has some attributes it accept, which you can see here, as it is the container.

The _swiper-slide_ is the content in the _swiper-container_ which you can we can put whatever html element in it.

```




``` js
const home = document.getElementById("home-nav"); //nav for desktop to change color
const about = document.getElementById("about-nav"); //nav for desktop to change color
const jobs = document.getElementById("jobs-nav"); //nav for desktop to change color
const contact = document.getElementById("contact-nav"); //nav for desktop to change color


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
```

```
What we did here is basically changing the color of our _anchor tag_ for the desktop view when the window scroll gets to a certain level.
```

# Link to the live application [\<ins>](https://my-mobilicis-assessment.netlify.app/)

## Link to the live application [\<ins>](https://github.com/Optimist19/Optimist19-Mobilicis-assessment)



### You first of all register here  [\<ins>](https://rapidapi.com/auth/sign-up?referral=/hub) , then you use this link [\<ins>](https://rapidapi.com/jobwiz-jobwiz-default/api/job-search-api1/) to get the api key and the api host. To be able to use use the api, you will have to subscribe for it. 

### This is one reserved api key 'X-RapidAPI-Key': "d839606a2dmsh159904831abc3e1p115e32jsndfe71e6e9cd1"  to test my application. By the time you want to check out my work, I might have exhausted my quota. What you have to do is just to replace the old api key with the reserved one.

#### Note, you can as well change the params to suit your need. I am concerned about jobs in Japan, so I changed mine to Japan.

##### This below is the example of what you are going to see when you visit the site.

```js
const url = 'https://job-search-api1.p.rapidapi.com/v1/job-description-search?q=software%20engineer&page=1&country=us&city=Seattle';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f95a7b5728mshde2db236162fc3bp15be5ejsn26501677454e',
		'X-RapidAPI-Host': 'job-search-api1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
```