import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import '../../../css/portfolio.css';

export default function Settings({ header, children }) {
    const user = usePage().props.auth.user;
    const skillsFromBackend = usePage().props.skills || [];
    const professionsFromBackend = usePage().props.professions || [];

    const [skills, setSkills] = useState(skillsFromBackend);
    const [professions, setProfessions] = useState(professionsFromBackend);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showProfessionModal, setShowProfessionModal] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedProfessions, setSelectedProfessions] = useState([]);

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

    useEffect(() => {
        if (skillsFromBackend.length > 0) {
            setSkills(skillsFromBackend);
        }
    }, [skillsFromBackend]);

    useEffect(() => {
        if (professionsFromBackend.length > 0) {
            setProfessions(professionsFromBackend);
        }
    }, [professionsFromBackend]);

    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

    const addSkills = () => {
        fetch('/skills/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ skills: selectedSkills })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                setSkills([...skills, ...selectedSkills]);
                setShowSkillModal(false);
                setSelectedSkills([]);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const deleteSkill = (skill) => {
        fetch('/skills/delete', { // Updated URL to match your Laravel route
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ skills: skill })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                setSkills(skills.filter(s => s !== skill));
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const addProfessions= () => {
        fetch('/professions/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ professions: selectedProfessions })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                setProfessions([...professions, ...selectedProfessions]);
                setShowProfessionModal(false);
                setSelectedProfessions([]);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };


    const deleteProfession = (profession) => {
        fetch('/professions/delete', { 
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ profession })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                setProfessions(professions.filter(p => p !== profession));
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };
    

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
                                Settings
                            </h2>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Skills Section */}
            <div className="py-5">
                <div className="content" style={{ height: '270px' }}>
                    <div className="text" style={{ textAlign: 'center' }}>
                    <h2 style={{ display: 'inline-block', position: 'relative' }}>
                    My Skills
                    <button
                        onClick={() => setShowSkillModal(true)}
                        style={{ position: 'absolute', right: '-130px', top: '100%', transform: 'translateY(-50%)' }}
                    >
                        <img
                            src="/images/link/flat-color-icons_plus.png"
                            alt="Add"
                            style={{ width: '40px', height: '40px' }}
                        />
                    </button>
                </h2>

                        <div className="section grid-skills">
                            {skills.length > 0 ? (
                                skills.map((skill, index) => (
                                    <div className="skill-display" key={index}>
                                        <img src={`/images/${skillIcons[skill]}`} alt={skill} className="skill-icon" />
                                        <button onClick={() => deleteSkill(skill)} className="delete-button">
                                            <i className="fa fa-minus-circle" style={{ color: 'red', fontSize: '25px' }}></i>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No skills found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Professions Section */}
            <div className="py-5">
                <div className="content" style={{ height: '400px'}}>
                    <div className="text" style={{ textAlign: 'center' }}>
                    <h2 style={{ display: 'inline-block', position: 'relative' }}>
                    My Professions
                    <button
                        onClick={() => setShowProfessionModal(true)}
                        style={{ position: 'absolute', right: '-90px', top: '100%', transform: 'translateY(-50%)' }}
                    >
                        <img
                            src="/images/link/flat-color-icons_plus.png"
                            alt="Add"
                            style={{ width: '40px', height: '40px' }}
                        />
                    </button>
                </h2>
                  
                        <div className="grid-professions">
                            {professions.length > 0 ? (
                                professions.map((profession, index) => (
                                    <div className="professions-display" key={index}>
                                        <img src={`/images/${professionIcons[profession]}`} alt={profession} className="profession-icon" />
                                        <p className="professions-text">{profession}</p>
                                        <button onClick={() => deleteProfession(profession)} className="delete-button">
                                            <i className="fa fa-minus-circle" style={{ color: 'red', fontSize: '30px' }}></i>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No professions found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Skill Modal */}
            {showSkillModal && (
                <div className="modal-overlay" onClick={() => setShowSkillModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-modal" onClick={() => setShowSkillModal(false)}></span>
                        <div className="upload-txt">
              <p>Add Your Skills</p>
            </div>                    
                <div className="form grid-skills">
                            {Object.keys(skillIcons).map(skill => (
                                <div className={`skill-item ${
                                    selectedSkills.includes(skill) ? "selected" : ""
                                  }`} key={skill} onClick={() => {
                                    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
                                }}
                                style={{ cursor: "pointer" }}
                                >
                                    <img src={`/images/${skillIcons[skill]}`} alt={skill} className={selectedSkills.includes(skill) ? 'selected' : ''} />
                                </div>
                            ))}
                        </div>
                        <div className='button-container'>
                        <button onClick={addSkills} className="submit-button">Add Skills</button>
                    </div>
                    </div>
                </div>
            )}

            {/* Profession Modal */}
            {showProfessionModal && (
                <div className="modal-overlay" onClick={() => setShowProfessionModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-modal" onClick={() => setShowProfessionModal(false)}></span>
                        <div className="upload-txt">
              <p>Add Your Professions</p>
            </div>          
                        <div className="form grid-profession">
                            {Object.keys(professionIcons).map(profession => (
                                <div className={`profession-item ${
                                    selectedProfessions.includes(profession) ? "selected" : ""
                                  }`} key={profession} onClick={() => {
                                    setSelectedProfessions(prev => prev.includes(profession) ? prev.filter(p => p !== profession) : [...prev, profession]);
                                }}
                                style={{ cursor: "pointer" }}
                                >
                                    <img src={`/images/${professionIcons[profession]}`} alt={profession} className={selectedProfessions.includes(profession) ? 'selected' : ''} />
                                    <p className="text-white" >{profession}</p>

                                </div>
                            ))}
                        </div>
                        <div className='button-container'>
                        <button onClick={addProfessions} className="submit-button">Add Professions</button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
}
