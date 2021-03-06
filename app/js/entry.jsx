const React = require('react');
const ReactDOM = require('react-dom');
const superAgent = require('superAgent');

const ProjectBox = React.createClass({
  loadProjectsFromServer: function() {
    superAgent
    .get(this.props.url)
    .end((err, superRes) => {
      if (err) return console.log(err);
      var superData = JSON.parse(superRes.text);
      this.setState({ data: superData });
    });
  },
  handleProjectSubmit: function(project) {
    superAgent
    .post(this.props.url)
    .send(project)
    .end((err, superRes) => {
      if (err) return console.log(err);
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
        <ProjectList
          data={ this.state.data }
          url={ this.props.url }
          loadProjectsFromServer = { this.loadProjectsFromServer }
        />
        <h2>Submit a new project</h2>
        <ProjectForm onProjectSubmit={ this.handleProjectSubmit } />
      </div>
    );
  }
});

const ProjectList = React.createClass({
  render: function() {
    var url = this.props.url;
    var loadProjectsFromServer = this.props.loadProjectsFromServer;
    var projectNodes = this.props.data.map(function(project) {
      return (
        <Project
          key={ project.name }
          id={ project._id }
          name={ project.name }
          title={ project.title }
          description={ project.description }
          publishDate={ project.publishDate }
          siteURL={ project.siteURL }
          repoURL={ project.repoURL }
          thumbnailURL={ project.thumbnailURL }
          categories={ project.categories }
          url={ url }
          loadProjectsFromServer={ loadProjectsFromServer }
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
    var name = this.state.name.trim() || this.props.name;
    var title = this.state.title.trim() || this.props.title;
    var description = this.state.description.trim() || this.props.description;
    var publishDate = this.state.publishDate.trim() || this.props.publishDate;
    var siteURL = this.state.siteURL.trim() || this.props.siteURL;
    var repoURL = this.state.repoURL.trim() || this.props.repoURL;
    var thumbnailURL = this.state.thumbnailURL.trim() || this.props.thumbnailURL;
    var categories = this.state.categories.trim() || this.props.categories;
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
  handleProjectDelete: function(project) {
    superAgent
    .delete(this.props.url + '/' + this.props.id)
    .end((err, superRes) => {
      if (err) return console.log(err);
      this.props.loadProjectsFromServer();
    });
  },
  handleProjectEdit: function(project) {
    superAgent
    .put(this.props.url + '/' + this.props.id)
    .send(project)
    .end((err, superRes) => {
      if (err) return console.log(err);
      this.props.loadProjectsFromServer();
    });
  },
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
        <li><ProjectForm
          onProjectSubmit={ this.handleProjectEdit }
          name={ this.props.name }
          title={ this.props.title }
          description={ this.props.description }
          publishDate={ this.props.publishDate }
          siteURL={ this.props.siteURL }
          repoURL={ this.props.repoURL }
          thumbnailURL={ this.props.thumbnailURL }
          categories={ this.props.categories }
        />
        <button onClick={ this.handleProjectDelete }>Delete</button></li>
      </ul>
    );
  }
});

ReactDOM.render(
  <ProjectBox url='http://localhost:5555/api/projects' />,
  document.getElementById('new-projects')
);
