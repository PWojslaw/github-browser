export default class Github {
    search = (repoName) => {
        return fetch(`https://api.github.com/users/${repoName}/repos`)
        .then(response => response.json())
        .then(data => this.parseResponse(data));
    };

    parseResponse = (response) => {
        return response.map(x => {
            return {
                name: x.name,
                description: x.description,
                lastUpdated: x.updated_at,
                link: x.url
            }
        });
    };
}