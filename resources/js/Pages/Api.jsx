import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; 
import "../../css/portfolio.css"; 
export default function ProfilePage() {
    const { user, skills: skillsFromBackend, professions: professionsFromBackend, projects } = usePage().props;

    // State for skills and professions
    const [skills, setSkills] = useState(Array.isArray(skillsFromBackend) ? skillsFromBackend : []);
    const skillIcons = {
        HTML: 'skills/html.png',
        JS: 'skills/js.png',
        Cpp: 'skills/cpp.png',
        Java: 'skills/java.png',
        React: 'skills/react.png',
        PHP: 'skills/php.png',
        Tailwind: 'skills/tailwind.png',
        Laravel: 'skills/laravel.png',
    };

    const [professions, setProfessions] = useState(Array.isArray(professionsFromBackend) ? professionsFromBackend : []);
    const professionIcons = {
        Web: 'professions/web.png',
        Graphic: 'professions/graphic.png',
        Youtuber: 'professions/youtuber.png',
        Artist: 'professions/artist.png',
        Video: 'professions/video.png',
        Software: 'professions/software.png',
        Student: 'professions/student.png',
        Musician: 'professions/musician.png',
    };

    // Update states if backend data changes
    useEffect(() => {
        setSkills(Array.isArray(skillsFromBackend) ? skillsFromBackend : []);
    }, [skillsFromBackend]);

    useEffect(() => {
        setProfessions(Array.isArray(professionsFromBackend) ? professionsFromBackend : []);
    }, [professionsFromBackend]);

    const profilePictureUrl = user?.image
        ? `/images/profile/${user.image}`
        : '/images/default.png'; 

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Link href={route('dashboard')}>
                                <ArrowLeftIcon className="h-5 w-5 mt-1 ml-1 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-gray-600 dark:hover:text-gray-400" />
                            </Link>
                            <h2 className="text-xl font-semibold mt-1 leading-tight text-gray-800 dark:text-gray-200">
                            {user?.fullname || "Unknown User"}
                            </h2>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Profile Picture Section */}
            <div className="page">
                <figure className="about-image">
                    <img
                        src={profilePictureUrl}
                        alt={`${user?.fullname || "User"}'s profile`}
                        className="Profile Picture w-16 h-16 rounded-full object-cover"
                    />
                </figure>

                <div className="username">
                    <h2>Hi, I'm {user?.fullname || "Unknown User"}!</h2>
                </div>

                {/* About Me Section */}
                <div className="container">
                    <div className="section">
                        <h2
                            style={{
                                color: '#F5511E',
                                fontSize: '20px',
                                marginTop: '3px',
                                display: 'inline-block',
                                marginLeft: '15px',
                            }}
                        >
                            About Me :
                        </h2>
                        <p id="aboutMeDisplay">{user?.about_me || "This user hasn't added an about me."}</p>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="content"  style={{ height: '250px', marginTop: '25px' }}>
                    <div className="text" style={{ textAlign: 'center' }}>
                        <h2>My Skills</h2>
                <div className="section grid-skills" id="skills-section">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => {
                            const trimmedSkill = skill.trim();
                            if (skillIcons[trimmedSkill]) {
                                return (
                                    <div className="skill-display" key={index}>
                                        <img
                                            src={`/images/${skillIcons[trimmedSkill]}`}
                                            alt={trimmedSkill}
                                            className="skill-icon"
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })
                    ) : (
                        <p>No skills found.</p>
                    )}
                </div>
                    </div>
                </div>

                {/* Professions Section */}
                <div className="content" style={{ height: '400px', marginTop: '25px' }} >
                    <div className="text" style={{ textAlign: 'center' }}>
                        <h2>My Professions</h2>
                        <div className="grid-professions" id="professions-section">
                            {Array.isArray(professions) && professions.length > 0 ? (
                                professions.map((profession, index) => {
                                    const trimmedProfession = profession.trim();
                                    if (professionIcons[trimmedProfession]) {
                                        return (
                                            <div className="professions-display" key={index}>
                                                <img
                                                    src={`/images/${professionIcons[trimmedProfession]}`}
                                                    alt={trimmedProfession}
                                                    className="profession-icon"
                                                    style={{ width: '270px', height: '250px' }}
                                                />
                                                <p className="professions-text">{trimmedProfession}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                })
                            ) : (
                                <p>No professions found.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="content" style={{ height: '440px', marginTop: '25px' }}>
                    <div className="text" style={{ textAlign: 'center' }}>
                        <h2>My Projects</h2>
                        <div className="project-grid">
                            {projects && projects.length > 0 ? (
                                projects.map((project, index) => (
                                    <div className="project-item" key={index}>
                                       <h2 style = {{ color : '#F5511E', fontWeight : 'bold', marginTop : '0' }}>{project.name}</h2>
                                        <p>
                                            <img
                                                src={`/images/projects/${project.image}`}
                                                alt={project.name}
                                                className="project-image"
                                            />
                                        </p>
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" >
                                    Visit Project →
                                </a>
                                    </div>
                                ))
                            ) : (
                                <p>No projects found.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="content" style={{ height: '250px',  marginTop: '25px' }}>
                    <div className="text" style={{ textAlign: 'center' }}>
                        <h2>Contact Me</h2>
                    </div>

                    <div className="section">
                <p className="contact">
                    <i className="fa-solid fa-user"></i>
                    <span className="profession-text">{user?.name}</span>
                </p>
                <p className="contact">
                    <i className="fa-solid fa-location-dot" ></i>
                    <span className="profession-text">{user?.address}</span>
                </p>
                <p className="contact">
                    <i className="fa-solid fa-envelope" ></i>
                    <span className="profession-text">{user?.email}</span>
                </p>
                <p className="contact">
                    <i className="fa-solid fa-phone" ></i>
                    <span className="profession-text">{user?.contact}</span>
                </p>

                
            </div>
                </div>
            </div>
        </div>
    );
}
