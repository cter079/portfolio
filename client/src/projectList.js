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
                    <h1 className="center">My projects</h1>
                

                 


<div className="projects">
                    <ul className="projects-list">
                        {projects.map((project) => (
                            <li key={project.id} className='project-container'>
                            <img className='project-image'src={project.image} alt={project.title} />

                                <h2 className='project-title'>{project.title}</h2>
                                <p>{project.description}</p>
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