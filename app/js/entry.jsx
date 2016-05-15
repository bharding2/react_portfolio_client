const React = require('react');
const ReactDOM = require('react-dom');
const superAgent = require('superAgent');

const Projects = React.createClass({
  render: function() {
    return (
      <div>
        { this.props.data.map(function(project) {
          return (
            <ul key={ project.name }>
              <li>{ project.name }</li>
              <li>{ project.title }</li>
              <li>{ project.description }</li>
              <li>{ project.publishDate }</li>
              <li>{ project.siteURL }</li>
              <li>{ project.repoURL }</li>
              <li>{ project.thumbnailURL }</li>
              <li>{ project.categories.join(', ') }</li>
             </ul>
           )
         })
        }
       </div>
    );
  }
});

superAgent
.get('http://localhost:5555/api/projects')
.end((err, superRes) => {
  var projects = JSON.parse(superRes.text);
  ReactDOM.render(
    <Projects data={ projects } />,
    document.getElementById('projects')
  );
});
