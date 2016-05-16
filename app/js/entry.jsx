const React = require('react');
const ReactDOM = require('react-dom');
const superAgent = require('superAgent');

const ProjectBox = React.createClass({
  loadProjectsFromServer: function() {
    superAgent
    .get(this.props.url)
    .end((err, superRes) => {
      var superData = JSON.parse(superRes.text);
      this.setState({ data: superData });
    });
  },
  handleProjectSubmit: function(comment) {
    superAgent
    .post(this.props.url)
    .send(comment)
    .end((err, superRes) => {
      this.loadProjectsFromServer();
    });
  },
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    this.loadProjectsFromServer();
  },
  render: function() {
    return (
      <div>
        <ProjectList data={ this.state.data } />
        <ProjectForm onProjectSubmit={ this.handleProjectSubmit } />
      </div>
    );
  }
});

const ProjectList = React.createClass({
  render: function() {
    var projectNodes = this.props.data.map(function(project) {
      return (
        <Project
          key={ project.name }
          name={ project.name }
          title={ project.title }
          description={ project.description }
          publishDate={ project.publishDate }
          siteURL={ project.siteURL }
          repoURL={ project.repoURL }
          thumbnailURL={ project.thumbnailURL }
          categories={ project.categories }
        />
      );
    });
    return (
      <div>
        { projectNodes }
      </div>
    );
  }
});

const ProjectForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      title: '',
      description: '',
      publishDate: '',
      siteURL: '',
      repoURL: '',
      thumbnailURL: '',
      categories: ''
    };
  },
  handleNameChange: function(e) {
    this.setState({ name: e.target.value });
  },
  handleTitleChange: function(e) {
    this.setState({ title: e.target.value });
  },
  handleDescriptionChange: function(e) {
    this.setState({ description: e.target.value });
  },
  handlePublishDateChange: function(e) {
    this.setState({ publishDate: e.target.value });
  },
  handleSiteURLChange: function(e) {
    this.setState({ siteURL: e.target.value });
  },
  handleRepoURLChange: function(e) {
    this.setState({ repoURL: e.target.value });
  },
  handleThumbnailURLChange: function(e) {
    this.setState({ thumbnailURL: e.target.value });
  },
  handleCategoriesChange: function(e) {
    this.setState({ categories: e.target.value });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var title = this.state.title.trim();
    var description = this.state.description.trim();
    var publishDate = this.state.publishDate.trim();
    var siteURL = this.state.siteURL.trim();
    var repoURL = this.state.repoURL.trim();
    var thumbnailURL = this.state.thumbnailURL.trim();
    var categories = this.state.categories.trim();
    if (!name ||
      !title ||
      !description ||
      !publishDate ||
      !siteURL ||
      !repoURL ||
      !thumbnailURL ||
      !categories
    ) {
      return;
    }
    this.props.onProjectSubmit({
      name: name,
      title: title,
      description: description,
      publishDate: publishDate,
      siteURL: siteURL,
      repoURL: repoURL,
      thumbnailURL: thumbnailURL,
      categories: categories
    });
    this.setState({
      name: '',
      title: '',
      description: '',
      publishDate: '',
      siteURL: '',
      repoURL: '',
      thumbnailURL: '',
      categories: ''
    });
  },
  render: function() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          placeholder="name"
          value={ this.state.name }
          onChange={ this.handleNameChange }
        />
        <input
          type="text"
          placeholder="title"
          value={ this.state.title }
          onChange={ this.handleTitleChange }
        />
        <input
          type="text"
          placeholder="description"
          value={ this.state.description }
          onChange={ this.handleDescriptionChange }
        />
        <input
          type="text"
          placeholder="publishDate"
          value={ this.state.publishDate }
          onChange={ this.handlePublishDateChange }
        />
        <input
          type="text"
          placeholder="siteURL"
          value={ this.state.siteURL }
          onChange={ this.handleSiteURLChange }
        />
        <input
          type="text"
          placeholder="repoURL"
          value={ this.state.repoURL }
          onChange={ this.handleRepoURLChange }
        />
        <input
          type="text"
          placeholder="thumbnailURL"
          value={ this.state.thumbnailURL }
          onChange={ this.handleThumbnailURLChange }
        />
        <input
          type="text"
          placeholder="categories"
          value={ this.state.categories }
          onChange={ this.handleCategoriesChange }
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
});

const Project = React.createClass({
  render: function() {
    return (
      <ul key={ this.props.name }>
        <li>{ this.props.name }</li>
        <li>{ this.props.title }</li>
        <li>{ this.props.description }</li>
        <li>{ this.props.publishDate }</li>
        <li>{ this.props.siteURL }</li>
        <li>{ this.props.repoURL }</li>
        <li>{ this.props.thumbnailURL }</li>
        <li>{ this.props.categories }</li>
      </ul>
    );
  }
})

ReactDOM.render(
  <ProjectBox url='http://localhost:5555/api/projects' />,
  document.getElementById('new-projects')
);
