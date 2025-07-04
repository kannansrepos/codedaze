// import { App } from '@octokit/app';
import { Octokit } from '@octokit/rest';
const UploadData = async (
  GITHUB_TOKEN: string,
  FILE_CONTENT: string,
  FILE_PATH: string
) => {
  const OWNER = 'kannansrepos';
  const REPO = 'codedaze';
  const BRANCH = 'main';
  const commitMessage = `Add Blog Post ${FILE_PATH} file via API`;
  console.log('Request Received to Upload:', FILE_PATH);
  // Step 1: Get the latest commit SHA
  const refRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`,
    {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    }
  );
  const refData = await refRes.json();
  const latestCommitSha = refData.object.sha;

  // Step 2: Get the tree SHA of the latest commit
  const commitRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/commits/${latestCommitSha}`,
    {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    }
  );
  const commitData = await commitRes.json();
  const baseTreeSha = commitData.tree.sha;

  // Step 3: Create a blob with the markdown content
  const blobRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/blobs`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: FILE_CONTENT,
        encoding: 'utf-8',
      }),
    }
  );
  const blobData = await blobRes.json();

  // Step 4: Create a new tree with the blob
  const treeRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/trees`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: [
          {
            path: FILE_PATH, // e.g., 'docs/new-file.md'
            mode: '100644',
            type: 'blob',
            sha: blobData.sha,
          },
        ],
      }),
    }
  );
  const treeData = await treeRes.json();

  // Step 5: Create a new commit
  const commitNewRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/commits`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage || 'Add markdown file via API',
        tree: treeData.sha,
        parents: [latestCommitSha],
      }),
    }
  );
  const newCommitData = await commitNewRes.json();

  // Step 6: Update the ref to point to the new commit
  await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sha: newCommitData.sha,
      }),
    }
  );
};

export const PushToGithub = async (FILE_CONTENT: string, FILE_PATH: string) => {
  const OWNER = 'kannansrepos';
  const REPO = 'codedaze';
  const BRANCH = 'main';
  const commitMessage = `Add Blog Post ${FILE_PATH} file via API`;
  console.log('Request Received to Upload:', FILE_PATH);
  try {
    // Initialize GitHub App
    // const app = new App({
    //   appId: parseInt(process.env.GITHUB_APP_ID!),
    //   privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
    // });

    // Get installation access token
    // const octokit = await app.getInstallationOctokit(
    //   parseInt(process.env.GITHUB_CLIENT_ID!)
    // );
    const octokit = new Octokit({
      auth: {
        clientType: 'oauth-app',
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        webFlow: true,
      },
    });
    // Create/Update file content
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: commitMessage,
      branch: BRANCH,
      content: Buffer.from(FILE_CONTENT).toString('base64'),
    });
  } catch (error) {
    console.error('Error creating/updating file:', error);
  }
};



export { UploadData };
