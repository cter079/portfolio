import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';




function ProjectList() {
    const [pagination, setPagination] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:8000/api/projects?start=${currentPage}&limit=9`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => {
            setProjects(response.data.items);
            setPagination(response.data.pagination);
            setLoading(false);
        })
            .catch((error) => {
                console.log(error);
            });
    }, [
        currentPage
    ]);


    return (
        <main>
            {loading ? <title>Loading...</title> :
                <>
                    <div className="hero">
                        <div className="line-top"></div>
                    <h1 className="hero-title">Camryn's portfolio</h1>
                    <p className="hero-description">Hey! My name is Camryn. I am a student at the Rotterdam University of Applied Sciences. This is where I keep my school- and personal projects so interested people like you can take a look! You will see projects that I made when I just started coding, but also recent projects so you can see how I make progress in becoming a skilled programmer.</p>
                

<button className="hero-button"><a href='#projects'>View projects</a></button>
                    <div className="line-bottom"></div>



                    </div>
                

                 


<div id='projects' className="projects">
                    <ul className="projects-list">
                        {projects.map((project) => (
                            <li key={project.id} className='project-container'>
                            <img className='project-image'src={project.image} alt={project.title} />

                                <h2 className='project-title'>{project.title}</h2>
                                <p class='project-description'>{project.description}</p>
                                <p><strong>Category:</strong> {project.category}</p>
                                <a href={project.projectlink}>Link to GitHub project</a>
                            </li>
                        ))}
                    </ul>
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(pagination._links.first.page)}
                            disabled={pagination._links.first.page === currentPage}
                        >
                            First
                        </button>
                        <button
                            onClick={() => setCurrentPage(pagination._links.previous.page)}
                            disabled={pagination._links.previous.page === currentPage}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(pagination._links.next.page)}
                            disabled={pagination._links.next.page === currentPage}
                        >
                            Next
                        </button>
                        <button
                            onClick={() => setCurrentPage(pagination._links.last.page)}
                            disabled={pagination._links.last.page === currentPage}
                        >
                            Last
                        </button>
                    </div>
                </>
            }
        </main>

    );
}

export default ProjectList;