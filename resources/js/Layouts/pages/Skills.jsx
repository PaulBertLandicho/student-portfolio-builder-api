import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import '../../../css/portfolio.css'; // Ensure you have the correct styles for your components

export default function Skills({ header, children }) {
    const user = usePage().props.auth.user;
    const skillsFromBackend = usePage().props.skills || []; // Get skills from the props passed from the backend

    const [skills, setSkills] = useState(skillsFromBackend); // Initialize skills state

    const [skillIcons] = useState({
        HTML: 'skills/html.png',
        JS: 'skills/js.png',
        Cpp: 'skills/cpp.png',
        Java: 'skills/java.png',
        React: 'skills/react.png',
        PHP: 'skills/php.png',
        Tailwind: 'skills/tailwind.png',
        Laravel: 'skills/laravel.png',
    });

    useEffect(() => {
        // If skills data is updated from the backend, set the skills in state
        if (skillsFromBackend.length > 0) {
            setSkills(skillsFromBackend);
        }
    }, [skillsFromBackend]);

    return (
        <div className="content" style={{ height: '250px', marginTop: '25px' }}>
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
    );
}
