const currentUrl = window.location.href;
console.log(currentUrl);
/* Show and Hide Password */

function togglePassword(icon, inputId) {
    var input = document.getElementsByName(inputId)[0];
    if (input.type === "password") {
      input.type = "text";
      icon.className = "fa-solid fa-eye-slash";
    } else {
      input.type = "password";
      icon.className = "fa-solid fa-eye";
  }
}

/* Profile Picture (Need pa e fix) */

function previewProfilePicture(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          document.getElementById('avatar').src = e.target.result;
      }

      reader.readAsDataURL(input.files[0]);
  }
}

 /* Splash-Screen */

 document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const splashScreen = document.getElementById("splash-screen");
        const content = document.getElementById("content");

        if (splashScreen) {
            splashScreen.style.transition = "opacity 1s ease";
            splashScreen.style.opacity = "0";

            setTimeout(function () {
                splashScreen.style.display = "none";
                if (content) {
                    content.style.display = "block";
                    content.style.transition = "opacity 1s ease";
                    content.style.opacity = "1";
                }
            }, 1000); // Wait for fade-out animation
        }
    }, 1000); // Delay before starting fade-out
});



function switchPage(){
  
  document.querySelector('.content').classList.add('fade-out');
  
  setTimeout(function() {
      window.location.href = 'login';
  }, 100); 
}
    

 /* Edit-Modal */
   
function openEditModal() {
  document.getElementById('editModal').style.display = 'flex';
  loadCurrentAboutMe(); // Load current About Me
}

function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}

function loadCurrentAboutMe() {
  fetch('/get-about-me')
      .then(response => response.json())
      .then(data => {
          document.getElementById('aboutMeText').value = data.aboutMe; // Set the textarea value
      })
      .catch(error => console.error('Error fetching About Me:', error));
}

function searchUsers(query) {
  if (query.length < 3) {
      document.getElementById('searchResults').style.display = 'none';
      return;
  }

  fetch(`/api/users/search?query=${encodeURIComponent(query)}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          const resultsContainer = document.getElementById('searchResults');
          resultsContainer.innerHTML = ''; // Clear previous results

          data.forEach(user => {
              const userContainer = document.createElement('div');
              userContainer.classList.add('user-result');

              const userImage = document.createElement('img');
              userImage.src = `/images/profile/${user.image || 'default.jpg'}`;
              userImage.alt = `${user.fullname}'s profile picture`;
              userImage.classList.add('user-image');

              const userName = document.createElement('span');
              userName.textContent = user.fullname;

              userContainer.appendChild(userImage);
              userContainer.appendChild(userName);

              // Updated this line
              userContainer.onclick = () => {
                  window.location.href = `/api/users/${user.id}`; // Correct URL
              };

              resultsContainer.appendChild(userContainer);
          });

          resultsContainer.style.display = data.length ? 'block' : 'none';
      })
      .catch(error => console.error('Error fetching search results:', error));
}
