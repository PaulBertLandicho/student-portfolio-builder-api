import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import '../../../css/portfolio.css'; 

export default function Professions() {
    const user = usePage().props.auth.user;
    const professionsFromBackend = usePage().props.professions || []; // Fetch professions passed from backend

    const [professions, setProfessions] = useState(professionsFromBackend);

    const [professionIcons] = useState({
        Web: 'professions/web.png',
        Graphic: 'professions/graphic.png',
        Youtuber: 'professions/youtuber.png',
        Artist: 'professions/artist.png',
        Video: 'professions/video.png',
        Software: 'professions/software.png',
        Student: 'professions/student.png',
        Musician: 'professions/musician.png',
    });

    useEffect(() => {
        if (professionsFromBackend.length > 0) {
            setProfessions(professionsFromBackend);
        }
    }, [professionsFromBackend]);

    return (
        <div className="content" style={{ height: '400px', marginTop: '25px' }}>
            <div className="text" style={{ textAlign: 'center' }}>
                <h2>My Professions</h2>
                <div className="grid-professions" id="professions-section">
                    {professions.length > 0 ? (
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
    );
}
