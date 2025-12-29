import { GithubProfile, GithubRepo } from "@/types";

const GITHUB_USERNAME = "Ryusaaa";
const BASE_URL = "https://api.github.com";

async function fetchGithub<T>(endpoint: string, revalidate = 3600): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(url, {
        headers,
        next: { revalidate },
    });

    if (!res.ok) {
        console.error(`GitHub API Error for ${endpoint}: ${res.status}`);
        // Return empty equivalent or throw, better to throw so we can handle boundary
        throw new Error(`GitHub API Error: ${res.statusText}`);
    }

    return res.json();
}

export async function getProfile(): Promise<GithubProfile> {
    return fetchGithub<GithubProfile>(`/users/${GITHUB_USERNAME}`);
}

export async function getRepos(): Promise<GithubRepo[]> {
    const repos = await fetchGithub<GithubRepo[]>(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    // Filter out forks if needed, or keeping them as requested. Usually portfolios show sources.
    // We'll return non-forks by default or provide a flag.
    return repos.filter(repo => !repo.fork);
}

export async function getRepo(slug: string): Promise<GithubRepo> {
    return fetchGithub<GithubRepo>(`/repos/${GITHUB_USERNAME}/${slug}`);
}

export async function getRepoReadme(slug: string): Promise<string | null> {
    try {
        const res = await fetchGithub<{ content: string; encoding: string }>(`/repos/${GITHUB_USERNAME}/${slug}/readme`);
        if (res.encoding === "base64") {
            return atob(res.content);
        }
        return res.content;
    } catch (e) {
        return null;
    }
}

export async function getRecentActivity() {
    return fetchGithub<any[]>(`/users/${GITHUB_USERNAME}/events?per_page=20`, 600); // Faster revalidate for activity
}
