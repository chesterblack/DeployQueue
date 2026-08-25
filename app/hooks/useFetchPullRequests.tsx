import { Octokit } from "@octokit/core";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { PullRequest } from "@/types";

export default function useFetchPullRequests( session: Session|null ) {
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const [ pullRequests, setPullRequests ] = useState<PullRequest[]>();

	useEffect( () => {
		if ( ! session ) {
			return;
		}

		( async () => {
			const octokit = new Octokit({
				auth: session.accessToken
			});
		
			const { data: foundPullRequests } = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
				owner: 'chesterblack',
				repo: 'vessel',
				headers: {
					'X-GitHub-Api-Version': '2026-03-10'
				}
			});
		
			setIsLoading( false );
			setPullRequests( foundPullRequests );
		} )();
	}, [ session ] );

	return { isLoading, pullRequests };
}