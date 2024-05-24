import GitProject from '../Components/GitProject.jsx';
import Tech from '../Components/Tech.jsx';
import { SiDjango, SiFigma, SiFirebase, SiFlask, SiGit, SiGithub, SiJavascript, SiKotlin, SiPandas, SiPython, SiReact, SiSqlite } from 'react-icons/si';

function Home({ repos }) {
  return (
    <>
      <div className="container-intro">
        <h1>Hi, I'm Alibi 👋</h1>
        <p className="p-text">
          Computer Science student, software engineer, full-stack dev, language enthusiast 
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
      </div>

      <div className='container'>
        <h2>🛠 workflow</h2>
        <p>I love building projects, therefore I have a set of tools which I utilize to implement my ideas to reality</p>
        <div className='techs'>
          <Tech name="Python" icon={SiPython} />
          <Tech name="JavaScript" icon={SiJavascript} />
          <Tech name="Kotlin" icon={SiKotlin} />
          <Tech name="SQL" icon={SiSqlite} />
          <Tech name="Github" icon={SiGithub} />
          <Tech name="Django" icon={SiDjango} />
          <Tech name="React" icon={SiReact} />
          <Tech name="Pandas" icon={SiPandas} />
          <Tech name="Figma" icon={SiFigma} />
          <Tech name="Git" icon={SiGit} />
          <Tech name="Flask" icon={SiFlask} />
          <Tech name="Firebase" icon={SiFirebase} />
        </div>
      </div>
    </>
  );
}

export default Home;
