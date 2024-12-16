import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import "../../css/auth.css"; 

const PortfolioSetup = () => {
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    fullname: "",
    address: "",
    contact: "",
    gender: "",
    image: null,
    role_id: "",
  });

  const modalRef = useRef(null); // Ref for modal content
  const handleCloseModal = () => {
    setShowModal(false);
};

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };
    if (showModal) {
        document.addEventListener('mousedown', handleClickOutside);
    } else {
        document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, [showModal]);

const handleOpenModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileData({
        ...profileData,
        image: file,
      });
    } else {
      alert("Please upload a valid image.");
    }
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleProfessionToggle = (profession) => {
    setSelectedProfessions((prevProfessions) =>
      prevProfessions.includes(profession)
        ? prevProfessions.filter((p) => p !== profession)
        : [...prevProfessions, profession]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileData.fullname || !profileData.address || !profileData.contact || !profileData.gender) {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("fullname", profileData.fullname);
    formData.append("address", profileData.address);
    formData.append("contact", profileData.contact);
    formData.append("gender", profileData.gender);
    formData.append("role_id", profileData.role_id);

    if (profileData.image) {
      formData.append("image", profileData.image);
    }

    selectedSkills.forEach((skill) => formData.append("skills[]", skill));
    selectedProfessions.forEach((profession) =>
      formData.append("professions[]", profession)
    );

    try {
      const response = await axios.post("/setup", formData);
      console.log("Form submitted successfully:", response.data);
  
      // Redirect directly to the loading page after successful submission
      window.location.href = '/LoadingPage';  // Redirect to loading page
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("An error occurred while submitting the form.");
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {step === 1 && (
          <div className="info">
                                <img src="images/computer.png" style={{ width: "350px", margintop: "10px", marginBottom: "50px" }} />
            <h1>Who are you creating a portfolio for?</h1>
            <div className="option">
            <div className="container" onClick={() => setProfileData({ ...profileData, role_id: "1" })}>
              <label htmlFor="status_single">A single individual for myself</label>
              <input
                type="radio"
                id="status_single"
                name="status"
                value="1"
                checked={profileData.role_id === "1"}
                onChange={handleInputChange}
              />
            </div>

            <div className="container" onClick={() => setProfileData({ ...profileData, role_id: "2" })}>
              <label htmlFor="status_group">A group of people</label>
              <input
                type="radio"
                id="status_group"
                name="status"
                value="2"
                checked={profileData.role_id === "2"}
                onChange={handleInputChange}
              />
            </div>
          </div>
            <div className="button-container" style={{ marginLeft: "230px" }}>
            <button type="button" className="btn next-btn" onClick={() => setStep(2)}>
              NEXT
            </button>
          </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-setup">
              <div className="forms">
                        
              <input type="file" id="profilePicture" name="profilePicture" accept="image/*"
              onChange={handleFileChange}  style= {{ display: "none" }} />                    </div>
                    <div className="profile-picture">
                    <img id="avatar" src={profileData.image ? URL.createObjectURL(profileData.image) : "images/default.png"}
              alt="Profile" />
                                      <label id="pfp" for="profilePicture">
                            <div className="camera-icon-bg">
                                <iconify-icon icon="entypo:camera" class="cam"></iconify-icon>
                            </div>
                        </label>
                            <div className="upload-txt">
                    <p>Upload Your Profile</p>
                </div>
           <div className="info">
            <h2>What’s your Fullname?</h2>
            </div>
            
            <div className="input-container">
                                    <input
                                        type="text"  name="fullname"
                                        value={profileData.fullname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label>Enter your Fullname</label>
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                        
                                     
                                    <div className="option">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={profileData.gender === "Male"}
                  onChange={handleInputChange}
                />                    <label for="gender_male" style= {{ marginRight: "50px" }}>Male</label>
<input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={profileData.gender === "Female"}
                  onChange={handleInputChange}
                />
                                    <label for="gender_female">Female</label>
                </div>
                <div className="button-container">
            <button type="button" class="back-arrow" onClick={() => setStep(1)}>
            <i class='fas fa-arrow-left'></i>
            </button>
            <button type="button" className="btn next-btn" onClick={() => setStep(3)}>
              NEXT
            </button>
          </div>
          </div>
          </div>
        )}

{step === 3 && (
           <div className="form-setup">
           <div className="forms">
                     
           <img src="images/search-for-employee-30zQHdFgAg.png" style= {{ marginLeft: "5px", width: "350px", marginBottom: "50px" }}/>
                         <div className="upload-txt">
                 <p>Set Up Your Address</p>
             </div>

         
         <button className="btn add-btn" onClick={handleOpenModal} >
                <img src="images/link/flat-color-icons_plus.png" className="add-icon" style= {{ width: "40px;", height: "40px" }}/>
                <span style= {{ fontSize: "30px", marginRight: "90px" }}> Add Contact </span>
                </button>
                                     
                                  
          

       <div className="button-container">
         <button type="button" class="back-arrow" onClick={() => setStep(2)}>
         <i class='fas fa-arrow-left'></i>
         </button>
         <button type="button" className="btn next-btn" onClick={() => setStep(4)}>
           NEXT
         </button>
       </div>
     </div>
   </div>
)}

{showModal && (
                <div className="modal-overlays show">
                    <div className="modal-contents" ref={modalRef}>
                        <button onClick={handleCloseModal} className="close-button"></button>
                        <h1 style={{ textAlign: "center"}} >Add Project</h1>
                           
                            <div className="input-container">
                              
                            <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label>Enter your Name</label>
                                    <i className="fa-solid fa-user"></i>
                            </div>  
                             <div className="input-container">
                            <input
                                    type="text"
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label>Enter your Address</label>
                                    <i className="fa-solid fa-location-dot"></i>
                            </div>  
                            <div className="input-container">
                            <input
                                    type="text"
                                    name="contact"
                                    value={profileData.contact}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label>Enter your Contact</label>
                                    <i className="fa-solid fa-phone"></i>
                            </div>  
                            <button onClick={handleCloseModal} className="btn next-btn"  style={{ marginLeft: "140px", marginTop : "0px" }} >Done</button>
                    </div>
                </div>
            )}
            

{step === 4 && (
          <div className="form-setup">
          <div className="forms">
            <img
              src="images/pentagram-skills-of-deth-o70C2aDOV4.png"
              style={{ marginLeft: "5px", width: "350px", marginBottom: "50px" }}
            />
        
            <div className="upload-txt">
              <p>Upload Your Profile</p>
            </div>
        
            <div className="form grid-skills">
              {["HTML", "JS", "Cpp", "React", "Java", "PHP", "Tailwind", "Laravel"].map(
                (skill) => (
                  <div
                    className={`skill-item ${
                      selectedSkills.includes(skill) ? "selected" : ""
                    }`}
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={`images/skills/${skill.toLowerCase()}.png`} alt={skill} />
                    {selectedSkills.includes(skill)}
                  </div>
                )
              )}
            </div>
        
            <div className="button-container">
              <button type="button" className="back-arrow" onClick={() => setStep(3)}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <button type="button" className="btn next-btn" onClick={() => setStep(5)}>
                NEXT
              </button>
            </div>
          </div>
      </div>
    )}


        {step === 5 && (
         <div className="form-setup">
         <div className="forms">
           <div className="upload-txt">
             <p>Select Your Professions</p>
           </div>
       
           <div className="form grid-category">
             {[
               "Web",
               "Graphic",
               "Youtuber",
               "Artist",
               "Video",
               "Software",
               "Student",
               "Musician",
             ].map((profession) => (
               <div
                 className={`category-item ${
                   selectedProfessions.includes(profession) ? "selected" : ""
                 }`}
                 key={profession}
                 onClick={() => handleProfessionToggle(profession)}
                 style={{ cursor: "pointer" }}
               >
                 <img
                   src={`images/professions/${profession.toLowerCase()}.png`}
                   alt={profession}
                 />
               </div>
             ))}
           </div>
       
           <div className="button-container">
             <button type="button" className="back-arrow" onClick={() => setStep(3)}>
               <i className="fas fa-arrow-left"></i>
             </button>
             <button type="submit" className="btn next-btn"  disabled={!profileData.fullname || !profileData.address || !profileData.contact || !profileData.gender}>
              DONE
            </button>
           </div>
         </div>
      </div>
    )}
      </form>
    </div>
  );
};

export default PortfolioSetup;
