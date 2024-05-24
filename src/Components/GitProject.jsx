import React from 'react';
import "../assets/css/GitProject.css"
const Languages = {
  JavaScript: '#F1E05A',
  Python: '#3572A5',
};

export default function GitProject({ name, description, language }) {
  return (
    <a href={`https://github.com/alibizho/${name}`} className="gitrepo" rel="noreferrer" target="_blank">
      <div className="repo-item">
        <h1 className="repo-title">{name}</h1>
        <p className="repo-description">{description}</p>
        <div className="repo-details">
          <div className="repo-language">
            <div className="language-dot" style={{ background: Languages[language] }} />
            {language}
          </div>
        </div>
      </div>
    </a>
  );
}
