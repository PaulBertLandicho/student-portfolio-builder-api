import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import '../../../css/portfolio.css';

export default function Projects({ projectsFromBackend }) {
    const user = usePage().props.auth.user;
    const [projects, setProjects] = useState(Array.isArray(projectsFromBackend) ? projectsFromBackend : []);
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        image: null,
        url: ''
    });
    const modalRef = useRef(null); // Ref for modal content

    // Sync state with backend data on load
    useEffect(() => {
        if (projectsFromBackend && projectsFromBackend.length > 0) {
            setProjects(projectsFromBackend);
        }
    }, [projectsFromBackend]);

    useEffect(() => {
        fetch('/projects')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProjects(data.projects);
                } else {
                    alert('Failed to fetch projects');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while fetching projects.');
            });
    }, []);
    // Close modal when clicking outside
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

    const handleAddProject = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setNewProject({ name: '', image: null, url: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setNewProject((prev) => ({ ...prev, image: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProject = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('projectName', newProject.name);
        formData.append('url', newProject.url);

        if (newProject.image) {
            if (typeof newProject.image === 'string' && newProject.image.startsWith('data:image')) {
                const base64Data = newProject.image.split(',')[1];
                const byteCharacters = atob(base64Data);
                const byteArrays = [];
                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                const imageBlob = new Blob(byteArrays, { type: 'image/png' });
                formData.append('projectImage', imageBlob, 'project_image.png');
            } else {
                formData.append('projectImage', newProject.image);
            }
        }

        fetch('/projects/store', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProjects((prev) => [...prev, data.project]);
                    handleCloseModal();
                } else {
                    alert('Failed to save project');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while saving the project: ' + error.message);
            });
    };

    const handleDeleteProject = (id) => {
        fetch(`/projects/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    setProjects((prev) => prev.filter((project) => project.id !== id));
                } else {
                    alert('Failed to delete project');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while deleting the project.');
            });
    };

    return (
        <div className="content" style={{ height: '440px', marginTop: '25px' }}>
            <div className="text" style={{ textAlign: 'center' }}>
                <h2 style={{ display: 'inline-block', position: 'relative' }}>
                    My Projects
                    <button
                        onClick={handleAddProject}
                        style={{ position: 'absolute', right: '-95px', top: '100%', transform: 'translateY(-50%)' }}
                    >
                        <img
                            src="/images/link/flat-color-icons_plus.png"
                            alt="Add"
                            style={{ width: '40px', height: '40px' }}
                        />
                    </button>
                </h2>
                <div className="project-grid">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div className="project-item" key={project.id}>
                                <div className="floating-button">
                                    <button onClick={() => handleDeleteProject(project.id)}>
                                        <i className="fa fa-minus-circle" style={{ color: 'red', fontSize: '30px' }}></i>
                                    </button>
                                </div>
                                <h2 style = {{ color : '#F5511E', fontWeight : 'bold', marginTop : '0' }}>{project.name}</h2>
                                <img src={`/images/projects/${project.image}`} alt={project.name} style={{ marginTop : '10px', marginBottom : '10px'}} />
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

            {showModal && (
                <div className="modal-overlays show">
                    <div className="modal-contents" ref={modalRef}>
                        <button onClick={handleCloseModal} className="close-button"></button>
                        <h1 style={{ textAlign: "center"}} >Add Project</h1>
                        <form onSubmit={handleSaveProject}>
                            <div className="upload-image">
                                <label htmlFor="projectImage" style={{ cursor: 'pointer' }}>
                                    <img
                                        src={newProject.image || '/images/link/projectimage.png'}
                                        alt="Project Preview"
                                        style={{ width: '80px', height: '80px', marginLeft: "150px" }}
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="projectImage"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Project Name"
                                    value={newProject.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    name="url"
                                    placeholder="Project Link"
                                    value={newProject.url}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn next-btn">Add Project</button>
                        </form>
                        <button onClick={handleCloseModal} className="btn next-btn">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
