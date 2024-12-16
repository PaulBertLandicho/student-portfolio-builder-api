import { usePage } from "@inertiajs/react";
import { useState } from "react";
import "../../../css/portfolio.css";

export default function ProfilePic() {
  const user = usePage().props.auth.user;

  const profilePictureUrl = user.image
    ? `/images/profile/${user.image}`
    : "images/default.png";

  const [aboutMe, setAboutMe] = useState(user.about_me || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open edit modal
  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  // Save "About Me" text
  const saveAboutMe = () => {
    fetch("/update-about-me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      body: JSON.stringify({ aboutMe: aboutMe }),
    })
      .then((response) => {
        if (response.ok) {

          // Update the displayed About Me text
          document.getElementById("aboutMeDisplay").innerText = aboutMe;
          closeEditModal();
        } else {
          console.error("Failed to update About Me.");
        }
      })
      .catch((error) => console.error("Error updating About Me:", error));
  };

  return (
    <div className="page">
        
      {/* Profile Picture */}
      <figure className="about-image">
        <img
          src={profilePictureUrl}
          alt={`${user.fullname}'s profile`}
          className="Profile Picture w-16 h-16 rounded-full object-cover"
          style={{ height: "195px" }}
        />
      </figure>

      {/* User Full Name */}
      <div className="username">
        <h2>Hi, I'm {user.fullname}!</h2>
      </div>

      {/* About Me Section */}
      <div className="section">
        <i
          className="fas fa-edit edit-icon"
          onClick={openEditModal}
          style={{
            cursor: "pointer",
            marginLeft: "20px",
          }}
        ></i>
        <h2
          style={{
            color: "#F5511E",
            fontSize: "20px",
            marginTop: "3px",
            display: "inline-block",
            marginLeft: "5px",
          }}
        >
          About Me :
        </h2>
        <p id="aboutMeDisplay">{aboutMe}</p> 
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div id="editModal" className="modal">
          <div className="modal-overlay" onClick={closeEditModal}></div>
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>About Me :</h2>
            <textarea
              id="aboutMeText"
              rows="4"
              cols="50"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            ></textarea>
            <button className="aboutbutton" onClick={saveAboutMe}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
