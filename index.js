function getIssues() {
  const repo = 'erobbed/javascript-fetch-lab'
  fetch(`https://api.github.com/repos/${repo}/issues`, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showIssues(json));
}

function showIssues(json) {
  if (json == undefined){
    json = []
  }

  console.log(json);
  let issues = json.map(issue => one_issue ={
    title: issue.title,
    html_url: issue.html_url,
    body: issue.body
  })
  let issueDiv = document.getElementById('issues')
  let issuesHTML = `<ul> ${json.map(issue =>
    `<li>${issue.title} - ${issue.body}</li>`
  ).join('')}</ul>`

  issueDiv.innerHTML = issuesHTML

  let template = Handlebars.compile(document.getElementById('issues-template').innerHTML)
  let html = template(issues)
}

function createIssue() {
  const repo = 'erobbed/javascript-fetch-lab'
  let title = document.getElementById('title').value
  let body = document.getElementById('body').value
  const postData ={
    title: title,
    body: body
  };

  fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(getIssues);
}

function showResults(json) {
  if (json == undefined){
    json = {name: "TEST", html_url: "https://api.github.com/"}
  }
  var repo = {
    full_name: json.name,
    item_url: json.html_url
  }
  console.log(json);
  let results = document.getElementById('results')
  let url = `<a href="${json.html_url}">${json.html_url}</a>`
  results.innerHTML = url

  let template = Handlebars.compile(document.getElementById('repo-template').innerHTML)
  let html = template(repo)
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  //use fetch to fork it!
  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showResults(json));

}

function getToken() {

  return ''
}
