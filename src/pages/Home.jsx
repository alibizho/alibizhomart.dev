import GitProject from '../Components/GitProject.jsx';
import Tech from '../Components/Tech.jsx';
import { SiDjango, SiFigma, SiFirebase, SiGit, SiJavascript, SiPython, SiReact, SiSqlite, SiFastapi, SiC, SiNodedotjs, SiPostgresql } from 'react-icons/si';

function Home({ repos, reposLoading }) {
  return (
    <>
      <div className="container-intro">
        <h1>👋 Hi, I'm Alibi</h1>
        <p className="p-text">
          Computer Science student, software engineer, full-stack developer, language enthusiast 
          who loves challenging problems.
        </p>
      </div>
      
      <div className='container'>
        <h2>💼 projects</h2>
        <p>
          During my free time I love to create side projects from small 
          tools that make life easier to platforms which help 
          my local communities.
        </p>
        {reposLoading ? (
          <div className='project-repos' style={{ opacity: 0, height: '200px' }}>
            {/* Invisible placeholder to prevent layout shift */}
          </div>
        ) : (
          <div className='project-repos'>
            {repos.map(repo => (
              <GitProject
                key={repo.id}
                name={repo.name}
                description={repo.description}
                language={repo.language}
              />
            ))}
          </div>
        )}
      </div>

      <div className='container'>
        <h2>🛠 workflow</h2>
        <p>I love building projects, so I have a set of tools that I use to bring my ideas to life.</p>
        <div className='techs'>
          <Tech name="Python" icon={SiPython} />
          <Tech name="JavaScript" icon={SiJavascript} />
          <Tech name="C" icon={SiC} />
          <Tech name="SQL" icon={SiSqlite} />

          <Tech name="React" icon={SiReact} />
          <Tech name="Django" icon={SiDjango} />
          <Tech name="FastAPI" icon={SiFastapi} />
          <Tech name="Node.js" icon={SiNodedotjs} />

          <Tech name="Git" icon={SiGit} />
          <Tech name="Figma" icon={SiFigma} />
          <Tech name="PostgreSQL" icon={SiPostgresql} />
          <Tech name="Firebase" icon={SiFirebase} />
        </div>
      </div>
    </>
  );
}

export default Home;
