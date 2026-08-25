import { Endpoints, Url } from '@octokit/types';
import { User } from 'next-auth'

export type Status = 'waiting'|'ready'|'deploying'|'checking'|'complete';

// export type DeployItem = {
//   status?: Status,
//   user?: User,
//   timestamp: number,
//   title: string,
//   link: string,
//   message: string,
// }

export type DeployItem = {
  user?: User,
  timestamp: number,
  pullRequest: PullRequest,
}

export type PullRequest = Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"][number];
