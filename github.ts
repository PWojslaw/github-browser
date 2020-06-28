export interface IGithubResponseDTO {
    name: string;
    description: string;
    lastUpdated: string;
    link: string;
}

export default class Github {
    search = async (repoName: string) => {
        const response = await fetch(`https://api.github.com/users/${repoName}/repos`);
        const data = await response.json();
        return this.parseResponse(data);
    };

    parseResponse = (response: any[]) => {
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